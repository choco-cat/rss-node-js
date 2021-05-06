const helper = require('./functions');
const { Command } = require('commander');
const fs = require("fs");

let outputText = "";

const program = new Command();
program.version('0.0.1');
program
    .option('-s, --shift <type>', 'a shift for code')
    .option('-i, --input <type>', 'an input file')
    .option('-o, --output <type>', 'an output file')
    .option('-a, --action <type>', 'an action encode/decode');
program.parse(process.argv);

const options = program.opts();
const writeText = (encodedText) => {
    if (options.hasOwnProperty("output")) {
        const writeableStream = fs.createWriteStream(options.output, {flags: "a"});
        writeableStream.end(`${encodedText}\n`);
    } else {
        process.stdout.write("DATA " + encodedText);
    }
}

if (options.hasOwnProperty("input")) {
    const readableStream = fs.createReadStream(options.input, "utf8");
    readableStream.on("data", function(inputText){
        outputText = helper.encodeDecode(inputText, Number(options.shift), options.action);
        writeText(outputText);
    });
} else {
    process.stdin.setEncoding("utf8");
    process.stdin.on("readable", () => {
        const inputText = process.stdin.read();
        outputText = helper.encodeDecode(inputText, Number(options.shift), options.action);
        writeText(outputText);
    });
}
