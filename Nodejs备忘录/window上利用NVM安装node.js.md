# 下载
* 打开[https://github.com/coreybutler/nvm-windows/releases](https://github.com/coreybutler/nvm-windows/releases)
* 选择nvm-noinstall.zip下载
* 解压至C:\dev\nvm，解压后有以下几个文件：elevate.cmd、elevate.vbs、install.cmd、LICENSE、nvm.exe
* 以管理员身份打开install.cmd，直接回车，会在c盘根目录生成一个settings.txt
* 修改settings.txt
```
root: C:\dev\nvm 
path: C:\dev\nodejs 
arch: 64 
proxy: none 
node_mirror: http://npm.taobao.org/mirrors/node/ 
npm_mirror: https://npm.taobao.org/mirrors/npm/
```

# 修改环境变量
* 在以上步骤中点击了install.cmd，会自动生成NVM_HOME 和NVM_SYMLINK两个环境变量
* 修改NVM_HOME 和NVM_SYMLINK的值:：
```
NVM_HOME的变量值为
C:\dev\nvm;
NVM_SYMLINK的变量值为
C:\dev\nodejs
```
* 如果在Path中存在C:\dev\nvm;或者是C:\dev\nodejs或其他node的配置，把他们删掉，在Path的最前面输入： 
```
;%NVM_HOME%;%NVM_SYMLINK%;
```

# 下载node
* 新打开cmd窗口，运行nvm v,看到nvm版本信息就可以安装node.js。如果找不到settings.txt,可以将c盘下settings.txt复制到C:\dev\nvm文件夹中
* 安装node
```
// 安装最新版本
nvm install latest
// 安装指定版本
nvm install 10.15.1
```
* 使用指定版本
```
nvm use 10.15.1
```

# 安装npm
* 设置prefix
```
npm config set prefix "C:\dev\nvm\npm"
```
* 重新安装npm
```
npm install npm -g
```
* 添加npm的环境变量
```
变量名为：NPM_HOME
变量值为 ：C:\dev\nvm\npm
```
* 在Path的最前面添加，一定要添加在 %NVM_SYMLINK%之前添加
```
;%NPM_HOME%;
```
