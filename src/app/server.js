import express from 'express';
import fs from 'fs';
import path from 'path';
import directoryToTree from '../directoryToTree.js'

const app = express();

app.set('view engine', 'pug');
app.set('views', path.resolve('src/app/views'));

app.get('/', (req, res, next) => {
    
    const { rootPath, maxDepth } = req.query;
    
    const absoluteRootPath = path.resolve(rootPath || './');
    
    const cwdPath = process.cwd()
    
    const childDirs = fs.readdirSync(cwdPath).filter(childName => {
        const childPath = path.join(cwdPath, childName);
        return fs.statSync(childPath).isDirectory()
    })

    const dirs = ['./'].concat(childDirs)

    res.render('index', {
        rootPath,
        maxDepth,
        dirs,
        data: directoryToTree(rootPath, maxDepth)
    });
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})