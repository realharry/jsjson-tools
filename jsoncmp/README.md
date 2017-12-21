# JsonCmp
> Compare two JSON files

`jsoncmp` reads two JSON files and compares them.
Exit status is 0 if the files are the same, 1 if different, 2 if trouble.


## Installation

First, install [node.js](https://nodejs.org/) 
(along with [npm](https://www.npmjs.com/))
if you haven't already done so.

```bash
npm install -g @jsjson/jsoncmp
```

## Running the Script

The NPM package installs an executable `jsoncmp` in your PATH.
Run the script as follows:

```bash
jsoncmp json-file1 json-file2
```

`jsoncmp` returns 0 if the two JSON files are equivalent (modulo formatting).
It returns 1 otherwise.
The return code of 2 indicates an error.

If a file is '-' or missing, read standard input.

For complete usage info, including examples, try:

```bash
jsoncmp -h
```


## License

MIT © [Harry Y](https://gitlab.com/realharry)
