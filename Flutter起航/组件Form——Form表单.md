# Form组件的属性
|  属性名 | 类型 | 说明 | 默认值 | 取值 |
| :--------- | :------ | :------- | :------ | :------- |
| key | Key | 组件字啊整个Widget树种的key值 | | |
| autovalidate | bool | 是否自动提交表单 | | |
| child | Widget | 组件child只能有一个子组件 | | |
| onChanged | voidCallback | 当FormField值改变时的回调函数 | | |

# TextFormField组件的属性
| 属性名 | 类型 | 说明 | 默认值 | 取值 |
| :--------- | :------ | :------- | :------ | :------- |
| autovalidate | bool | 自动验证值 | | |
| initialValue | T | 表单字段初始值 | T | | |
| onSaved | FormFieldSetter<T> | 当Form表单调用保存方法Save时回调函数  | | |
| validator | FormFieldValidator<T> | Form表单验证器 | | |

```
import 'package:flutter/material.dart';

void main() => runApp(new LoginPage());

class LoginPage extends StatefulWidget {
  @override
  _LoginPageState createState() => new _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  GlobalKey<FormState> loginKey = new GlobalKey<FormState>();
  String userName;
  String password;

  void login() {
    var loginForm = loginKey.currentState;
    if (loginForm.validate()) {
      loginForm.save();
      print('userName:' + userName + ' password:' + password);
    }
  }

  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
        title: 'Form组件示例',
        home: new Scaffold(
            appBar: new AppBar(title: new Text('Form组件示例')),
            body: new Column(children: <Widget>[
              new Container(
                  padding: const EdgeInsets.all(16.0),
                  child: new Form(
                      key: loginKey,
                      child: new Column(
                        children: <Widget>[
                          new TextFormField(
                            decoration:
                                new InputDecoration(labelText: '请输入用户名'),
                            onSaved: (value) {
                              userName = value;
                            },
                            onFieldSubmitted: (value) {},
                          ),
                          new TextFormField(
                            decoration: new InputDecoration(labelText: '请输入密码'),
                            obscureText: true,
                            validator: (value) {
                              return value.length < 6 ? '密码必须大于6位' : null;
                            },
                            onSaved: (value) {
                              password = value;
                            },
                          ),
                          new SizedBox(
                              width: 340.0,
                              height: 42.0,
                              child: new RaisedButton(
                                  onPressed: login,
                                  child: new Text('登录',
                                      style: new TextStyle(fontSize: 18.0))))
                        ],
                      )))
            ])));
  }
}
```