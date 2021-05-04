const { Command } = require('commander');
const program = new Command();
program.version('0.0.1');

const fs = require("fs");

let writeableStream = fs.createWriteStream("text.txt");
writeableStream.write("Start!");
writeableStream.write("Continue \n");
writeableStream.end("End");
let readableStream = fs.createReadStream("text.txt", "utf8");

readableStream.on("data", function(chunk){
    console.log(chunk);
});