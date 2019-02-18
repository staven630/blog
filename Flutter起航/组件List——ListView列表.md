# 基础列表组件
|  属性名 | 类型 | 说明 | 默认值 | 取值 |
| :--------- | :------ | :------- | :------ | :------- |
| scrollDirection | Axis | 列表的排列方向 | Axis.vertical | Axis.vertical垂直Axis.horizontal水平 |
| padding | EdgeInsetsGeometry | | | |
| reverse | bool | 组件排列方向 | false | |
| children | List<Widget> | 列表元素 | | |
```
import 'package:flutter/material.dart';

void main() => runApp(new MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final title = '基础列表示例';
    return new MaterialApp(
        title: title,
        home: new Scaffold(
            appBar: new AppBar(title: new Text(title)),
            body: new ListView(
              children: <Widget>[
                ListTile(leading: Icon(Icons.alarm), title: Text('Alarm')),
                ListTile(leading: Icon(Icons.phone), title: Text('phone')),
                ListTile(leading: Icon(Icons.airplay), title: Text('airplay')),
                ListTile(leading: Icon(Icons.alarm), title: Text('Alarm')),
                ListTile(leading: Icon(Icons.phone), title: Text('phone')),
                ListTile(leading: Icon(Icons.airplay), title: Text('airplay')),
                ListTile(leading: Icon(Icons.alarm), title: Text('Alarm')),
                ListTile(leading: Icon(Icons.phone), title: Text('phone')),
                ListTile(leading: Icon(Icons.airplay), title: Text('airplay'))
              ],
            )));
  }
}
```
# 水平列表组件
```
import 'package:flutter/material.dart';

void main() => runApp(new MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final title = '水平列表示例';
    return new MaterialApp(
        title: title,
        home: new Scaffold(
            appBar: new AppBar(title: new Text(title)),
            body: new Container(
                margin: EdgeInsets.symmetric(vertical: 20.0),
                height: 200.0,
                child: ListView(
                  scrollDirection: Axis.horizontal,
                  children: <Widget>[
                    Container(width: 160.0, color: Colors.lightBlue),
                    Container(width: 160.0, color: Colors.amber),
                    Container(
                        width: 160.0,
                        color: Colors.green,
                        child: new Column(
                          children: <Widget>[
                            Text('水平',
                                style: TextStyle(
                                    fontWeight: FontWeight.bold,
                                    fontSize: 36.0)),
                            Text('列表',
                                style: TextStyle(
                                    fontWeight: FontWeight.bold,
                                    fontSize: 36.0)),
                            Icon(Icons.list)
                          ],
                        )),
                    Container(width: 160.0, color: Colors.deepPurpleAccent),
                    Container(width: 160.0, color: Colors.pinkAccent)
                  ],
                ))));
  }
}
```

# 长列表组件
```
import 'package:flutter/material.dart';

void main() =>
    runApp(new MyApp(items: new List<String>.generate(500, (i) => "Item $i")));

class MyApp extends StatelessWidget {
  final List<String> items;
  MyApp({Key key, @required this.items}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    final title = '长列表示例';
    return new MaterialApp(
        title: title,
        home: new Scaffold(
            appBar: new AppBar(title: new Text(title)),
            body: new ListView.builder(
                itemCount: items.length,
                itemBuilder: (context, index) {
                  return ListTile(
                      leading: new Icon(Icons.phone),
                      title: new Text('${items[index]}'));
                })));
  }
}
```