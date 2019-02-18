# SimpleDialog组件及描述
| 属性名 | 类型 | 说明 | 默认值 | 取值 |
| :--------- | :------ | :------- | :------ | :------- |
| children | List<Widget> | 对话框子项 | | |
| title | Widget | 对话框标题 | | |
| titlePadding | EdgeInsetsGeometry | 标题padding | | |
| contentPadding | EdgeInsetsGeometry | 内容padding | | |

![simpledialog](https://raw.githubusercontent.com/staven630/blog/master/Flutter%E8%B5%B7%E8%88%AA/images/simpledialog.png)

```
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'SimpleDialog',
      home: Scaffold(
        appBar: AppBar(
          title: Text('SimpleDialog')
        ),
        body: SimpleDialog(
          title: Text('SimpleDialog'),
          children: <Widget>[
            SimpleDialogOption(
              child: Text('flutter组件'),
              onPressed: () {
                print('flutter组件');
              }
            ),
            SimpleDialogOption(
              child: Text('SimpleDialog组件'),
              onPressed: () {
                print('SimpleDialog组件');
              },
            )
          ],
        )
      )
    );
  }
}
```