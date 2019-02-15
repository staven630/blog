&emsp;&emsp;Scaffold实现了基本的Material Design布局结构

# Scaffold组件属性与描述
| 属性名 | 类型 | 说明 | 默认值 | 取值 |
| :--------- | :------ | :------- | :------ | :------- |
| appBar | AppBar | 显示在界面顶部的一个AppBar | | |
| body | Widget | 当前界面所显示的主要内容 | | |
| floatingActionButton | Widget | 在Material Design中定义的一个功能按钮 | | |
| persistentFooterButtons | List<Widget> | 固定在下方显示的按钮，比如对话框下方的确定、取消 | | |
| drawer | Widget | 侧边栏组件 | | |
| backgroundColor |  Color | 内容的背景颜色 | ThemeData.scaffoldBackgoundColor | |
| bottomNavigationBar | Widget | 显示在底部的导航栏按钮 | | |
| resizeToAvoidButtonPadding | bool | 控制界面内容body是否重新布局来避免底部被覆盖了，比如当键盘显示的时候 | true | |

```
import 'package:flutter/material.dart';

void main() => runApp(new MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'Scaffold脚手架组件示例',
        home: Scaffold(
            appBar: AppBar(title: Text('Scaffold')),
            body: Center(child: Text('Scaffold')),
            bottomNavigationBar: BottomAppBar(child: Container(height: 50.0)),
            floatingActionButton: FloatingActionButton(
                onPressed: () {}, tooltip: '增加', child: Icon(Icons.add)),
            floatingActionButtonLocation:
                FloatingActionButtonLocation.centerDocked));
  }
}
```