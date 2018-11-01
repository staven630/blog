# Angular声明式组件
&emsp;&emsp;在模板里通过组件声明的selector来加载组件。
```
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat', // 声明组件
  template: `组件`,
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

```

# 入口组件
&emsp;&emsp;命令式加载的组件，没有在末班中引用过它。主要三种类型：引导用的根组件；在路由定义中指定的组件；其他方式声明的动态组件。