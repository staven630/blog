const path = require('path')
const fs = require('fs-extra')


const resolve = dir => path.resolve(__dirname, dir);



function getFiles(rootPath, limit) {
  return fs.readdirSync(rootPath)
  .filter(file => (file.endsWith('.md') && /^\d+_/.test(file) && +file.split('_')[0] >= limit))
  .sort((a, b) => {
    const a1 = +a.split('_')[0];
    const b1 = +b.split('_')[0];
    if (a1 < b1) return -1;
    if (a1 > b1) return 1;
    return 0;
  });
};



function add(dirPath, limit) {
  const rootPath = resolve(dirPath);
  const files = getFiles(rootPath, limit);
  for (const file of files) {
    const arr = /(^\d+)_(.*)/.exec(file);
    const entryPath = path.resolve(rootPath, file);
    const outputName = `${ + arr[1] + 1}_${arr[2]}`;
    const outputPath = path.resolve(rootPath, outputName);
    fs.renameSync(entryPath, outputPath);
  }
}

function multiple(dirPath, limit) {
  const rootPath = resolve(dirPath);
  const files = getFiles(rootPath, limit);
  for (const file of files) {
    const arr = /(^\d+)_(.*)/.exec(file);
    const entryPath = path.resolve(rootPath, file);
    const outputName = `${ + arr[1] - 1}_${arr[2]}`;
    const outputPath = path.resolve(rootPath, outputName);
    fs.renameSync(entryPath, outputPath);
  }
}

function remove(dirPath, limit) {
  const rootPath = resolve(dirPath);
  const files = getFiles(rootPath, limit);
  for (const file of files) {
    const arr = /(^\d+)_(.*)/.exec(file);
    const entryPath = path.resolve(rootPath, file);
    const outputName = `${arr[2]}`;
    const outputPath = path.resolve(rootPath, outputName);
    fs.renameSync(entryPath, outputPath);
  }
}

multiple('../md/Java框架/Spring/2_Spring Bean', 1);