# PopupMenuBottom 组件及描述

| 属性名      | 类型                    | 说明                                     | 默认值 | 取值 |
| :---------- | :---------------------- | :--------------------------------------- | :----- | :--- |
| child       | Widget                  | child 如果提供则弹出菜单组件将使用此组件 |        |      |
| icon        | Icon                    | 图标                                     |        |      |
| itemBuilder | PopupMenuItemBuilder<T> | 菜单项构造器                             |        |      |
| onSelected  | PopupMenuItemBuilder<T> | 当某项菜单被选中时回调函数               |        |      |

![popupmenubottom](https://raw.githubusercontent.com/staven630/blog/master/Flutter%E8%B5%B7%E8%88%AA/images/popupmenubottom.png)

```
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

enum MemberItem { AddMember, DeleteMember, ModifyMember, SelectMember }
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'PopupMenuButton',
      home: Scaffold(
        appBar: AppBar(
          title: Text('PopupMenuBottom')
        ),
        body: Center(
          child: FlatButton(
            onPressed: () {},
            child: PopupMenuButton<MemberItem>(
              onSelected: (MemberItem result) {},
              itemBuilder: (BuildContext context) =>
                  <PopupMenuEntry<MemberItem>> [
                    const PopupMenuItem(
                      child: Text('添加成员'),
                      value: MemberItem.AddMember
                    ),
                    const PopupMenuItem(
                      child: Text('删除成员'),
                      value: MemberItem.DeleteMember
                    ),
                    const PopupMenuItem(
                      child: Text('修改成员'),
                      value: MemberItem.ModifyMember
                    ),
                    const PopupMenuItem(
                      child: Text('选择成员'),
                      value: MemberItem.SelectMember
                    )
                  ]
            ),
          ),
        )
      )
    );
  }
}
```
