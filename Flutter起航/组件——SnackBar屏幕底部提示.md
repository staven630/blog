# SnackBar 组件属性及描述

| 属性名          | 类型              | 说明             | 默认值 | 取值 |
| :-------------- | :---------------- | :--------------- | :----- | :--- |
| action          | SnackBarAction    | 消息中执行的事件 |        |      |
| animation       | Animation<double> | 添加动画效果     |        |      |
| content         | Widget            | 提示消息内容     |        |      |
| duration        | Duration          | 动画执行的时长   | 4.0s   |      |
| backgroundColor | Color             | 消息面板的背景色 |        |      |

&emsp;&emsp;调用方法

```
Scaffold.of(context).showSnackBar();
```

![snackbar](https://raw.githubusercontent.com/staven630/blog/master/Flutter%E8%B5%B7%E8%88%AA/images/snackbar.png)

```
import 'package:flutter/material.dart';

void main() => runApp(new MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Welcome to Flutter',
      home: new Scaffold(
        appBar: AppBar(
          title: Text('SnackBar')
        ),
        body: Center(
          child: Text(
            'SnackBar',
            style: TextStyle(
              fontSize: 28.0
            )
          )
        ),
        floatingActionButton: Builder(
          builder: (BuildContext context) {
            return FloatingActionButton(
              child: Icon(Icons.add),
              onPressed: () {
                Scaffold.of(context).showSnackBar(
                  SnackBar(content: Text('SnackBar提示内容'))
                );
              },
              shape: CircleBorder(),
            );
          },
        ),
        floatingActionButtonLocation: FloatingActionButtonLocation.endFloat )
    );
  }
}
```
