const { promisify } = require('util');
const stream = require('stream');
const pipeline = promisify(stream.pipeline);

async function app() {
        const { inputStream, transformStream, outputStream } = require('./streams')
        pipeline(
            await inputStream(),
            await transformStream(),
            await outputStream()
        ).then();
}

app();
