const path = require('path');
const fs = require('fs');
const zlib = require('zlib');
const { Duplex } = require('stream');
const less = require('less');
const webpack = require('webpack');
const MemoryFS = require('memory-fs');

const fullHtml = (reply, element, props, children) => {
  const stream = new Duplex();

  reply.header('content-type', 'text/html');
  reply.header('Content-Encoding', 'gzip');
  // reply.header('x-frame-Options', 'SAMEORIGIN');
  // reply.header('Content-Security-Policy', 'script-src \'self\'');
  // reply.header('x-xss-protection', '1; mode=block');
  // reply.header('x-content-type-options', 'nosniff');

  const gzip = zlib.createGzip();
  const html = Buffer.from(`<!DOCTYPE html>${element(props, children).outerHTML}`);
  stream.push(html);
  stream.push(null);
  reply.send(stream.pipe(gzip));
  stream.end();
};

const lessOnFly = (reply) => {
  reply.header('Content-Encoding', 'gzip');
  reply.header('x-xss-protection', '1; mode=block');
  reply.header('x-content-type-options', 'nosniff');
  reply.header('content-type', 'text/css');

  less.render(fs.readFileSync(path.join(__dirname, '../less/styles.less'), 'utf8'), {
    paths: [path.join(__dirname, '../less')],
    filename: 'styles.less'
  }, (e, output) => {
    if(e) {
      reply.code(500).send(e);
    }
    const stream = new Duplex();
    const gzip = zlib.createGzip();

    stream.push(output.css);
    stream.push(null);
    reply.code(200).send(stream.pipe(gzip));
    stream.end();
  });
};

const webpackCompiler = (reply, entry) => {
  const fs = new MemoryFS();

  const compiler =  webpack({
    context: __dirname.replace('/modules', ''),
    entry: `./widgets/${entry}`,
    output: {
      path: '/out',
      filename: entry
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: [/node_modules/],
          use: [{
            loader: 'babel-loader',
            options: {
              presets: ['es2015']
            }
          }],
        }
      ]
    }
  });

  compiler.outputFileSystem = fs;

  compiler.run((err, stats) => {
    if(stats.compilation.errors > 0) {
      pino.error(stats.compilation.errors[1]);
    }
    const stream = new Duplex();
    const gzip = zlib.createGzip();
    reply.header('Content-Encoding', 'gzip');
    reply.header('x-xss-protection', '1; mode=block');
    reply.header('x-content-type-options', 'nosniff');
    reply.header('content-type', 'text/javascript');
    if(err) {
      stream.push(err);
      stream.push(null);
      reply.code(500);
    } else if(stats.compilation.erros && stats.compilation.errors.length > 0) {
      stream.push(stats.compilation.errors);
      stream.push(null);
      reply.code(500);
    } else {
      stream.push(fs.readFileSync(`/out/${entry}`).toString('utf8'));
      stream.push(null);
      reply.code(200);
    }
    reply.send(stream.pipe(gzip));
    stream.end();
  });
};

module.exports = {
  fullHtml,
  lessOnFly,
  webpackCompiler
};
