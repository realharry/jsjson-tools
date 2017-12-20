// import minimist = require('minimist');
import * as minimist from 'minimist';
// import { ParsedArgs } from 'minimist';
// import fs = require('fs');
import { readFile } from 'fs';

// var argv: ParsedArgs = minimist(process.argv.slice(2));
var argv: minimist.ParsedArgs = minimist(process.argv.slice(2));
// console.dir(argv);
// TBD: Process cmdline args....
var indent = 2; // default
if(argv.i) {
  try {
    indent = parseInt(argv.i);
  } catch(ex) {
    // ignore
  }
}

// Files.
var args = argv._;
// console.log(args);


// if args is empty, read json from stdin.
// otherwise "concat" the input files..

var len = args.length;
if (len == 0) {
  console.log("Reading stdin is not supported yet.")
} else {
  // testing.
  // for now, just read the first file.
  let fileName = args[0];

  readFile(fileName, 'utf8', function (err, content) {
    console.log('err = ' + err);
    // console.log('content = ' + content);

    let obj = JSON.parse(content);
    let json = JSON.stringify(obj, null, indent); 
    console.log('json = ' + json);

  });

}
