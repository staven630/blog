|  属性名 | 类型 | 说明 | 默认值 | 取值 |
| :--------- | :------ | :------- | :------ | :------- |
| key | Key | Container唯一标识符，用于查找更新 | | |
| alignment | AlignmentGeometry  | 控制child的对其方式  | | Alignment.center |
| padding | EdgeInsetsGeometry | 用来确保内容和文本之间有空格。 | | const EdgeInsets.all(8.0) |
|  color | Color | 用来设置Container背景色，如果foregroundDecoration设置的话，可能会遮盖color效果 |
| decoration | Decoration | 绘制在child后面的装饰，设置了Decoration的话，就不能设置Color属性，否则会报错，此时应该在Decoration中进行颜色的设置 |
| foregroundDecoration | Decoration | 绘制在child前面的装饰 |
| width | double | Container的宽度，设置为double.infinity可以强制在宽度上撑满，不设置，则根据child和父节点两者一起布局 |
| height | double | Container的高度，设置为double.infinity可以强制在高度上撑满 |
| constraints | BoxConstraints | 添加到child上额外的约束条件 |
| margin | EdgeInsetsGeometry | 围绕在Decoration和child之外的空白区域，不属于内容区域 |
| transform | Matrix4 | 设置Container的变换矩阵，类型为Matrix4 |
| child | Widget | Container中的内容Widget |

# 组成
### Container组成
* 最里层是child元素
* child元素首先会被padding包裹着
* 然后添加额外的constraints限制
* 最后添加margin

### Container的绘制过程
* 首先绘制transform效果
* 接着绘制decoration
* 然后绘制child
* 最后绘制foregroundDecoration

### Container自身尺寸的调节分两种情况
* Container在没有子节点(children)的时候，会试图去变得足够大。除非constraints是unbounded限制，在这种情况下，Container会试图去变得足够小
* 带子节点的Container，会根据子节点尺寸调节自身尺寸，但是Container构造器中如果包含了width、height以及constraints，则会按照构造器中的参数来进行尺寸的调节。

# 布局行为
### 一般情况下，Container会遵循如下顺序去尝试布局
* 对齐（alignment）；
* 调节自身尺寸适合子节点；
* 采用width、height以及constraints布局；
* 扩展自身去适应父节点；
* 调节自身到足够小。
### 进一步说：
* 如果没有子节点、没有设置width、height以及constraints，并且父节点没有设置unbounded的限制，Container会将自身调整到足够小。
* 如果没有子节点、对齐方式（alignment），但是提供了width、height或者constraints，那么Container会根据自身以及父节点的限制，将自身调节到足够小。
* 如果没有子节点、width、height、constraints以及alignment，但是父节点提供了bounded限制，那么Container会按照父节点的限制，将自身调整到足够大。
* 如果有alignment，父节点提供了unbounded限制，那么Container将会调节自身尺寸来包住child；
* 如果有alignment，并且父节点提供了bounded限制，那么Container会将自身调整的足够大（在父节点的范围内），然后将child根据alignment调整位置；
* 含有child，但是没有width、height、constraints以及alignment，Container会将父节点的constraints传递给child，并且根据child调整自身。
* margin以及padding属性也会影响到布局。

```
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: '容器组件示例',
        home: Scaffold(
            appBar: AppBar(title: Text('Container组件')),
            body: Center(
                child: Container(
                    width: 200.0,
                    height: 200.0,
                    decoration: BoxDecoration(
                        color: Colors.white,
                        border: Border.all(color: Colors.grey, width: 8.0),
                        borderRadius:
                            const BorderRadius.all(const Radius.circular(8.0))),
                    child: Text('Flutter',
                        textAlign: TextAlign.center,
                        style: TextStyle(fontSize: 28.0))))));
  }
}
```