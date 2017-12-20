import * as readline from 'readline';
import * as fs from 'fs';
// import { readFile, readFileSync } from 'fs';
import { EOL } from 'os';
import * as minimist from 'minimist';
// import { ParsedArgs } from 'minimist';


export class JsonCat {

  private rl: readline.ReadLine;

  constructor(
    private files: string[],
    private indent: number = 2,
    private merge: boolean = false
  ) {
    // TBD: Is it safe to reuse rl???
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    });
  }


  // ????
  // tbd: Need to use callback, or other async way...
  private readFromStdin(cb = null): any {
    let obj: (any | null) = null;
    let content = '';
    this.rl.on('line', function (line) {
      // console.log('line: ' + line);
      content += line;
    }).on('close', function () {
      // console.log('close: content = ' + content);
      obj = JSON.parse(content);
    })
    return obj;
  }

  // TBD:
  // Handle json parse errors???
  public doCat() {
    // if args is empty, read json from stdin.
    // otherwise "concat" the input files..

    let len = files.length;
    if (len == 0) {
      // console.log("Input your JSON files.")

      // tbd: readFromStdin() currently does not work.
      // let obj = this.readFromStdin();
      // let json = JSON.stringify(obj, null, indent);
      // // console.log('json = ' + json);
      // process.stdout.write(json + EOL);

      let content = '';
      this.rl.on('line', function (line) {
        // console.log('line: ' + line);
        content += line;
      }).on('close', function () {
        // console.log('close: content = ' + content);
        let obj = JSON.parse(content);
        let json = JSON.stringify(obj, null, indent);
        // console.log('json = ' + json);
        process.stdout.write(json + EOL);
      })
    } else if (len == 1) {
      let f = files[0];
      if (f == '-') {
        let content = '';
        this.rl.on('line', function (line) {
          // console.log('line: ' + line);
          content += line;
        }).on('close', function () {
          // console.log('close: content = ' + content);
          let obj = JSON.parse(content);
          let json = JSON.stringify(obj, null, indent);
          // console.log('json = ' + json);
          process.stdout.write(json + EOL);
        })
      } else {
        fs.readFile(f, 'utf8', function (err, content) {
          // console.log('err = ' + err);
          // console.log('content = ' + content);
          if (!err) {
            let obj = JSON.parse(content);
            let json = JSON.stringify(obj, null, indent);
            // console.log('json = ' + json);
            process.stdout.write(json + EOL);
          } else {
            console.log('err = ' + err);
          }
        });
      }
    } else {
      // TBD: Use async version....
      // testing.
      let jsonArr: any[] = [];
      for (let f of files) {
        let content = '';
        if (f == '-') {
          // TBD:
          // Does this work on Windows????
          try {
            content = fs.readFileSync('/dev/stdin', 'utf8');
            // console.log('content = ' + content);            
          } catch (ex) {
            console.log("Failed to read stdin: ex = " + ex);
          } finally {
            process.stdin.end();
          }
        } else {
          content = fs.readFileSync(f, 'utf8');
          // console.log('content = ' + content);
        }
        let obj = JSON.parse(content);
        if (merge && obj.constructor === Array) {
          let arr = obj as any[];
          for (let a of arr) {
            jsonArr.push(a);
          }
        } else {
          jsonArr.push(obj);
        }
      }
      let json = JSON.stringify(jsonArr, null, indent);
      // console.log('json = ' + json);
      process.stdout.write(json + EOL);
    }
  }
}

// TBD: Keep this in sync with package.json.
const version = '0.6';
const versionInfo = `jsoncat ${version}
Copyright (C) Harry Y. License MIT.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.
`;
const synopsis = `NAME
       jsoncat - concatenate json files and print on the standard output

SYNOPSIS
       jsoncat [OPTION]... JSONFILE [JSONFILE]...

DESCRIPTION
       Concatenate and pretty-print JSONFILE(s) to standard output.

       With no JSONFILE, or when JSONFILE is -, read standard input.

       -i, --indent=INDENT
              set indent level to INDENT. The default value is 2.

       -m, --merge
              if set, top-level JSON arrays from each file, if present, will be merged.

       -h, --help 
              display this help and exit

       -v --version
              output version information and exit

EXAMPLES
       jsoncat
              Reads stdin and outputs the contents to stdout as a JSON string.

       jsoncat -i=4 f
              Outputs f's contents using indentation level 4.

       jsoncat f1 - f2
              Concatenates the contents of f1, stdin, and f2 into a new JSON array and outputs the JSON string to stdout.

       jsoncat -m f1 f2
              Merges the contents of f1 and f2 as a single array and outputs the JSON string to stdout.

AUTHOR
       Written by Harry Y.

REPORTING BUGS
       JsJson online help: <https://gitlab.com/jsjson/>
       Report jsoncat bugs to <https://gitlab.com/jsjson/tools/issues>

COPYRIGHT
       Copyright © 2017 Harry Y. License MIT.
       This is free software: you are free to change and redistribute it.
       There is NO WARRANTY, to the extent permitted by law.
`;

// var argv: ParsedArgs = minimist(process.argv.slice(2));
var argv: minimist.ParsedArgs = minimist(process.argv.slice(2), {
  boolean: ['h', 'v', 'm'],
  alias: {
    h: 'help',
    v: 'version',
    i: 'indent',
    m: 'merge'
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
  var merge = false;
  var indent = 2; // default
  if (argv.i) {
    try {
      indent = parseInt(argv.i);
    } catch (ex) {
      // ignore
    }
  }
  if (argv.m) {
    merge = true;
  }

  // Files.
  var files = argv._;
  // console.log(args);

  var jsonCat = new JsonCat(files, indent, merge);
  jsonCat.doCat();
}
