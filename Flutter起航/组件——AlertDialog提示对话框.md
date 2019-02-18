# AlertDialog组件属性及描述
| 属性名 | 类型 | 说明 | 默认值 | 取值 |
| :--------- | :------ | :------- | :------ | :------- |
| actions | List<Widget> | 对话框底部操作按钮 | | |
| title | Widget | 对话框标题 | | |
| titlePadding | EdgeInsetsGeometry | 标题部分间距 | | |
| content | Widget | 对话框的提示内容 | | |
| contentPadding | EdgeInsetsGeometry | 内容部分间距 | | |

![alertdialog](https://raw.githubusercontent.com/staven630/blog/master/Flutter%E8%B5%B7%E8%88%AA/images/alertdialog.png)

```
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'AlertDialog组件示例',
      home: Scaffold(
        appBar: AppBar(
          title: Text('AlertDialog')
        ),
        body: AlertDialog(
          title: Text('AlertDialog'),
          content: SingleChildScrollView(
            child: ListBody(
              children: <Widget>[
                Text('是否删除数据?'),
                Text('此操作不可恢复!')
              ],
            ),
          ),
          actions: <Widget>[
            FlatButton(
              child: Text('确定'),
              onPressed: () {
                print('点击了确定按钮');
              },
            ),
            FlatButton(
              child: Text('取消'),
              onPressed: () {
                print('点击了取消按钮');
              },
            )
          ],
        )
      )
    );
  }
}
```