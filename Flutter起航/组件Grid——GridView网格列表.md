# GridView网格列表组件
&emsp;&emsp;使用GridView创建网格列表有多种方式：
* GridView.count通过单行展示个数创建GridView
* GridView.extent通过最大宽度创建GridView

|  属性名 | 类型 | 说明 | 默认值 | 取值 |
| :--------- | :------ | :------- | :------ | :------- |
| scrollDirection | Axis | 滚动的方向 | Axis.vertical | |
| reverse | bool | 滚动是否反向 | false | |
| controller | ScrollController | 控制child滚动时候的位置 | | |
| primary | bool | 是否是与父节点的PrimaryScrollController所关联的主滚动视图 | | |
| physics | ScrollPhysics | 滚动的视图如何响应用户的输入 | | |
| shrinkWrap | bool | 滚动方向的滚动视图内容是否应该由正在查看的内容所决定 | false | |
| padding | EdgeInsetsGeometry | | | |
| gridDelegate | SliverGridDelegate | 控制GridView中子节点布局的Widget | | |
| cacheExtent | double | 缓存区域 | | | 
```
import 'package:flutter/material.dart';

void main() => runApp(new MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final title = '网格列表组件';
    return new MaterialApp(
        title: title,
        home: new Scaffold(
            appBar: new AppBar(title: new Text(title)),
            body: new GridView.count(
              primary: false,
              padding: const EdgeInsets.all(20.0),
              crossAxisSpacing: 30.0,
              crossAxisCount: 3,
              children: <Widget>[
                const Text('第一行第一列'),
                const Text('第一行第二列'),
                const Text('第一行第三列'),
                const Text('第二行第一列'),
                const Text('第二行第二列'),
                const Text('第二行第三列'),
                const Text('第三行第一列'),
                const Text('第三行第二列'),
                const Text('第三行第三列'),
                const Text('第四行第一列'),
                const Text('第四行第二列'),
                const Text('第四行第三列'),
              ],
            )));
  }
}
```
