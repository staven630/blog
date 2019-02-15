&emsp;&emsp;AppBar位置是固定在应用最上面的，而SliverAppBar是可以跟随内容滚动的。
| 属性名 | 类型 | 说明 | 默认值 | 取值 |
| :--------- | :------ | :------- | :------ | :------- |
| leading | Widget | 在标题前面显示的一个组件，在首页通常显示应用的logo；在其他界面通常显示为返回按钮 | null | |
| title | Widget | Toolbar中的主要内容，通常显示为当前界面的标题文字 | null | |
| actions | List<Widget> | Widget列表，ToolBar中所显示菜单。对于常用的菜单，通常使用IconButton来表示，对于不常用的菜单使用PopupMenuButton来显示为三个点，点击后弹出耳机菜单 | null | |
| bottom | PreferredSizeWidget | 通常是TabBar，用来在Toolbar标题下面显示一个Tab导航栏 | null | |
| elevation | double | Material Design设计中组件的z坐标顺序，对于可滚动的SliverAppBar，当SliverAppBar和内容同级的时候，该值为0，当内容滚动SliverAppBar变为Toolbar的时候，修改elevation的值 | 4 | |
| flexibleSpace | Widget | 一个显示在AppBar下方的组件，高度和AppBar高度一样，可以实现一些特殊的效果，该属性通常在SliverAppBar中使用 | | |
| backgroundColor | Color | 背景色 |  ThemeData.primaryColor | |
| brightness | Brightness | AppBar的亮度，有白色和黑色两种主题 | ThemeData.primaryColorBrightness | |
| iconTheme | IconThemeData | AppBar上图标的颜色、透明度和尺寸信息 | ThemeData.primaryIconTheme | |
| textTheme | TextTheme | AppBar上的文字样式 | Theme.primaryTextTheme | |
| centerTitle | bool | 标题是否居中 | true | |
