|  属性名 | 类型 | 说明 | 默认值 | 取值 |
| :--------- | :------ | :------- | :------ | :------- |
| image | ImageProvider | 抽象类，需要自己实现获取图片数据的操作 | | |
| width/height | double | Image显示区域的宽度和高度设置，这里需要把Image和图片两个东西区分开，图片本身有大小，Image Widget是图片的容器，本身也有大小。宽度和高度的配置经常和fit属性配合使用 |  |  |
| fit | BoxFit | 图片填充模式 | | |
| color | Color | 图片颜色 | | |
| colorBlendMode | BlendMode | 在对图片进行手动处理的时候，可能用到图层混合，如改变图片的颜色。此属性可以对颜色进行混合处理 | | |
| alignment | Alignment | 控制图片的摆放位置 |  | Alignment.bottomRight |
| repeat | ImageRepeat | 图片重复模式 | | noRepeat 不重复，Repeat为x,y方向重复，repeatX为x方向重复，repeatY方向重复 |
| centerSlice | Rect | 当图片需要被拉伸显示时，centerSlice定义的举行区域会被拉伸 | | |
| matchTextDecoration | bool | 与Directionality配合使用。TextDecoration由两个值分别为TextDirection.ltr从左向右展示图片,TextDirection.rtl从右向左展示图片 | | |
| gaplessPlayback | bool | 当ImageProvider发生变化后，重新加载图片的过程中，原图片的展示是否保留。| | |

# BoxFit取值及描述
|  属性名 | 描述 | 
| :--------- | :------ | 
| BoxFit.fill | 全图显示，显示可能拉伸，充满 |
| BoxFit.contain  | 全图显示，显示原比例，不需充满 |
| BoxFit.cover | 显示可能拉伸，可能裁剪，充满  |
| BoxFit.fitWidth | 显示可能拉伸，可能裁剪，宽度充满 |
| BoxFit.fitHeight | 显示可能拉伸，可能裁剪，高度充满 |
| BoxFit.none | 原始大小 |
| BoxFit.scaleDown | 效果和BoxFit.contain差不多，但是此属性不允许显示超过源图片大小，即可小不可大 |