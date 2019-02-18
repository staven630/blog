# MaterialApp组件属性及描述
|  属性名 | 类型 | 说明 | 默认值 | 取值 |
| :--------- | :------ | :------- | :------ | :------- |
| title | String |  任务管理窗口中所显示的应用名 | | |
| theme | ThemeData | 应用的主题颜色 | | |
| color | Color | 应用的主要颜色值(primary color) | | |
| home | Widget | 应用打开时所显示的界面 | | |
| routes | Map<String, WidgetBuilder> | 应用页面跳转规则 | | |
| initialRoute | String | 初始化路由,默认值为Window.defaultRouteName| | |
| onGenerateRoute | RouteFactory | 路由回调函数。当通过Navigator.of(context).pushNamed跳转路由时，在routes查找不到时，会触发这个回调 | | |
| onLocaleChanged | | 当系统修改语言的时候，会触发这个回调 | | |
| navigatorObservers | List<NavigatorObserver> | 应用Navigator的监听器 | | |
| debugShowMaterialGrid | bool | 是否显示基础布局网格，用来调试UI的工具 | | |
| showPerformanceOverlay | bool | 显示性能标签 | | |
# home设置应用主页
```
import 'package:flutter/material.dart';

void main() => runApp(new MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(title: 'MaterialApp组件示例', home: new MyHomePage());
  }
}

class MyHomePage extends StatefulWidget {
  @override
  _MyHomePageState createState() => new _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: new Text('MaterialApp')),
        body: Center(child: Text('主页')));
  }
}
```
# 路由处理
&emsp;&emsp;routes对象是一个Map<String, WidgetBuilder>。当使用Navigator.pushNamed来路由的时候，会在routes查找路由名字，然后使用对应的WidgetBuilder来构造一个带有页面切换动画的MaterialPageRoute。如果应用只有一个界面，则不用设置这个属性，使用home设置这个界面即可。
&emsp;&emsp;通过routes可以给MaterialApp组件初始化一个路由列表，跳转到指定页面。
```
import 'package:flutter/material.dart';
void main() => runApp(new MyApp());
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: '主页',
        home: new MyHomePage(),
        routes: {
          '/first': (BuildContext context) => FirstPage(),
          '/second': (BuildContext context) => SecondPage()
        },
        initialRoute: '/first',
        theme: ThemeData(primarySwatch: Colors.amber));
  }
}
class MyHomePage extends StatefulWidget {
  @override
  _MyHomePageState createState() => new _MyHomePageState();
}
class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: Text('主页')),
        body: Center(child: Text('主页', style: TextStyle(fontSize: 28.0))));
  }
}
class FirstPage extends StatelessWidget {
  final title = '第一个页面';
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: Text(title)),
        body: Center(
            child: RaisedButton(
                onPressed: () {
                  Navigator.pushNamed(context, '/second');
                },
                child: Text(title, style: TextStyle(fontSize: 28.0)))));
  }
}
class SecondPage extends StatelessWidget {
  final title = '第二个页面';
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: Text(title)),
        body: Center(
            child: RaisedButton(
                onPressed: () {
                  Navigator.pushNamed(context, '/first');
                },
                child: Text(title, style: TextStyle(fontSize: 28.0)))));
  }
}
```