# JsonCat
> JSON file concatenator

`jsoncat` concatenates multiple JSON files into a single array and prints out the output to the stdout.
When a single JSON file is given, it does not add a top-level array.
When no JSON file is given, it reads JSON from the stdin.


## Installation

First, install [node.js](https://nodejs.org/) 
(along with [npm](https://www.npmjs.com/))
if you haven't already done so.

```bash
npm install -g @jsjson/jsoncat
```

## Running the Script

The NPM package installs an executable `jsoncat` in your PATH.
Run the script as follows:

```bash
jsoncat -i4 json-file1 json-file2 ...
```

The `-i` or `--indent` argument sets the indentation level when printing out the JSON files. 

Note that each json file should be a valid JSON.
`jsoncat` concatenates the input json files, if more than one file is given, into a single top-level array.
The merge flag, `-m` or `--merges`, merges the JSON files into the top-level array, if a given json file is a JSON array.

When no json file is given, it reads from the stdin (until the EOF signal).
The "-" symbol can also be used for stdin. For example, the following command

```bash
jsoncat -i4 json-file1 - json-file2
```

concatenates json-file1, stdin, and json-file2.


For complete usage info, including examples, try:

```bash
jsoncat -h
```


## License

MIT © [Harry Y](https://gitlab.com/realharry)
