# 静态化页面部署

### 发布到 git 仓库

- 生成 dist

```
nuxt generate
```

- gh-pages 发布 git 仓库

```
npm i -D gh-pages
```

- 修改 package.json

```
"scripts": {
  "deploy": "gh-pages -d dist"
}
```

- 发布

```
npm run deploy
```

### 开始 linux 部署

- 进入 linux data/www 目录 git clone 项目
- 配置 nginx

```
server {
  # 端口，默认是 80
  listen 80;
  # 服务名(写域名或者 ip 地址都可以)
  server_name example.com www.example.com;
  # server 根目录
  root /data/www/nuxt-demo;
  # 主入口文件
  index index.html;
  # 反向代理
  location /api/ {
    proxy_pass https://xxx.target.com/;
  }
}
```

- 重启 nginx

```
sudo service nginx restart
```

- 访问http://www.example.com

# 服务端渲染部署

### 项目配置

- 执行

```
npm run build
```

### nginx 配置

- 配置

```
# 通过 upstream nodejs 可以配置多台 nodejs 节点，做负载均衡
# keepalive 设置存活时间。如果不设置可能会产生大量的 timewait
# proxy_pass 反向代理转发 http://nodejs

upstream nodenuxt {
    server 127.0.0.1:3000; # nuxt 项目监听端口
    keepalive 64;
}
server {
  listen 80;
  server_name example.com www.example.com;

  location / {
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_set_header X-Nginx-Proxy true;
    proxy_cache_bypass $http_upgrade;
    proxy_pass http://nodenuxt; # 反向代理
  }
}
```

- 重启 nginx

```
sudo service nginx restart
```

# pm2 进程守护

```
npm i -g pm2
// nuxt-demo：项目目录
pm2 start npm --name "nuxt-demo" -- run start
```
