const path = require('path');
const fs = require('fs');
const zlib = require('zlib');
const { Duplex } = require('stream');
const less = require('less');

const fullHtml = (reply, element, props) => {
  const stream = new Duplex();

  reply.header('content-type', 'text/html');
  reply.header('Content-Encoding', 'gzip');
  reply.header('x-frame-Options', 'SAMEORIGIN');
  reply.header('Content-Security-Policy', 'script-src \'self\'');
  reply.header('x-xss-protection', '1; mode=block');
  reply.header('x-content-type-options', 'nosniff');

  const gzip = zlib.createGzip();
  const html = Buffer.from(`<!DOCTYPE html>${element(props).outerHTML}`);
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

  less.render(fs.readFileSync(path.join(__dirname, '/widget/less/styles.less'), 'utf8'), {
    paths: ['./widget/less'],
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

module.exports = {
  fullHtml,
  lessOnFly
};
