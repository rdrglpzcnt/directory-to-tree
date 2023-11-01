const fs = require('fs');
const path = require('path');

const directoryToTree = (rootPath = './', maxDepth) => {
    const pathName = path.resolve(rootPath);
    const name = pathName.split('/').pop();
    const type = fs.lstatSync(pathName).isDirectory() ? 'directory' : 'file';
    const fileRootPath = pathName.split('/' + name)[0];
    const size = fs.statSync(pathName).size;
    
    const data = {
        name,
        type,
        size,
        pathName,
        rootPath: fileRootPath
    }

    let currentDepth = 0

    if (type == 'directory' && currentDepth < maxDepth) {
        data.children = (() => {
            ++currentDepth
            const children = []
            const childFiles = fs.readdirSync(pathName)
            childFiles.forEach(fileName => {
                const nestedData = directoryToTree(pathName + '/' + fileName, maxDepth - currentDepth);
                children.push(nestedData)
            });
            return children
        })()
    }

    return JSON.parse(JSON.stringify(data))

}

const params = process.argv.slice(2)
const rootPathParam = params[0]
const maxDepthParam = params[1]

console.log(JSON.stringify(directoryToTree(rootPathParam, maxDepthParam)))