# 使用[hmr-cli](https://github.com/staven630/hmr-cli)
```
npm i -g hmr-cli
```
&emsp;&emsp;初始化angular项目,命令行进入该目录
```
hmr init
```
&emsp;&emsp;npm run hmr启动项目将附带hmr功能。

***

# Angular6添加HMR
### environments目录
environments.ts和environment.prod.ts增加hmr: false
```
export const environment = {
  hmr: false
};
```
复制environment新增environment.hmr.ts修改hmr:true
```
export const environment = {
  hmr: true
};
```
### .angular.json文件
build的configurations中添加
```
"hmr": {
  "fileReplacements": [
    {
      "replace": "src/environments/environment.ts",
      "with": "src/environments/environment.hmr.ts"
    }
  ]
}
```
serve的configurations中添加
```
"hmr": {
  "hmr": true,
  "browserTarget": "my-app:build:hmr"
}
```
### tsconfig.app.json的compilerOptions的types中添加
```
"types": ["node"]
```
### package.json的scripts中添加
```
"hmr": "ng serve --configuration hmr --open"
```
### 安装依赖
```
npm install --save-dev @angularclass/hmr
```
### src目录下创建hmr.ts
```
import { NgModuleRef, ApplicationRef } from '@angular/core';
import { createNewHosts } from '@angularclass/hmr';

export const hmrBootstrap = (module: any, bootstrap: () => Promise<NgModuleRef<any>>) => {
  let ngModule: NgModuleRef<any>;
  module.hot.accept();
  bootstrap().then(mod => ngModule = mod);
  module.hot.dispose(() => {
    const appRef: ApplicationRef = ngModule.injector.get(ApplicationRef);
    const elements = appRef.components.map(c => c.location.nativeElement);
    const makeVisible = createNewHosts(elements);
    ngModule.destroy();
    makeVisible();
  });
};
```
### 修改main.ts
```
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { hmrBootstrap } from './hmr';

if (environment.production) {
  enableProdMode();
}

const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);

if (environment.hmr) {
  if (module[ 'hot' ]) {
    hmrBootstrap(module, bootstrap);
  } else {
    console.error('HMR is not enabled for webpack-dev-server!');
    console.log('Are you using the --hmr flag for ng serve?');
  }
} else {
  bootstrap().catch(err => console.log(err));
}
```

# Angular5添加HMR
### environments目录
environments.ts和environment.prod.ts增加hmr: false
```
export const environment = {
  hmr: false
};
```
复制environment新增environment.hmr.ts修改hmr:true
```
export const environment = {
  hmr: true
};
```
### .angular-cli.json的environments中添加
```
"hmr": "environments/environment.hmr.ts"
```
### 在package.json的scripts中增加
```
"hmr": "ng serve --hmr -e=hmr --open"
```
### 安装依赖
```
npm install --save-dev @angularclass/hmr
```
### src目录下创建hmr.ts
```
import { NgModuleRef, ApplicationRef } from '@angular/core';
import { createNewHosts } from '@angularclass/hmr';

export const hmrBootstrap = (module: any, bootstrap: () => Promise<NgModuleRef<any>>) => {
  let ngModule: NgModuleRef<any>;
  module.hot.accept();
  bootstrap().then(mod => ngModule = mod);
  module.hot.dispose(() => {
    const appRef: ApplicationRef = ngModule.injector.get(ApplicationRef);
    const elements = appRef.components.map(c => c.location.nativeElement);
    const makeVisible = createNewHosts(elements);
    ngModule.destroy();
    makeVisible();
  });
};
```
### 修改main.ts
```
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { hmrBootstrap } from './hmr';

if (environment.production) {
  enableProdMode();
}

const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);

if (environment.hmr) {
  if (module[ 'hot' ]) {
    hmrBootstrap(module, bootstrap);
  } else {
    console.error('HMR is not enabled for webpack-dev-server!');
    console.log('Are you using the --hmr flag for ng serve?');
  }
} else {
  bootstrap().catch(err => console.log(err));
}
```
