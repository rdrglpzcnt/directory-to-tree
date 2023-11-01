import directoryToTree from './directoryToTree.js'

const params = process.argv.slice(2);
const rootPathParam = params[0];
const maxDepthParam = params[1];

console.log(JSON.stringify(directoryToTree(rootPathParam, maxDepthParam)));