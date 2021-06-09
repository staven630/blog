# 安装node
##### 下载nvm
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```
##### 下载node
```bash
nvm install node
```
&emsp;&emsp;如果nvm命令未找到，进入.nvm目录，创建.bash_profile文件
```bash
touch .bash_profile
```
&emsp;&emsp;将以下内容复制进.bash_profile文件中
```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```
&emsp;&emsp;使.bash_profile生效
```bash
source .bash_profile
```

# 安装verdaccio
```bash
npm i -g verdaccio pm2
```

##### 编辑verdaccio配置文件config.yaml
```bash
vi /root/.config/verdaccio/config.yaml
```
&emsp;&emsp;添加以下taobao镜像源，开放外网4873端口。
```yaml
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
  taobao:
    url: https://registry.npm.taobao.org/

packages:
  '@*/*':
    # scoped packages
    access: $all
    publish: $authenticated
    unpublish: $authenticated
    proxy: taobao

  '*/*':
    # scoped packages
    access: $all
    publish: $authenticated
    unpublish: $authenticated
    proxy: taobao

listen: 0.0.0.0:4873
```
##### 配置防火墙
```bash
firewall-cmd --state                 # 先查看防火墙状态，
service firewalld start              # 开启防火墙:
firewall-cmd --zone=public --permanent --add-port=4873/tcp  # 开放4873端口
firewall-cmd --reload                # 重新载入
firewall-cmd --zone=public --query-port=4873/tcp    # 查看是否添加成功
```

# 启动
&emsp;&emsp;通过pm2集群激动verdaccio：
```bash
pm2 start verdaccio

# 查看pm2管理项目进程信息
pm2 ls

# 查看端口信息
netstat -nap | grep <pid>
```

# 使用nrm管理verdaccio
```bash
npm i -g nrm
nrm add cio http://xxx.xxx.xxx.xxx:4873
```

# 使用npm私服
```bash
nrm use cio
#添加用户
npm adduser

# 发布包
npm publish
```