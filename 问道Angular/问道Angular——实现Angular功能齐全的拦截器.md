utils.ts
```
import { environment } from '@env/environment';
const ACCESS_TOKEN = environment.cookie_name || 'access_token';
const DOMAIN_NAME = environment.domain_name;
const EXPIRE_TIME = environment.expire_time || 30;

export const PrefixDate = (time) => {
  time = Number(time);
  return time < 10 ? '0' + time : time;
};

export const FormatDate = (dateTime, format = 'YYYY-MM-DD HH:mm') => {
  dateTime = isNaN(Number(dateTime)) ? dateTime : Number(dateTime);

  if (typeof dateTime === 'string') {
    dateTime = dateTime.replace(/\-/g, '/');
    dateTime = new Date(dateTime);
  } else if (typeof dateTime === 'number') {
    dateTime = new Date(dateTime);
  } else if (!(dateTime instanceof Date)) {
    dateTime = new Date();
  }

  const week = ['日', '一', '二', '三', '四', '五', '六'];
  return format.replace(/YYYY|YY|MM|DD|HH|hh|mm|SS|ss|week/g, function(key) {
    switch (key) {
      case 'YYYY':
        return dateTime.getFullYear();
      case 'YY':
        return(dateTime.getFullYear() + '').slice(2);
      case 'MM':
        return PrefixDate(dateTime.getMonth() + 1);
      case 'DD':
        return PrefixDate(dateTime.getDate());
      case 'HH':
      case 'hh':
        return PrefixDate(dateTime.getHours());
      case 'mm':
        return PrefixDate(dateTime.getMinutes());
      case 'SS':
      case 'ss':
        return PrefixDate(dateTime.getSeconds());
      case 'week':
        return week[dateTime.getDay()];
    }
  });
};


// 设置cookie, expiredays有效天数
export const setCookie = (value, key = ACCESS_TOKEN, expiredays = EXPIRE_TIME) => {
  value = encodeURIComponent(value);
  const exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  const exdatestr = exdate.toUTCString();
  document.cookie = typeof DOMAIN_NAME !== 'undefined' ?
    `${key}=${value};expires=${exdatestr};path=/;domain=${DOMAIN_NAME}` :
    `${key}=${value};expires=${exdatestr};path=/;`;
};

export const getCookie = (key = ACCESS_TOKEN) => {
  const reg = new RegExp(`(^| )${key}=([^;]*)(;|$)`);
  const arr = document.cookie.match(reg);
  return arr ? decodeURIComponent(arr[2]) : null;
};

// 清除cookie
export const removeCookie = (key = ACCESS_TOKEN) => {
  setCookie('', key, -1);
};

export const getStorage = (key = ACCESS_TOKEN, day = EXPIRE_TIME) => {
  const dateStr = localStorage.getItem(key);
  if (!dateStr) { return null; }
  const obj = JSON.parse(dateStr);
  if (new Date().getTime() - Number(obj.date) > 86400000 * day) {
    return null;
  }
  return obj.value;
};

export const setStorage = (value, key = ACCESS_TOKEN) => {
  const params = {
    date: new Date().getTime(),
    value
  };
  localStorage.setItem(key, JSON.stringify(params));
};

export const removeStorage = (key = ACCESS_TOKEN) => {
  localStorage.removeItem(key);
};

export const clearStorage = () => {
  localStorage.clear();
};

```
alert.service.ts
```
import { Injectable } from '@angular/core';
import {NzModalService} from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private modalRef = [];

  constructor(private modalService: NzModalService) { }

  // 弹窗
  alert(type: string, params: object, content?: string, title?: string): void {
    params = this.getAlertParams(params, content, title);
    this.modalRef.push(this.modalService[type](params));
  }

  closeAlert() {
    if (this.modalRef.length > 0) {
      this.modalRef.pop().close();
    }
  }

  closeAllAlert() {
    this.modalRef = [];
    this.modalService.closeAll();
  }

  // 确认框
  confirm(content, cb) {
    this.modalRef.push(this.modalService.confirm({
      nzContent: content,
      nzTitle: '',
      nzIconType: '',
      nzOnCancel: () => this.closeAlert(),
      nzOnOk: () => {
        this.closeAlert();
        cb();
      }
    }));
  }

  getAlertParams(params: object, content?: string, title?: string): object {
    if (!!params) {
      params['nzOnOk'] = () => this.closeAlert();
      params['nzOkText'] = '确定';
      return params;
    }
    params = {};
    if (content) { params['nzContent'] = content; }
    if (title) {
      params['nzTitle'] = title;
    } else {
      params['nzIconType'] = '';
    }
    params['nzOkText'] = '确定';
    params['nzOnOk'] = () => this.closeAlert();
    return params;
  }
}
```
httpService.ts
```
import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {LoadingService} from '@services/loading.service';
import {environment} from '@env/environment';
import {getCookie, removeCookie} from '@core/utils';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient,
              private loadingService: LoadingService) {
  }

  // 获取配置信息
  getConfig(): Object {
    return environment;
  }

  setLoading(flag: boolean): void {
    this.loadingService.setLoading(flag);
  }

  // get请求
  get(url: string, params: HttpParams | object = null, isLoading: boolean = true): Observable<Object> {
    if (isLoading) {
      this.loadingService.setLoading(true);
    }
    if (!!params) {
      return this.http.get(url, {params: params as HttpParams | { [param: string]: string | string[]; }});
    }
    return this.http.get(url);
  }

  // post请求
  post(url: string, body?: any, params: HttpParams | object = null, isLoading: boolean = true): Observable<Object> {
    if (isLoading) {
      this.loadingService.setLoading(true);
    }
    if (!!params) {
      this.http.post(url, body, {params: params as HttpParams | { [param: string]: string | string[]; }});
    }
    return this.http.post(url, body);
  }

  // delete请求
  delete(url: string, params: HttpParams | object = null, isLoading: boolean = true): Observable<Object> {
    if (isLoading) {
      this.loadingService.setLoading(true);
    }
    if (!!params) {
      return this.http.delete(url, {params: params as HttpParams | { [param: string]: string | string[]; }});
    }
    return this.http.delete(url);
  }

  // patch请求
  patch(url: string, body?: any, params: HttpParams | object = null, isLoading: boolean = true): Observable<Object> {
    if (isLoading) {
      this.loadingService.setLoading(true);
    }
    if (!!params) {
      this.http.patch(url, body, {params: params as HttpParams | { [param: string]: string | string[]; }});
    }
    return this.http.patch(url, body);
  }

  // 退出登录
  logout() {
    removeCookie();
    window.location.href = environment.locationUrl;
  }

  // 判断是否已经登录
  isLoggedIn() {
    return !!getCookie();
  }

}
```
message.service.ts
```
import { Injectable } from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messageId = null;

  constructor(private messageService: NzMessageService) { }

  message(type: string, content: string) {
    this.messageId = this.messageService[type](content);
  }
}
```
londing.service.ts
```
import { Injectable } from '@angular/core';
import {Observable, Subject, timer} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loadingSubject = new Subject<boolean>();
  isLoading: Observable<boolean> = this.loadingSubject.asObservable();

  constructor() { }

  setLoading(flag: boolean) {
    setTimeout(() => {
      this.loadingSubject.next(flag);
    });
  }
}
```
token.interceptor.ts
```
import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs/index';
import {HttpService} from '@services/http.service';
import {getCookie} from '@core/utils';
import {LoadingService} from '@services/loading.service';
import {catchError, delay, retryWhen, scan, tap, timeout} from 'rxjs/internal/operators';
import {MessageService} from '@services/message.service';
import {Router} from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private environment: object;
  private readonly DEFAULT_TIME_OUT = 1000;
  private readonly REPLY_TIME = 3;

  constructor(private httpService: HttpService,
              private loadingService: LoadingService,
              private router: Router,
              private messageService: MessageService) {
    this.environment = this.httpService.getConfig();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(
      this.cloneHeader(req)
    ).pipe(
      timeout(this.DEFAULT_TIME_OUT),
      retryWhen(error => {
        return error.pipe(
          scan((count, err) => {
            if (count < this.REPLY_TIME) {
              return count += 1;
            }
            throw err;
          }, 0),
          delay(500),
          tap(count => {
            if (+count === 1) {
              console.log('连接超时,正在重新请求……');
            }
          })
        );
      }),
      catchError(error => this.handleError(error))
    );
  }

  private prepareUrl(url: string): string {
    url = /^https?:\/\//i.test(url) ? url : this.environment['apiUrl'] + '/' + url;
    return url.replace(/([^:]\/)\/+/g, '$1');
  }

  cloneHeader(req: HttpRequest<any>): HttpRequest<any> {
    const token: string = getCookie();
    const url: string = this.prepareUrl(req.url);
    if (token && token.length > 0) {
      return req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token),
        url
      });
    }
    return req.clone({
      url
    });
  }

  private handleError(error: Error | HttpErrorResponse) {
    this.loadingService.setLoading(false);
    if (error instanceof HttpErrorResponse) {
      if (!navigator.onLine) {
        this.messageService.message('error', '网络断开');
      } else {
        switch (error.error.status_code) {
          case 401:
            // token过期，删除本地cookie，跳回登录页面
            this.httpService.logout();
            break;
          case 404:
            this.router.navigate(['404']);
            break;
          case 405:
          case 417:
          case 422:
            // 后台返回错误信息，直接弹窗提示
            this.messageService.message('error', error.error.message);
            break;
          case 500:
            this.router.navigate(['500']);
            break;
        }
      }
    } else {
      this.messageService.message('error', '客户端错误');
    }
    return throwError(error);
  }
}
```
loading调用
```
isLoading$: Observable<boolean>;

  constructor(private httpService: HttpService,
              private loadingService: LoadingService) {
    this.isLoading$ = this.loadingService.isLoading;
  }
```
loading的html
```
<div class="my-wrapper">
  <div class="loading-wrapper">
    <ng-template #indicatorTemplate><div class="loading-box"></div></ng-template>
    <nz-spin [nzIndicator]="indicatorTemplate" [nzSpinning]="isLoading$ | async" [nzDelay]="500"></nz-spin>
  </div>
  <router-outlet></router-outlet>
</div>
```
loading的css
```
.my-wrapper {
  height: 100%;
  overflow-y: auto;
  position: relative;
}

.loading-wrapper {
  height: 0;
}

.loading-box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:rgba(255,255,255,.5) url("../assets/images/loading.gif") center center no-repeat ;
  background-size: 160px;
  z-index: 99999;
}
```
app.module.ts
```
providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
```