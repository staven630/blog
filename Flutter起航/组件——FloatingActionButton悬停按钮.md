# FloatingActionButton组件及描述
| 属性名 | 类型 | 说明 | 默认值 | 取值 |
| :--------- | :------ | :------- | :------ | :------- |
| child | Widget | | | |
| tooltip | String | 按钮提示文字 | | |
| foregroundColor | Color | 前景色 | | |
| backgroundColor | Color | 背景色 | | |
| elevation | double |  未点击时阴影值 | 6.0 | | 
| hignlightElevation | double | 点击时阴影值 | 12.0 | |
| onPressed | VoidCallback | 点击事件回调 | | |
| shape | ShapeBorder | 按钮shape，定义shape，默认的elevation将会失效 | CircleBorder | |
| mini | | | | |
| isExtended | | | | |

![floatingactionbutton](https://raw.githubusercontent.com/staven630/blog/master/Flutter%E8%B5%B7%E8%88%AA/images/floatingactionbutton.png)


```
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'FloatingActionButton',
      home: Scaffold(
        appBar: AppBar(
          title: Text('FloatingActionButton')
        ),
        body: Center(
          child: Text(
            'FloatingActionButton',
            style: TextStyle(
              fontSize: 28.0
            )
          )
        ),
        floatingActionButton: Builder(
            builder: (BuildContext context) {
              return FloatingActionButton(
                child: Icon(Icons.add),
                tooltip: '点击吧',
                foregroundColor: Colors.white,
                backgroundColor: Colors.lightBlue,
                elevation: 7.0,
                highlightElevation: 14.0,
                onPressed: () {
                  Scaffold.of(context).showSnackBar(
                    new SnackBar(content: Text('点击了！'))
                  );
                },
                mini: false,
                shape: CircleBorder(),
                isExtended: false
              );
            }
        ),
        floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
      )
    );
  }
}
```