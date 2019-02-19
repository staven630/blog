# Drawer组件及描述
| 属性名 | 类型 | 说明 | 默认值 | 取值 |
| :--------- | :------ | :------- | :------ | :------- |
| child | Widget | 可以是任意可显示对象 | | |
| elevation | double |  | 16 | |

# DrawerHeader展示头部信息
| 属性名 | 类型 | 说明 | 默认值 | 取值 |
| :--------- | :------ | :------- | :------ | :------- |
| decoration | Decoration | 设置头部背景颜色或背景图片 | | |
| curve | Curve | 设置变化曲线和duration | | |
| child | Widget | 内容控件 | | |
| padding | EdgeInsetsGeometry | 内容padding | | |
| margin | EdgeInsetsGeometry | 头部外间距 | | |

# UserAccountsDrawerHeader设置用户信息
| 属性名 | 类型 | 说明 | 默认值 | 取值 |
| :--------- | :------ | :------- | :------ | :------- |
| decoration | Decoration | 设置头部背景颜色或背景图片 | | |
| currentAccountsPicture | Widget | 用来设置当前用户头像 | | |
| otherAccountsPicture | List<Widget> | 用来设置当前用户其他账号的头像 | | |
| accountName | Widget | 当前用户的名字 | | |
| accountEmail | Widget | 当前用户的Email | | |
| margin | EdgeInsetsGeometry | Header外间距 | | |

![drawer](https://raw.githubusercontent.com/staven630/blog/master/Flutter%E8%B5%B7%E8%88%AA/images/drawer.png)


```
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Drawer',
      home: Scaffold(
        appBar: AppBar(
          title: Text('Drawer')
        ),
        drawer: Drawer(
          child: ListView(
            children: <Widget>[
              UserAccountsDrawerHeader(
                accountName: Text('staven'),
                accountEmail: Text('20287710@qq.com'),
                currentAccountPicture: CircleAvatar(
                  backgroundImage: AssetImage('assets/images/staven.png'),
                ),
                onDetailsPressed: () {},
                otherAccountsPictures: <Widget>[
                  Container(
                    child: Image.asset('assets/images/flutter.png')
                  )
                ],
              ),
              ListTile(
                leading: CircleAvatar(
                  child: Icon(Icons.color_lens),
                ),
                title: Text('个性装扮')
              ),
              ListTile(
                leading: CircleAvatar(
                  child: Icon(Icons.photo)
                ),
                title: Text('我的相册')
              )
            ],
          ),
        )
      )
    );
  }
}
```