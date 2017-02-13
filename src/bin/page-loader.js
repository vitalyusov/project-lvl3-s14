#!/usr/bin/env node

import program from 'commander';

program
  .version('0.1.0')
  .description('Loads web page with its assets')
  .option('-o, --output [path]', 'Output directory')
  .arguments('<url>')
  .action((url, options) => console.log(url))
  .parse(process.argv);
