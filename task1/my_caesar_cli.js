const helper = require('./functions');
const program = require('./program');
const fs = require("fs");
const options = program.opts();
let outputText = "";

const writeText = (encodedText) => {
    if (options.hasOwnProperty("output")) {
        const writeableStream = fs.createWriteStream(options.output, {flags: "a"});
        writeableStream.write(`${encodedText}\n`);
        writeableStream.end();
    } else {
        process.stdout.write(encodedText);
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
