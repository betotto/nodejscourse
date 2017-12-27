const EventEmitter = require('events');

class NewMessage extends EventEmitter {}

const messageEmitter = new NewMessage();

module.exports = messageEmitter;
