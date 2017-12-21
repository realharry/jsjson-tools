import * as readline from 'readline';
import * as fs from 'fs';
// import { readFile, readFileSync } from 'fs';
import { EOL } from 'os';
import * as minimist from 'minimist';
// import { ParsedArgs } from 'minimist';


export class JsonHead {

  private rl: readline.ReadLine;

  constructor(
    private files: string[],
    private nodes: number = 4,
    private indent: number = 2,
    private quiet: boolean = false
  ) {
    // TBD: Is it safe to reuse rl???
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    });
  }

  private getHead(obj: any): any {
    if (obj.constructor === Array) {
      let arr = obj as any[];
      let narr: any[] = [];
      let max = Math.min(arr.length, this.nodes);
      for (let i = 0; i < max; i++) {
        narr.push(arr[i]);
      }
      return narr;
    } else {
      let nobj = {};
      let ctr = 0;
      for (let k in obj) {
        if (ctr++ < this.nodes) {
          nobj[k] = obj[k];
        } else {
          break;
        }
      }
      return nobj;
    }
  }

  // TBD:
  // Handle json parse errors???
  public doHead() {
    // if args is empty, read json from stdin.
    // otherwise read the input files..

    let len = files.length;
    if (len == 0) {
      let self = this;
      let content = '';
      this.rl.on('line', function (line) {
        // console.log('line: ' + line);
        content += line;
      }).on('close', function () {
        // console.log('close: content = ' + content);
        let obj = JSON.parse(content);
        let nobj = self.getHead(obj);
        let json = JSON.stringify(nobj, null, self.indent);
        // console.log('json = ' + json);
        process.stdout.write(json + EOL);
      })
    } else if (len == 1) {
      let self = this;
      let f = files[0];
      if (f == '-') {
        let content = '';
        this.rl.on('line', function (line) {
          // console.log('line: ' + line);
          content += line;
        }).on('close', function () {
          // console.log('close: content = ' + content);
          let obj = JSON.parse(content);
          let nobj = self.getHead(obj);
          let json = JSON.stringify(nobj, null, self.indent);
          // console.log('json = ' + json);
          process.stdout.write(json + EOL);
          // process.stdin.end();   // ???
        })
      } else {
        fs.readFile(f, 'utf8', function (err, content) {
          // console.log('err = ' + err);
          // console.log('content = ' + content);
          if (!err) {
            let obj = JSON.parse(content);
            let nobj = self.getHead(obj);
            let json = JSON.stringify(nobj, null, self.indent);
            // console.log('json = ' + json);
            process.stdout.write(json + EOL);
          } else {
            console.log('err = ' + err);
          }
          process.stdin.end();   // ???
        });
      }
    } else {
      // TBD: Use async version....
      // testing.
      let jsonArr: any[] = [];
      for (let f of files) {
        if(!this.quiet) {
          process.stdout.write(`==> ${f} <==` + EOL);
        }
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
        let nobj = this.getHead(obj);
        let json = JSON.stringify(nobj, null, this.indent);
        // console.log('json = ' + json);
        process.stdout.write(json + EOL);
        process.stdin.end();   // ???
      }
    }
    // process.stdin.end();   // ???
  }
}

// TBD: Keep this in sync with package.json.
const version = '0.5';
const versionInfo = `jsonhead ${version}
Copyright (C) Harry Y. License MIT.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.
`;
const synopsis = `NAME
       jsonhead - Output the first part of JSON files

SYNOPSIS
       jsonhead [OPTION]... [JSONFILE]...

DESCRIPTION
       Print the first 4 nodes/elements of each JSONFILE to standard output.  
       With more than one JSONFILE, precede each with a header
       giving the file name.

       With no JSONFILE, or when JSONFILE is -, read standard input.

       -n, --nodes=NUM
              print the first NUM nodes/elements instead of the first 4

       -i, --indent=INDENT
              set indent level to INDENT. The default value is 2

       -q, --quiet
              never print headers giving file names

       -h, --help 
              display this help and exit

       -v --version
              output version information and exit

EXAMPLES
       jsonhead
              Reads JSON from stdin and outputs the first 4 nodes of the JSON to stdout.

       jsonhead -n=2 f
              Outputs the first 2 nodes of f.

       jsonhead -q -i=-1 f1 f2
              Outputs the first 4 nodes of f1 and f2 without printing file name headers,
              and without indentation.

AUTHOR
       Written by Harry Y.

REPORTING BUGS
       JsJson online help: <https://gitlab.com/jsjson/>
       Report jsonhead bugs to <https://gitlab.com/jsjson/tools/issues>

COPYRIGHT
       Copyright © 2017 Harry Y. License MIT.
       This is free software: you are free to change and redistribute it.
       There is NO WARRANTY, to the extent permitted by law.
`;

// var argv: ParsedArgs = minimist(process.argv.slice(2));
var argv: minimist.ParsedArgs = minimist(process.argv.slice(2), {
  boolean: ['h', 'v', 'q'],
  alias: {
    h: 'help',
    v: 'version',
    n: 'nodes',
    i: 'indent',
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
  var nodes = 4; // default
  if (argv.n) {
    try {
      nodes = parseInt(argv.n);
    } catch (ex) {
      // ignore
    }
  }
  // var indent = -1; // default: no indentation.
  var indent = 2;   // default
  if (argv.i) {
    try {
      indent = parseInt(argv.i);
    } catch (ex) {
      // ignore
    }
  }
  if (argv.q) {
    quiet = true;
  }

  // Files.
  var files = argv._;
  // console.log(args);

  var jsonHead = new JsonHead(files, nodes, indent, quiet);
  jsonHead.doHead();
}
