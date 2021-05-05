const { Command } = require('commander');
const fs = require("fs");
const encodeText = (text) => {
    return `encode: ${text}`;
}
let encodedText = "";
const program = new Command();
program.version('0.0.1');
program
    .option('-s, --shift <type>', 'a shift for code')
    .option('-i, --input <type>', 'an input file')
    .option('-o, --output <type>', 'an output file')
    .option('-a, --action <type>', 'an action encode/decode');
program.parse(process.argv);

const options = program.opts();

const outputText = (encodedText) => {
    if (options.hasOwnProperty("output")) {
        const writeableStream = fs.createWriteStream(options.output);
        writeableStream.write(encodedText);
        writeableStream.end("");
    } else {
        process.stdout.write("DATA " + encodedText);
    }
}

if (options.hasOwnProperty("input")) {
    const readableStream = fs.createReadStream(options.input, "utf8");
    readableStream.on("data", function(inputText){
        encodedText = encodeText(inputText);
        outputText(encodedText);
    });
} else {
    process.stdin.setEncoding("utf8");
    process.stdin.on("readable", () => {
        const inputText = process.stdin.read();
            encodedText = encodeText(inputText);
            outputText(encodedText);
    });
}
