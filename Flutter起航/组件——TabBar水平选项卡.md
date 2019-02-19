# TabBar组件属性及描述
| 属性名 | 类型 | 说明 | 默认值 | 取值 |
| :--------- | :------ | :------- | :------ | :------- |
| isScrollable | bool | 是否可以水平移动 | | |
| tabs | List<Widget> | Tab选项列表 | | |

# Tab组件属性及描述
| 属性名 | 类型 | 说明 | 默认值 | 取值 |
| :--------- | :------ | :------- | :------ | :------- |
| icon | Widget | Tab图标 | | |
| text | String | Tab文本 | | |

# TabView组件属性及描述
| 属性名 | 类型 | 说明 | 默认值 | 取值 |
| :--------- | :------ | :------- | :------ | :------- |
| controller | TabController | 指定视图的控制器 | | |
| children | List<Widget> | | | |

![tabbar](https://raw.githubusercontent.com/staven630/blog/master/Flutter%E8%B5%B7%E8%88%AA/images/tabbar.png)


```
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class ItemView {
  final String title;
  final IconData icon;
  const ItemView({this.title, this.icon});
}

const List<ItemView> items = const <ItemView> [
  const ItemView(title: '自驾', icon: Icons.directions_car),
  const ItemView(title: '自行车', icon: Icons.directions_bike),
  const ItemView(title: '轮船', icon: Icons.directions_boat),
  const ItemView(title: '公交车', icon: Icons.directions_railway),
  const ItemView(title: '火车', icon: Icons.directions_railway),
  const ItemView(title: '步行', icon: Icons.directions_walk)
];

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: DefaultTabController(
          length: items.length,
          child: Scaffold(
            appBar: AppBar(
              title: Text('TabBar'),
              bottom: TabBar(
                  isScrollable: true,
                  tabs: items.map((ItemView item) {
                    return Center(
                      child: Tab(
                        text: item.title,
                        icon: Icon(item.icon)
                      )
                    );
                  }).toList()
              )
            ),
            body: TabBarView(
                children: items.map((ItemView item) {
                  return Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: SelectedView(item: item)
                  );
                }).toList()
            )
          )
      )
    );
  }
}

class SelectedView extends StatelessWidget {
  final ItemView item;
  const SelectedView({Key key, this.item}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    final TextStyle textStyle = Theme.of(context).textTheme.display1;
    return Card(
      color: Colors.white,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: <Widget>[
          Icon(item.icon, size: 128.0, color: textStyle.color),
          Text(item.title, style: textStyle)
        ],
      ),
    );
  }
}
```
