const { promisify } = require('util');
const stream = require('stream');
const pipeline = promisify(stream.pipeline);
const program = require('./program');
const options = program.opts();

async function app() {
        const { inputStream, transformStream, outputStream } = require('./streams')
        pipeline(
            await inputStream(options.input),
            await transformStream(options.shift, options.action),
            await outputStream(options.output)
        );
}

app().then();
