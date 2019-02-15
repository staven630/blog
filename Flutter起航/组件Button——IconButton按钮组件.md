# IconButton图标按钮组件
|  属性名 | 类型 | 说明 | 默认值 | 取值 |
| :--------- | :------ | :------- | :------ | :------- |
| alignment | AlignmentGeometry | 定义IconButton的Icon对齐方式，默认居中 | Alignment.center | |
| icon | Widget | 图标 | | |
| color | Color | 图标组件的颜色 | | |
| disabledColor | Color | 禁用状态的颜色 | ThemeData.disabledColor | |
| iconSize | double | 图标大小 | 24.0 | |
| onPressed | VoidCallback | 按下触发的事件 | | |
| tooltip | String | 按钮按下组件提示语 | | | 
```
import 'package:flutter/material.dart';

void main() => runApp(new MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
        title: '图标按钮组件',
        home: new Scaffold(
            appBar: new AppBar(title: new Text('IconButton组件示例')),
            body: new Center(
                child: new IconButton(
                    icon: Icon(Icons.volume_up, size: 48.0),
                    tooltip: '按下操作',
                    onPressed: () {
                      print('按了！');
                    }))));
  }
}
```
