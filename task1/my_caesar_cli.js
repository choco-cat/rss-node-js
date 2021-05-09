const { promisify } = require('util');
const stream = require('stream');
const pipeline = promisify(stream.pipeline);
const { inputStream, transformStream, outputStream } = require('./streams');

async function app() {
        pipeline(
            await inputStream(),
            await transformStream(),
            await outputStream()
        );
}
app();
