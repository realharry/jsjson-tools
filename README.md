# JsJson Tools
> JSON command line tools and utilities (WIP)


## JsonCat

_Concatenate JSON files_


[jsoncat](jsoncat) concatenates multiple JSON files into a single array and prints out the output to the stdout.
When a single JSON file is given, it does not add a top-level array.
When no JSON file argument is given, it reads JSON from the stdin.
 


## JsonCmp

_Compare two JSON files_


[jsoncmp](jsoncmp) reads two JSON files and compares them.
It returns 0 if the two JSON files are equivalent (modulo formatting).
It returns 1 otherwise.
The return code of 2 indicates an error.


## JsonHead

_Print the first part of JSON files_


[jsonhead](jsonhead) reads multiple JSON files and prints out the first 4 nodes of each JSON to the stdout, with the file name headers.
The `-n` or `--nodes` argument sets the number of nodes or elements of JSON to print out instead of 4.
When no JSON file is given, it reads JSON from the stdin.



