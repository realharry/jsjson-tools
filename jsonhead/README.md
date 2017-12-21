# JsonHead
> Output the first part of JSON files

`jsonhead` reads multiple JSON files and prints out the first 4 nodes of each JSON 
to the stdout, with the file name headers.
When a single JSON file is given, the file name header is never printed.
When no JSON file is given, it reads JSON from the stdin.


## Installation

First, install [node.js](https://nodejs.org/) 
(along with [npm](https://www.npmjs.com/))
if you haven't already done so.

```bash
npm install -g @jsjson/jsonhead
```

## Running the Script

The NPM package installs an executable `jsonhead` in your PATH.
Run the script as follows:

```bash
jsonhead -n4 json-file1 json-file2 ...
```

`jsonhead` print the first 4 nodes/elements of each JSONFILE to standard output
with the file name headers.
The `-n` or `--nodes` argument sets the number of nodes or elements of JSON to print out instead of 4. 
The flag, `-q` or `--quiet`, prevents the file name headers from being printed.

When no json file is given, it reads from the stdin (until the EOF signal).


For complete usage info, including examples, try:

```bash
jsonhead -h
```


## License

MIT © [Harry Y](https://gitlab.com/realharry)
