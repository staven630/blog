# RaisedButton按钮组件
| 属性名 | 类型 | 说明 | 默认值 | 取值 |
| :--------- | :------ | :------- | :------ | :------- |
| color | Color | 组件的颜色 | | |
| diabledColor | Color | 禁用状态的颜色 | ThemeData.disabledColor | | |
| onPressed | voidCallback | | | |
| tooltip | String | | | |
```
import 'package:flutter/material.dart';

void main() => runApp(new MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
        title: 'RaisedButton组件示例',
        home: new Scaffold(
            appBar: new AppBar(title: new Text('RaisedButton')),
            body: new Center(
                child: new RaisedButton(
                    onPressed: () {
                      print('按下');
                    },
                    child: new Text('RaisedButton组件')))));
  }
}
```