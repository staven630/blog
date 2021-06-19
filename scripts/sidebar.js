const path = require('path')
const fs = require('fs-extra')
const pinyin = require('node-pinyin')
const DICTS = require('../dicts/index')
const del = require('del');

const resolve = dir => path.resolve(__dirname, dir);
const outputResolve = dir => path.resolve(__dirname, '../docs', dir);

// 需要复制的目录
const copyDirsMap =  new Map([
  ['img', 1]
])

// 需要复制的目录
const ignoreCleanMap =  new Map([
  ['.vuepress', 1]
])


const getPinYin = text => {
  if (DICTS[text]) return DICTS[text];
  if (/^[A-Za-z0-9\-\.\——\_\--@]+$/.test(text)) return text.toLocaleLowerCase();
  return pinyin(text, {
    style: 'normal'
  }).reduce((acc, curr, index) => {
    if (index === 0) {
      acc += curr[0]
    } else if (index === 1) {
      acc += `_${curr[0].slice(0, 1)}`
    } else {
      acc += curr[0].slice(0, 1);
    }
    return acc;
  }, '').toLocaleLowerCase();
}

const getPinYinPath = (paths) => {
  return paths.reduce((acc, curr) => {
    if (curr) {
      acc.push(getPinYin(curr))
    }
    return acc;
  }, []).join('/');
} 

// 判断是否是文件夹目录
const isDir = (dirPath) => {
  return fs.lstatSync(dirPath).isDirectory();
}

// 判断是Markdown文件
const isMarkdown = (filename) => {
  return filename.endsWith('.md');
}

// 判断是否是README.md文件
const isREADME = (filename) => {
  return filename.toLocaleLowerCase() === 'readme.md';
}

const getMarkdownName = (filename) => {
  if (isREADME(filename)) return 'README';
  return filename.slice(0, filename.length - 3);
}

const getMarkdownPinyinName = (filename) => {
  if (isREADME(filename)) return 'README';
  const name = filename.slice(0, filename.length - 3).toLocaleLowerCase();
  return getPinYin(name);
}

const getOutputPath = (alias, name) => {
  alias = alias.toLocaleLowerCase();
  return name ? '/' + getPinYinPath([alias, name.toLocaleLowerCase()]) : '/' + alias;
}


const getSidebarPath = (filepath) => {
  filepath = getOutputPath(filepath)
  if (filepath.endsWith('/')) return filepath;
  return `${filepath}/`;
}



function formatEmpty(text) {
  return text.replace(/\s*/g,"");
}

// 深度复制文件夹
const copyDir = function(entryPath, alias) {
  const outputPath = outputResolve(`./${alias}`);
  fs.ensureDirSync(outputPath);
  fs.readdirSync(entryPath).forEach(file => {
    const filepath = path.resolve(entryPath, file);
    const currAlias = getPinYinPath([alias, file]);
    if (isDir(filepath)) {
      copyDir(filepath, currAlias)
    } else {
      fs.copyFileSync(filepath, outputResolve(`./${currAlias}`))
    } 
  })
}

// 清理文件架下的所有文件
async function cleanAll(dirPath) {
  const dirs = fs.readdirSync(dirPath).filter(item => !ignoreCleanMap.get(item));
  for (const dir of dirs) {
    await del(outputResolve(dir));
    console.log(`${dir} is deleted!`);
  }
  console.log('Delete assets End!');
}

function dirsEach(dirPath, alias, dirCb, fileCb) {
  const dirs = fs.readdirSync(dirPath).sort((a, b) => {
    const a1 = +a.split('_')[0];
    const b1 = +b.split('_')[0];
    if (a1 < b1) return -1;
    if (a1 > b1) return 1;
    return 0;
  });
  for (let dir of dirs) {
    const currPath = path.resolve(dirPath, dir);
    dir = dir.replace(/\d+_/g, '')
    const newDir = formatEmpty(dir);
    // 处理目录下md文件
    if (isMarkdown(newDir)) {
      const mdName = getMarkdownPinyinName(newDir);
      fs.copyFileSync(currPath, outputResolve(`./${getOutputPath(alias, `${mdName}.md`)}`));
      if (fileCb) {
        fileCb(dirPath, alias, dir, mdName);
      }
    }

    if (isDir(currPath)) {
      
      const currAlias = getPinYinPath([alias, newDir]);
      // 复制需要复制的文件夹
      if (copyDirsMap.get(newDir.toLocaleLowerCase())) {
        copyDir(currPath, currAlias);
      } else {
        fs.ensureDirSync(outputResolve(`./${currAlias}`));
        // 处理其他文件夹
        dirCb(currPath, currAlias, dir);
      }
    } 
  }
}

function getChildren(dirPath, alias, level = 1) {
  let sidebarList = [];
  let hasReadme = false;
  dirsEach(dirPath, alias, (p, a, f) => {
    const result = getChildren(p, a, level + 1);
    if (result.children.length) {
      const params = {
        title: f,
        collapasble: false,
        children: result.children,
      }
     
      if (result.hasReadme) {
        params.path = getOutputPath(a);
      }
      sidebarList.push(params)
    }
    
  }, 
  (c, a, d, n) => {
    if (n === 'README') {
      hasReadme = true;
      // level ===  1 && sidebarList.unshift(['', path.basename(c)]);
      level ===  1 && sidebarList.unshift(['', '概述']);
    } else {
      sidebarList.push([getOutputPath(a, n), getMarkdownName(d)])
    }
  });

  return {
    children: sidebarList,
    hasReadme
  }
}

function writeSidebar(sidebarConfig) {
  fs.writeJSONSync(resolve('../docs/.vuepress/themeConfig/sidebar.json'), sidebarConfig);
  console.log('sidebar.json生成结束!');
}

function generateSidebar(dirPath, alias = '', isSecond = false) {
  let sidebarConfig = {};
  dirsEach(dirPath, alias, (filePath, fileAlias) => {
    if (!isSecond) {
      sidebarConfig[`${getSidebarPath(fileAlias)}`] = getChildren(filePath, fileAlias).children;
    } else {
      dirsEach(filePath, fileAlias, (p, a) => {
        sidebarConfig[`${getSidebarPath(a)}`] = getChildren(p, a).children;
      })
    }
  });
  writeSidebar(sidebarConfig);
}

async function init(rootPath, isSecond = false) {
  await cleanAll(outputResolve(''));
  generateSidebar(rootPath, '', isSecond);
}

const rootPath = resolve('../md');
init(rootPath, true);