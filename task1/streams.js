const fs = require('fs');
const cipher = require('./cipher');
const program = require('./program');
const options = program.opts();

async function inputStream() {
    if (options.input === 'stdin') {
        return process.stdin;
    }
    const Readable = fs.createReadStream(options.input, "utf8");
    return Readable;
}

async function outputStream() {
    if (options.output === 'stdout') {
        return process.stdout;
    }
    const Writable = fs.createWriteStream(options.output, { flags: 'a+' });
    return Writable;
}

const transformStream = () => {
    return new Promise((resolve) => {
        if (!isNaN(options.shift)) {
            if (options.action !== 'encode' && options.action !== 'decode') {
                console.log(`Wrong action: ${options.action}`);
                process.exit(1);
            }
            resolve(new cipher(options.shift, options.action));
        } else {
            console.error('Shift is not a number');
            process.exit(1);
        }
    });
};

module.exports = { inputStream, transformStream, outputStream };