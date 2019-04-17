* socket.service.ts
```
import {Injectable, OnDestroy} from '@angular/core';
import {distinctUntilChanged, filter, map, share, takeWhile} from 'rxjs/operators';
import {WebSocketSubject, WebSocketSubjectConfig} from 'rxjs/webSocket';
import { Observable, SubscriptionLike, Subject, Observer, interval } from 'rxjs';

export interface WSService {
  status: Observable<boolean>;
  on<T>(event: string): Observable<T>;
  send(event: string, data: any): void;
}

export interface WSConfig {
  url: string;
  reconnectInterval?: number;
  reconnectAttempts?: number;
}

export interface WSMsg<T> {
  event: string;
  data: T;
}


@Injectable({
  providedIn: 'root'
})
export class SocketService implements WSService, OnDestroy {

  private wsConfig: WebSocketSubjectConfig<WSMsg<any>>;

  private wsSub: SubscriptionLike;
  private statusSub: SubscriptionLike;

  private ws$: WebSocketSubject<WSMsg<any>>;
  private reconnection$: Observable<number>;
  private connection$: Observer<boolean>;
  private msg$: Subject<WSMsg<any>>;

  private reconnectInterval: number;
  private reconnectAttempts: number;
  private isConnected: boolean;

  public status: Observable<boolean>;

  constructor() {
    this.msg$ = new Subject<WSMsg<any>>();
    this.status = new Observable<boolean>((observer) => {
      this.connection$ = observer;
    }).pipe(share(), distinctUntilChanged());
  }

  init(config: WSConfig) {
    this.destory();
    this.reconnectInterval = config.reconnectInterval || 15000;  // 暂停时间
    this.reconnectAttempts = config.reconnectAttempts || 10;  // 重连次数
    this.wsConfig = {
      url: config.url,
      closeObserver: {
        next: (event: CloseEvent) => {
          this.ws$ = null;
          this.connection$.next(false);
        }
      },
      openObserver: {
        next: (event: Event) => {
          this.connection$.next(true);
        }
      }
    };

    this.statusSub = this.status
      .subscribe((isConnected) => {
        console.log(isConnected);
        this.isConnected = isConnected;
        if (!this.reconnection$ && typeof(isConnected) === 'boolean' && !isConnected) {
          this.reconnect();
        }
      });

    this.wsSub = this.msg$.subscribe(
      null, (error: ErrorEvent) => console.error('Websocket error!', error)
    );

    this.connect();

  }

  private connect(): void {
    this.ws$ = new WebSocketSubject(this.wsConfig);

    this.ws$.subscribe(
      (message) => {
        this.msg$.next(message);
      },
      (error: Event) => {
        if (!this.ws$) {
          this.reconnect();
        }
      }
    );
  }

  private reconnect(): void {
    this.reconnection$ = interval(this.reconnectInterval)
      .pipe(takeWhile((v, index) => index < this.reconnectAttempts && !this.ws$));
    this.reconnection$.subscribe(
      () => this.connect(),
      null,
      () => {
        this.reconnection$ = null;

        if (this.ws$) {
          this.msg$.complete();
          this.connection$.complete();
        }
      }
    );
  }

  private destory() {
    this.wsSub && this.wsSub.unsubscribe();
    this.statusSub && this.statusSub.unsubscribe();
  }

  ngOnDestroy(): void {
    this.destory();
  }

  public on<T>(event: string): Observable<T> {
    if (event) {
      return this.msg$.pipe(
        filter((message: WSMsg<T>) => message.event === event),
        map((message: WSMsg<T>) => message.data)
      );
    }
  }

  send(event: string, data: any): void {
    if (event && this.isConnected) {
      this.ws$.next(<any>JSON.stringify({event: event, data: data}));
    }
  }
}
```

* constants.ts
```
export enum WS_ON {
  PUBLISH = 'Publish',
  SWITCH_VERSION = 'SwitchVersion'
}

export enum WS_SEND {
  PONG = 'Pong',
  OPEN = 'Open'
}
```

* app.component.ts
```
import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Observable} from 'rxjs/index';
import {SocketService} from '@services/socket.service';
import {HttpService} from '@services/http.service';
import {Router} from '@angular/router';
import {WS_ON, WS_SEND} from '@core/constants';
import {environment} from '@env/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, OnDestroy {
  public socket;  // websocket
  private heart_timer = null;  // websocket定时发送心跳
  private uid: string = null;  // websocket from id
  private pub$;

  constructor(
    private socketService: SocketService,
    private httpService: HttpService,
    private router: Route
  ) {
  }

  ngOnInit(): void {
    // 获取socket uid
    this.httpService.get('/user/users/get-swoole-uid')
      .subscribe((data: any) => {
        this.httpService.setLoading(false);
        this.uid = data.data.uid;
        this.init(this.uid);
      });

    // 监听重新联网事件
    window.ononline = () => {
      if (this.uid) {
        this.init(this.uid);
      }
    };

    // 监听断网事件
    window.onoffline = () => {
      this.destory();
    };
  }

  init(uid) {
    // 判断浏览器是否支持websocket
    if (typeof WebSocket !== 'function') {
      return false;
    }

    this.destory();

    // 初始化websocket链接
    this.socket = this.socketService.init({
      url: `${environment.wss}/?from=${uid}&behavior=${WS_SEND.OPEN}`
    });

    this.pub$ = this.socketService.on(WS_ON.PUBLISH)
      .subscribe((res: any) => this.handlePublish(res));

    if (this.heart_timer) {
      this.heart_timer.unsubscribe();
    }

    // 定时发送心跳
    this.heart_timer = interval(15000)
      .subscribe(_ => {
         this.socketService.send(WS_SEND.PONG, uid);
      });
  }

  handlePublish(data) {
    
  }

  ngOnDestroy(): void {
    this.destory();
  }

  // 取消定时任务，关闭websocket链接
  destory() {
    if (this.pub$) {
      this.pub$.unsubscribe();
    }
    if (this.heart_timer) {
      this.heart_timer.unsubscribe();
    }
    if (this.socket) {
      this.socket.unsubscribe();
    }
  }

}
```