const { Command } = require('commander');
const program = new Command();
program.version('0.0.1');
program
    .option('-a, --action <value>', 'an action encode/decode')
    .option('-s, --shift <value>', 'a shift for code')
    .option('-i, --input <filename>', 'an input file','stdin')
    .option('-o, --output <filename>', 'an output file','stdout');
program.parse(process.argv);
module.exports = program;
