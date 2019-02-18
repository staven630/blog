# Icon组件属性及描述
|  属性名 | 类型 | 说明 | 默认值 | 取值 |
| :--------- | :------ | :------- | :------ | :------- |
|color | Color | 图标的颜色，例如Colors.green[500] | null |  |
| icon | IconData |  | |  Icons.phone |
| style | TextStyle | 文本样式，大小、颜色、粗细 | null | |
| size | Double | 图标大小,需要带上小数位 | 24.0 | |
| textDirection | TextDirection | TextDirection.ltr | | |
```
import 'package:flutter/material.dart';

void main() => runApp(new MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
        title: '图标组件示例',
        home: new Scaffold(
            appBar: new AppBar(
              title: new Text('图标组件示例'),
            ),
            body: new Icon(Icons.phone, color: Colors.green[500], size: 80.0)));
  }
}
```