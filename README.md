# directory-to-tree

Simple Node.js function that returns directory structure up to a specified depth in JSON format.

### Dependencies

- Node.js

### Installation

- clone the project repository
- navigate to project directory
- run the createDummyDir.sh bash script with `bash createDummyDir.sh`. This will create a random directory structure in the project directory.

### CLI
You can run the function from the CLI with `npm run directoryToTree`. This function receives two parameters.
**rootPath**: *String* - The path to the root directory you want to process (relative to `process.cwd()`).
**maxDepth**: *Number* - The depth of the directory tree to include in the result structure;

##### Examples
- npm run directoryToTree
- npm run directoryToTree node_modules 5
- npm run directoryToTree ./ 10

### Client App
- If you wanna use the tool from a GUI you can do so by following the next steps.
- navigate to project directory
- run npm install && npm run serve to start the Express.js server.
- Open your browser in localhost:3000 (hard coded for the sake of simplicity)

---
by rdrglpzcnt
