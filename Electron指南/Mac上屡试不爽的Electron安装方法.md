1. 设置electron镜像源
```
ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"
ELECTRON_GET_NO_V_PREFIX=1
```

2. 先全局安装cross-env
```bash
npm i -g cross-env
```

3. 安装electron
```bash
cross-env npm_config_electron_mirror="https://npm.taobao.org/mirrors/electron/" npm_config_electron_custom_dir="8.2.0" npm i -D
```
&emsp;&emsp;不出意外，安装成功。如果尚未成功，请继续第4步

4. wget electron
```bash
cd ~/Library/Caches/electron/
mkdir httpsgithub.comelectronelectronreleasesdownloadv8.2.0electron-v8.2.0-darwin-x64.zip
cd httpsgithub.comelectronelectronreleasesdownloadv8.2.0electron-v8.2.0-darwin-x64.zip
wget https://npm.taobao.org/mirrors/electron/8.2.0/electron-v8.2.0-darwin-x64.zip
```
&emsp;&emsp;再次回到项目里，执行npm i。