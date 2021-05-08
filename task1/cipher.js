const stream = require('stream');
const helper = require('./functions');

class Cipher extends stream.Transform {
  constructor(shift, action) {
    super();
    this.shift = shift;
    this.action = action;
  }

  _transform(chunk, encoding, clearBuffer) {
    const data = chunk.toString();
    const shiftedChunk = helper.encodeDecode(data, this.shift, this.action);
    this.push(shiftedChunk);
    clearBuffer();
  }

  _flush(clearBuffer) {
    clearBuffer();
  }
}
module.exports = Cipher;