# 概述
&emsp;&emsp;有时需要在加载应用之前运行代码，有时希望暂停应用初始化，直到完成某些限制之后再执行。APP_INITIALIZER令牌可以完成这项操作。

&emsp;&emsp;APP_INITIALIZER是一个函数，在应用改程序初始化时被调用。可以在AppModule类的providers中以factory的形式来配置。适合加载简单的数据或简单的校验。

&emsp;&emsp;factory是一个返回值为promise的函数。

# 示例
&emsp;&emsp;在应用启动阶段利用jwt校验登录信息是否有效
load.service.ts
```
import {Injectable, Injector} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoadService {

  constructor(private jwtHelper: JwtHelperService,
              private injector: Injector) {
  }

  load(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      return this.checkUser()
        .subscribe(res => {
          if (res) {
            setInterval(() => {
              this.checkStatus();
            }, 1000 * 300);
          } else {
            this.goLogin();
          }
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  }

  isTokenExpired(token: string = 'access_token') {
    const jwtStr = localStorage.getItem(token);
    return jwtStr ? this.jwtHelper.isTokenExpired(jwtStr) : true;
  }

  checkUser(token: string = 'access_token'): Observable<boolean> {
    if (!this.isTokenExpired()) {
      return of(true);
    } else {
      localStorage.removeItem(token);
      return of(false);
    }
  }

  checkStatus() {
    if (this.isTokenExpired()) {
      this.goLogin();
    }
  }

  goLogin() {
    const router = this.injector.get(Router);
    router.navigate(['/user/login']);
  }

}
```
app.module.ts
```
export function loadFactory(loadService: LoadService): Function {
  return () => loadService.load();
}

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: loadFactory,
      deps: [LoadService, Injector],
      multi: true
    }
  ]
})
```