const fs = require('fs');
const cipher = require('./cipher');
const program = require('./program');
const options = program.opts();

async function inputStream() {
    if (options.input === 'stdin') {
        return process.stdin;
    }
    return new Promise((resolve) => {
        fs.access(options.input, fs.constants.R_OK, err => {
            if (err) {
                process.stderr.write(`Input file ${options.input} is not readable or does not exist`);
                process.exit(1);
            } else {
                resolve( fs.createReadStream(options.input, "utf8"));
            }
        });
    });
}

async function outputStream() {
    if (options.output === 'stdout') {
        return process.stdout;
    }
    return new Promise((resolve) => {
        fs.access(options.output, fs.constants.W_OK | fs.constants.F_OK, err => {
            if (err) {
                process.stderr.write(`Output file ${options.output} is not writable or does not exist`);
                process.exit(1);
            } else {
                resolve(fs.createWriteStream(options.output, { flags: 'a' }));
            }
        });
    });
}

const transformStream = () => {
    return new Promise((resolve) => {
        if (!isNaN(options.shift)) {
            if (typeof options.action === 'undefined') {
                process.stderr.write(`Missed action`);
                process.exit(1);
            } else if (options.action !== 'encode' && options.action !== 'decode') {
                process.stderr.write(`Wrong action: ${options.action}`);
                process.exit(1);
            }
            resolve(new cipher(options.shift, options.action));
        } else {
            process.stderr.write('Shift is not a number');
            process.exit(1);
        }
    });
};

module.exports = { inputStream, transformStream, outputStream };
