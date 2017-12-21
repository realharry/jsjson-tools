import * as readline from 'readline';
import * as fs from 'fs';
// import { readFile, readFileSync } from 'fs';
import { EOL } from 'os';
import * as minimist from 'minimist';
// import { ParsedArgs } from 'minimist';


export class JsonCmp {

  private rl: readline.ReadLine;

  constructor(
    private files: string[],
    private quiet: boolean = false  // Not being used.
  ) {
    // TBD: Is it safe to reuse rl???
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    });
  }

  // TBD:
  // Handle json parse errors???
  public doCmp() {
    // if args is empty, read json from stdin.
    // otherwise read the input files..

    let len = files.length;
    if (len == 0 || len > 2) {
      console.log("Please specify two JSON files.");
      process.stdout.write(2 + EOL);
      process.stdin.end();   // ???
    } else if (len == 1) {
      let self = this;
      let f = files[0];
      if (f == '-') {
        console.log("At least one JSON file is needed.");
        process.stdout.write(2 + EOL);
        process.stdin.end();   // ???
      } else {
        fs.readFile(f, 'utf8', function (err, content1) {
          if (!err) {
            let json1 = '';
            if(content1) {
              let obj1 = JSON.parse(content1);
              json1 = JSON.stringify(obj1);
            }
            // console.log('json1 = ' + json1);

            let content2 = '';
            this.rl.on('line', function (line) {
              content2 += line;
            }).on('close', function () {
              let json2 = '';
              if(content2) {
                let obj2 = JSON.parse(content2);
                json2 = JSON.stringify(obj2);
              }
              // console.log('json2 = ' + json2);

              let ecode = 2;
              if(json1 && json2) {
                if (json1 == json2) {
                  ecode = 0;
                } else {
                  ecode = 1;
                }
              }
              process.stdout.write(ecode + EOL);
              // process.stdin.end();   // ???
            })
          } else {
            console.log('err = ' + err);
            process.stdout.write(2 + EOL);
          }
          process.stdin.end();   // ???
        });
      }
    } else {  // len == 2
      // TBD: Use async version....
      // testing.
      let f0 = files[0];
      let f1 = files[1];

      let content0 = '';
      if (f0 == '-') {
        // TBD:
        // Does this work on Windows????
        try {
          content0 = fs.readFileSync('/dev/stdin', 'utf8');
          // console.log('content = ' + content);            
        } catch (ex) {
          console.log("Failed to read stdin: ex = " + ex);
        } finally {
          process.stdin.end();
        }
      } else {
        content0 = fs.readFileSync(f0, 'utf8');
        // console.log('content = ' + content);
      }
      let json0 = '';
      if (content0) {
        let obj0 = JSON.parse(content0);
        json0 = JSON.stringify(obj0);
      }

      let content1 = '';
      if (f1 == '-') {
        // TBD:
        // Does this work on Windows????
        try {
          content1 = fs.readFileSync('/dev/stdin', 'utf8');
          // console.log('content = ' + content);            
        } catch (ex) {
          console.log("Failed to read stdin: ex = " + ex);
        } finally {
          process.stdin.end();
        }
      } else {
        content1 = fs.readFileSync(f1, 'utf8');
        // console.log('content = ' + content);
      }
      let json1 = '';
      if (content0) {
        let obj1 = JSON.parse(content1);
        json1 = JSON.stringify(obj1);
      }

      let ecode = 2;
      if (json0 && json1) {
        if (json0 == json1) {
          ecode = 0;
        } else {
          ecode = 1;
        }
      }
      process.stdout.write(ecode + EOL);

      process.stdin.end();   // ???
    }
    // process.stdin.end();   // ???
  }
}

// TBD: Keep this in sync with package.json.
const version = '0.5';
const versionInfo = `jsoncmp ${version}
Copyright (C) Harry Y. License MIT.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.
`;
const synopsis = `NAME
       jsoncmp - Compare two JSON files

SYNOPSIS
       jsoncmp [OPTION]... JSONFILE1 [JSONFILE2]

DESCRIPTION
       Reads two JSON files and compares them.
       It returns 0 if the two JSON files are equivalent (modulo formatting).
       It returns 1 otherwise. The return code of 2 indicates an error.

       With one JSONFILE missing, or when JSONFILE is -, read standard input.

       -h, --help 
              display this help and exit

       -v --version
              output version information and exit

EXAMPLES
       jsoncmp f1 f2
              compares f1 and f2.

       jsoncmp f1 
              compares f1 and JSON read from the stdin.

AUTHOR
       Written by Harry Y.

REPORTING BUGS
       JsJson online help: <https://gitlab.com/jsjson/>
       Report jsoncmp bugs to <https://gitlab.com/jsjson/tools/issues>

COPYRIGHT
       Copyright © 2017 Harry Y. License MIT.
       This is free software: you are free to change and redistribute it.
       There is NO WARRANTY, to the extent permitted by law.
`;

// var argv: ParsedArgs = minimist(process.argv.slice(2));
var argv: minimist.ParsedArgs = minimist(process.argv.slice(2), {
  boolean: ['q'],
  alias: {
    h: 'help',
    v: 'version',
    q: 'quiet'
  }
});
// console.dir(argv);


// Process cmdline args....
var helpRequested = false;
var versionRequested = false;
if (argv.h) {
  helpRequested = true;
} else {
  if (argv.v) {
    versionRequested = true;
  }
}

if (helpRequested) {
  process.stdout.write(synopsis + EOL);
} else if (versionRequested) {
  process.stdout.write(versionInfo);
} else {
  var quiet = false;
  if (argv.q) {  // Not being used...
    quiet = true;
  }

  // Files.
  var files = argv._;
  // console.log(args);

  var jsonCmp = new JsonCmp(files, quiet);
  jsonCmp.doCmp();
}
