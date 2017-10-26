const path = require('path');
const fs = require('fs');
const zlib = require('zlib');
const Duplex = require('stream').Duplex;

const fullHtml = (reply, element, props) => {
  let stream = new Duplex();

  reply.header('content-type', 'text/html');
  reply.header('Content-Encoding', 'gzip');
  reply.header('x-frame-Options', 'SAMEORIGIN');
  reply.header('Content-Security-Policy', 'script-src \'self\'');
  reply.header('x-xss-protection', '1; mode=block');
  reply.header('x-content-type-options', 'nosniff');
  
  const gzip = zlib.createGzip();
  const buffer = Buffer.from(`<!DOCTYPE html>${element(props).outerHTML}`);
  stream.push(buffer);
  stream.push(null);
  reply.send(stream.pipe(gzip));
};

module.exports = {
  fullHtml
};
