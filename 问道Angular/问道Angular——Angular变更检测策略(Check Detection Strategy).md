# 默认变更检测策略
&emsp;&emsp;angular默认使用ChangeDetectionStrategy.Default变更检测策略。
&emsp;&emsp;在默认策略中，一当任何数据发生了变化或更改（如：Event事件、计时器、XHR、Promise等），Angular都会运行变更检测来更新DOM。
* child.component.ts
```
import { Component } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    {{ isChanged }}
  `
})
export class ChildComponent {
  get isChanged() {
    console.log('变更了');
    return true;
  }
}
```
* parent.component.ts
```
import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  template: `
    <app-child></app-child>
    <button (click)="onClick()">Click!</button>
  `
})
export class ParentComponent {
  onClick() {}
}
```
![default](https://cdn.nlark.com/yuque/0/2019/png/197393/1551837869751-c2a615ab-a1e2-4f56-b361-8a5623cf7791.png)
&emsp;&emsp;单击按钮，Angular进行变更检测，在控制台可以看见输出了两次"变更了"。

# OnPush变更检测策略
    changeDetection: ChangeDetectionStrategy.OnPush
&emsp;&emsp;在组件@Component中添加以上字段。Angular将采用OnPush变更检测策略。组件只依赖于@Input()传递新引用时才进行变更检测。

### 以下情况将触发变更检测:
#####  Input()数据源发生变化
&emsp;&emsp;OnPush变更检测策略要求我们使用不可变对象或可观察对象。这样Angular可以执行简单的参考检测，以便确定是否应该更新视图。
* child.component.ts
```
import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <h1>{{person.name}}</h1>
    {{ isChanged }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent {

  @Input() person: object;

  get isChanged() {
    console.log('变更了');
    return true;
  }
}
```
* parent.component.ts
```
import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-parent',
  template: `
    <app-child [person]="person"></app-child>
    <button (click)="onClick()">Click!</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParentComponent {
  person: object = {
    name: 'staven'
  };

  onClick() {
    this.person.name = '赫连小妖';
  }
}
```
&emsp;&emsp;单击按钮，控制台并没有打印信息，页面也没有更新。
```
onClick() {
   this.person = {
     name = '赫连小妖'
   };
}
```
&emsp;&emsp;将点击事件改成以上代码，单击按钮，控制台打印一次"更新了"，页面更新。

#####  变更事件源来自组件内部或其子组件
* 当组件或其中的子组件触发事件时，导致组件内部状态更新，变更检测将运行。

child.component.ts
```
import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <h1>{{name}}</h1>
    <p>{{isChanged}}</p>
    <button (click)="onClick()">Click!</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent {

  name: string = 'staven';

  get isChanged() {
    console.log('变更了');
    return true;
  }

  onClick() {
    this.name = '赫连小妖';
  }

}
```
&emsp;&emsp;单击按钮，控制台打印一次"更新了"，页面更新。

* 此规则仅适用于DOM事件，其他计时器、XHR、promise等操作并不起作用。
```
import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <h1>{{name}}</h1>
    <p>{{isChanged}}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent implements OnInit{
  name: string = 'staven';
  ngOnInit(): void {
    setTimeout(() => {
      console.log('开始运行!');
      this.name = '赫连小妖';
    }, 2000);
  }
  get isChanged() {
    console.log('变更了');
    return true;
  }
}
```
&emsp;&emsp;2s后，控制台打印"开始运行"，并没有打印"变更了"，页面也没有更新。

##### 主动运行变更检测

1. 调用detectChanges()告知Angular对组件及其子组件进行变更检测
```
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <h1>{{name}}</h1>
    <p>{{isChanged}}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent implements OnInit{

  name: string = 'staven';

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    setTimeout(() => {
      console.log('开始运行!');
      this.name = '赫连小妖';
      this.cdr.detectChanges();
    }, 2000);
  }

  get isChanged() {
    console.log('变更了');
    return true;
  }
}
```
&emsp;&emsp;2s后，控制台先后打印"开始运行"、"变更了"，页面更新。
2. ApplicationRef.tick()告知整个应用进行变更检测
3. markForCheck()将所有onPush祖先标记为要检查一次，作为当前或下一个变更检测周期的一部分

# Async异步管道
&emsp;&emsp;Async管道订阅observable和promise，返回最新值。
* child.component.ts
```
import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <ul>
       <li *ngFor="let time of data | async">{{time}}</li>
    </ul>
    <h1>{{isChanged}}</h1>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent {

  @Input() data;

  get isChanged() {
    console.log('变更了');
    return true;
  }
}

```
* parent.component.ts
```
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-parent',
  template: `
    <app-child [data]="times$"></app-child>
    <button (click)="onPush()">Add Now</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParentComponent {
  times = [];
  times$ = new BehaviorSubject(this.times);

  onPush() {
    this.times.push(Date.now());
    this.times$.next(this.times);
  }
}
```