# TextField 组件属性及描述

| 属性名          | 类型                     | 说明           | 默认值 | 取值 |
| :-------------- | :----------------------- | :------------- | :----- | :--- |
| maxLength       | int                      | 最大长度       |        |      |
| maxLines        | int                      | 最大行数       |        |      |
| autocorrect     | bool                     | 是否自动更正   |        |      |
| autofous        | bool                     | 是否自动对焦   |        |      |
| obscureText     | bool                     | 是否是密码     |        |      |
| textAlign       | TextAlign                | 文本对齐方式   |        |      |
| style           | TextStyle                | 输入文本的样式 |        |      |
| inputFormatters | List<TextInputFormatter> | 允许的输入格式 |        |      |
| onChanged       | ValueChanded<String>     | 内容改变的回调 |        |      |
| onSubmitted     | ValueChanged<String>     | 内容提交的回调 |        |      |
| enabled         | bool                     | 是否禁用       |        |      |

![textfield](https://raw.githubusercontent.com/staven630/blog/master/Flutter%E8%B5%B7%E8%88%AA/images/textfield.png)

```
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final TextEditingController controller = TextEditingController();
    controller.addListener(() {
      print('您搜索的内容是:${controller.text}');
    });
    return new MaterialApp(
      title: 'TextField组件',
      home: Scaffold(
        appBar: AppBar(
          title: Text('TextField组件示例')
        ),
        body: Center(
          child: Padding(
            padding: const EdgeInsets.all(20.0),
            child: TextField(
              controller: controller,
              maxLength: 30,
              maxLines: 1,
              autocorrect: true,
              autofocus: true,
              obscureText: false,
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 26.0,
                color: Colors.green
              ),
              onChanged: (text) {
                print('内容更改时回调结果:${text}');
              },
              onSubmitted: (text) {
                print('内容提交时回调结果：${text}');
              },
              enabled: false,
              decoration: InputDecoration(
                fillColor: Colors.grey.shade200,
                filled: true,
                helperText: '搜索 ',
                prefixIcon: Icon(Icons.search),
                suffixText: '搜索'
              ),
            ),
          ),
        )
      )
    );
  }
}
```
