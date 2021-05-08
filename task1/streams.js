const fs = require('fs');
const cipher = require('./cipher');

async function inputStream(filePath) {
    if (filePath === 'stdin') {
        return process.stdin;
    }
    const Readable = fs.createReadStream(filePath, "utf8");
    return Readable;
}

async function outputStream(filePath) {
    if (filePath === 'stdout') {
        return process.stdout;
    }
    const Writable = fs.createWriteStream(filePath, { flags: 'a+' });
    return Writable;
}

const transformStream = (shift, action) => {
    return new Promise((resolve) => {
        if (!isNaN(shift)) {
            if (action !== 'encode' && action !== 'decode') {
                console.log(`Wrong action: ${action}`);
                process.exit(1);
            }
            resolve(new cipher(shift, action));
        } else {
            console.error('Shift is not a number');
            process.exit(1);
        }
    });
};

module.exports = { inputStream, transformStream, outputStream };