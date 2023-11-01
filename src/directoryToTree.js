import fs from 'fs';
import path from 'path';

const isDirectory = (dirPath) => fs.statSync(dirPath).isDirectory();

const getDirFullSize = (dirPath) => {
    
    const files = fs.readdirSync(dirPath);
    
    const size = files.reduce((acc, file) => {
        const childPath = path.join(dirPath, file);
        const thisSize = fs.statSync(childPath).size;
        const size = isDirectory(childPath) ? getDirFullSize(childPath) + thisSize : thisSize;
        return acc + size;
    }, 0);
    
    return size;
}

const directoryToTree = (rootPath = './', maxDepth) => {
    const pathName = path.resolve(rootPath);
    const name = pathName.split('/').pop();
    const type = isDirectory(pathName) ? 'dir' : 'file';
    const fileRootPath = pathName.split('/' + name)[0];
    const size = type == 'dir' ? getDirFullSize(pathName) : fs.statSync(pathName).size;
    
    const data = {
        name,
        type,
        size,
        pathName,
    };

    let currentDepth = 0;

    if (type == 'dir' && currentDepth < maxDepth) {
        data.children = (() => {
            ++currentDepth;
            const children = [];
            const childFiles = fs.readdirSync(pathName);
            childFiles.forEach(fileName => {
                const childPath = path.join(pathName, fileName);
                const childData = directoryToTree(childPath, maxDepth - currentDepth);
                children.push(childData);
            });
            return children;
        })()
    }

    return JSON.parse(JSON.stringify(data));
}

export default directoryToTree;