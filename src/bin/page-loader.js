#!/usr/bin/env node

import program from 'commander';
import load from '../';

program
  .version('0.1.0')
  .description('Loads web page with its assets')
  .option('-o, --output [path]', 'Output directory')
  .arguments('<url>')
  .action((url, options) => {
    load(url, options.output);
  })
  .parse(process.argv);
