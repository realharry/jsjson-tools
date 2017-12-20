# JsonCat
> JSON file concatenator

`jsoncat` concatenates and prints out JSON files to stdout.


## Installation

First, install [node.js](https://nodejs.org/) 
(along with [npm](https://www.npmjs.com/))
if you have already done so.

```bash
npm install -g @jsjson/jsoncat
```

## Running the Script

The NPM package installs an executable `jsoncat` in your PATH.
Run the script as follows:

```bash
jsoncat -i=4 json-file1 json-file2 ...
```

The `-i` or `--indent` flag sets the indentation level when printing out the JSON files.


## License

MIT © [Harry Y](https://gitlab.com/realharry)
