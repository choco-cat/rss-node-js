const { Command } = require('commander');
const program = new Command();
program.version('0.0.1');

program
    .option('-s, --shift <type>', 'a shift for code')
    .option('-i, --input <type>', 'an input file')
    .option('-o, --output <type>', 'an output file')
    .option('-a, --action <type>', 'an action encode/decode');

program.parse(process.argv);

const options = program.opts();

if (Object.keys(options).length !== 0) {
    console.log(options);
}

const fs = require("fs");

let writeableStream = fs.createWriteStream("text.txt");
writeableStream.write("Start!");
writeableStream.write("Continue \n");
writeableStream.end("End");
let readableStream = fs.createReadStream("text.txt", "utf8");

readableStream.on("data", function(chunk){
    console.log(chunk);
});