# 简介
&emsp;&emsp;PM2是node进程管理工具。支持性能监控、自动重启、负载均衡等功能。

# 安装
```
npm i -g pm2
// or
yarn global add pm2
```

# 常用命令
### 启动应用： pm2 start

* --name <app_name>：指定应用程序名称。
* --watch：当文件更改时监听并重新启动应用程序。
* --max-memory-restart <200MB>：设置应用程序重新加载的内存阈值
* --log <log_path>：指定日志文件
* --restart-delay <delay in ms>：自动重启之间的延迟
* --time：为日志添加时间前缀
* --no-autorestart：不自动重新启动应用程序
* --cron <cron_pattern>：指定的cron以强制重新启动
* --no-daemon：附加到应用程序日志
* -- arg1 arg2 arg3：向脚本传递额外参数
* -i --instances：启用多少个实例，可用于负载均衡。-i 0或-i max，PM2将自动检测可用CPU的数量
* --ignore-watch：排除监听的目录/文件，可以是特定的文件名，也可以是正则。
* -o --output <path>：标准输出日志文件的路径
* -e --error <path>：错误输出日志：

```
pm2 start npm --name 'doc_ssr' -- run prod

pm2 start app.js
pm2 start app.js --watch
pm2 start app.js --port 1520
```

### 管理流程
* 重启
```
pm2 restart <app_name|app_id>
pm2 restart all

pm2 reload <app_name|app_id>
pm2 reload all
```

* 停止
```
pm2 stop <app_name|app_id>
pm2 stop all
```

* 删除
```
pm2 delete <app_name>
pm2 delete all
```

### 查看状态、日志
* 查看所有应用程序
```
// 显示所有进程状态
pm2 list
pm2 ls
pm2 status
```
* 查看详情
```
pm2 describe <app_id>
```
* 显示日志
```
pm2 logs

// 显示旧日志
pm2 logs --lines 200

// 清空所有日志
pm2 flush 

// 重新加载所有日志
pm2 reloadLogs
```

### 开机启动
```
// 在服务器启动/重新启动pm2
pm2 startup

// 保存配置
pm2 save
```

### 监控进程
```
pm2 monit
```

### 监控、诊断web显示
```
pm2 plus
```

### 更新pm2
```
pm2 update
```

# 环境配置
&emsp;&emsp;通过--env类指明当前执行环境
```
{
   "env": {
      "NODE_ENV": "production",
      "BASE_URL": "http://www.prod.com/"
    },
    "env_dev": {
      "NODE_ENV": "development",
      "BASE_URL": "http://dev.com/"
    },
    "env_test": {
      "NODE_ENV": "test",
      "BASE_URL": "http://test.com/"
    }
}
```

```
pm2 start app.js --env dev
```

# 集群模式
&emsp;&emsp;PM2包括一个自动负载均衡器，它将共享每个衍生进程之间的所有HTTP[s]/Websocket/TCP/UDP连接。
<br />
&emsp;&emsp;要以群集模式启动应用程序：
```
pm2 start <app_name> -i max
```


# 配置文件
| 配置项             | 描述                                                       |
| :----------------- | :--------------------------------------------------------- |
| name               | 应用进程名称                                               |
| script             | 启动脚本路径                                               |
| cwd                | 启用路径                                                   |
| env                | 环境变量                                                   |
| watch              | 监听重启                                                   |
| ignore_watch       | 忽略监听的文件夹，支持正则表达式                           |
| args               | 传递给脚本的参数                                           |
| max_memory_restart | 超出内存阀值重启                                           |
| interpreter        | 指定的脚本解释器                                           |
| interpreter_args   | 传递给解释器的参数                                         |
| instances          | 应用启动实例个数，仅在cluster模式有效，默认为fork          |
| exec_mode          | 应用启动模式。支持fork、cluster模式                        |
| log_date_format    | 指定日志日期格式，如YYYY-MM-DD HH:mm:ss                    |
| error_file         | 记录标准错误文件位置                                       |
| out_file           | 记录标准输出文件位置                                       |
| min_uptime         | 应用运行少于时间被认为是异常启动                           |
| max_restarts       | 最大异常重启次数                                           |
| autorestart        | 默认为true, 发生异常的情况下自动重启                       |
| restart_delay      | 异常重启情况下，延时重启时间                               |
| cron_restart       | crontab时间格式重启应用，目前只支持cluster模式             |
| force              | 默认false，如果true，可以重复启动一个脚本。pm2不建议这么做 |

### 生成配置文件
```
pm2 ecosystem
```

ecosystem.config.js
```
module.exports = {
  apps : [{
    name: 'API',
    script: 'app.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
```

```
pm2 [start|restart|stop|delete] ecosystem.json
```

# pm2 + nginx
```

upstream my_nodejs_upstream {
    server 127.0.0.1:3001;
}

server {
    listen 80;
    server_name my_nodejs_server;
    root /home/www/project_root;
    
    location / {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-NginX-Proxy true;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_max_temp_file_size 0;
        proxy_pass http://my_nodejs_upstream/;
        proxy_redirect off;
        proxy_read_timeout 240s;
    }
}
```

# 部署
### pm2配置
* ecosystem.config.js
```
module.exports = {
  apps: [
    {
      name: 'deploy-demo',
      script: 'app.js',
      // args: '',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],

  deploy: {
    production: {
      user: 'staven630',
      host: ['212.83.163.1'],
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      path: '/var/www/production',
      // ssh_options: "StrictHostKeyChecking=no", // SSH公钥检查
      'pre-deploy': 'git fetch --all',
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env production',
      env: {
        NODE_ENV: 'production'
      }
    }
  }
}
```
* 配置git ssh
* 首次部署需要先初始化配置
```
pm2 deploy ecosystem.json production setup
```
* 部署
```
pm2 deploy ecosystem.json production update
```

### nginx配置
##### 配置http
* 创建.conf
&emsp;&emsp;在/etc/nginx/sites-available目录下新建配置
```
cd /etc/nginx/sites-available/
copy default staven.com
```

```
server {
     listen 80;
     server_name staven.com www.zhaofinger.com;
     access_log /var/www/log/staven-access.log;
     error_log  /var/www/log/staven-error.log;

     location / {
             proxy_set_header X-Real-IP $remote_addr;
             proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
             proxy_set_header Host $http_host;
             proxy_set_header X-NginX-Proxy true;
             proxy_pass http://127.0.0.1:1004/;   // 对应项目运行的端口
             proxy_redirect off;
     }
}
```
* 建立软连接到sites-enabled
```
ln -s /etc/ngix/sites-available/staven.com /etc/nginx/sites-enabled/staven.com
```
* 重启服务
```
service nginx restart
```

##### 配置https
* 购买https证书
* 配置.conf
```
server {
     listen 443;
     server_name staven.com www.zhaofinger.com;
     access_log /var/www/log/staven-access.log;
     error_log  /var/www/log/staven-error.log;

     ssl on;
     ssl_certificate   /etc/nginx/cert/xxxxxxxxxxxxx.pem;
     ssl_certificate_key /etc/nginx/cert/xxxxxxxxxxxxxxxx.key;
     ssl_session_timeout 5m;
     ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
     ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
     ssl_prefer_server_ciphers on;

     location / {
             proxy_set_header X-Real-IP $remote_addr;
             proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
             proxy_set_header Host $http_host;
             proxy_set_header X-NginX-Proxy true;
             proxy_pass http://127.0.0.1:1004/;   // 对应项目运行的端口
             proxy_redirect off;
     }
}
```
* 将http端口映射到https服务
```
server {
     listen 80;
     server_name staven.com www.zhaofinger.com;
     rewrite ^/(.*) https://$server_name$1 permanent;
     access_log /var/www/log/staven-access.log;
     error_log  /var/www/log/staven-error.log;

     location / {
             proxy_set_header X-Real-IP $remote_addr;
             proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
             proxy_set_header Host $http_host;
             proxy_set_header X-NginX-Proxy true;
             proxy_pass http://127.0.0.1:1004/;   // 对应项目运行的端口
             proxy_redirect off;
     }
}
```