#!/usr/bin/env node

import program from 'commander';
import loader from '../';
program
  .version('0.1.0')
  .description('Loads web page with its assets')
  .option('-o, --output [path]', 'Output directory')
  .arguments('<url>')
  .action((url, options) => {
    console.log(url);
    loader(url).then(res => console.log(res));
  })
  .parse(process.argv);
