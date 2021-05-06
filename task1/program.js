const { Command } = require('commander');
const program = new Command();
program.version('0.0.1');
program
    .option('-a, --action <value>', 'an action encode/decode')
    .option('-s, --shift <filename>', 'a shift for code')
    .option('-i, --input <filename>', 'an input file')
    .option('-o, --output <value>', 'an output file');
program.parse(process.argv);
module.exports = program;
