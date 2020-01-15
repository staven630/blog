
# 安装依赖
```bash
npm i -S font-awesome
```

# 编辑angular.json文件
&emsp;&emsp;参数说明：
1. input: 下载资源指定的资源
2. bundleName: 文件显示在dist目录下的文件名
3. inject: 
```json
"styles": [
  "src/styles.scss",
  {
    "input": "./node_modules/font-awesome/css/font-awesome.css",
    "bundleName": "font-awesome",
    "inject": true
  },
  {
    "input": "src/assets/scss/themes/dark.css",
    "bundleName": "dark",
    "inject": false
  },
  {
    "input": "src/assets/scss/themes/light.css",
    "bundleName": "light",
    "inject": false
  }
],
```

# service
```typescript
import {Inject, Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class LoadThemeService {
  private renderer: Renderer2;

  constructor(
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  loadStyle(name: string) {
    return new Promise(resolve => {
      let theme = this.document.getElementById('dynamic-style');
      if (theme) {
        theme.setAttribute('href', `${name}.css`);
        return resolve(theme);
      } else {
        theme = this.createStyle(name);
        theme.onload = () => {
          resolve(theme);
        };
        this.renderer.appendChild(this.document.getElementsByTagName('head')[0], theme);
      }
    });
  }

  loadScript(name: string, type = 'text/javascript') {
    return new Promise(resolve => {
      let theme = this.document.getElementById('dynamic-script');
      if (theme) {
        theme.setAttribute('src', `${name}.js`);
        return resolve(theme);
      } else {
        theme = this.createScript(name);
        theme.onload = () => {
          resolve(theme);
        };
        this.renderer.appendChild(this.document.getElementsByTagName('head')[0], theme);
      }
    });
  }

  private createStyle(name: string): HTMLLinkElement {
    const link = this.renderer.createElement('link') as HTMLLinkElement;
    link.rel = 'stylesheet';
    link.id = 'dynamic-style';
    link.type = 'text/css';
    link.href =  `${name}.css`;
    return link;
  }

  private createScript(name: string): HTMLScriptElement {
    const script = this.renderer.createElement('script') as HTMLScriptElement;
    script.id = 'dynamic-script';
    script.type = 'text/javascript';
    script.src =  `${name}.js`;
    return script;
  }
}
```
# 使用
```js
import {Component, OnInit} from '@angular/core';
import {LoadThemeService} from './services/load-theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private loadThemeService: LoadThemeService
  ) {}

  selectTheme(name) {
    this.loadThemeService.loadStyle(name);
  }
}
```