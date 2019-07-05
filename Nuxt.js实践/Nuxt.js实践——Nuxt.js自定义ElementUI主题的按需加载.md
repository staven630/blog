# 初始化样式文件

- 安装主题工具

```
npm i element-theme -g
```

- 安装 chalk 主题

```
npm i element-theme-chalk -D
```

- 初始化变量文件

```
et -i
```

- 生成 element-variables.scss 文件

```
$--color-primary: #409EFF !default;
$--color-primary-light-1: mix($--color-white, $--color-primary, 10%) !default; /* 53a8ff */
$--color-primary-light-2: mix($--color-white, $--color-primary, 20%) !default; /* 66b1ff */
$--color-primary-light-3: mix($--color-white, $--color-primary, 30%) !default; /* 79bbff */
$--color-primary-light-4: mix($--color-white, $--color-primary, 40%) !default; /* 8cc5ff */
$--color-primary-light-5: mix($--color-white, $--color-primary, 50%) !default; /* a0cfff */
$--color-primary-light-6: mix($--color-white, $--color-primary, 60%) !default; /* b3d8ff */
$--color-primary-light-7: mix($--color-white, $--color-primary, 70%) !default; /* c6e2ff */
$--color-primary-light-8: mix($--color-white, $--color-primary, 80%) !default; /* d9ecff */
$--color-primary-light-9: mix($--color-white, $--color-primary, 90%) !default; /* ecf5ff */

$--color-success: #67c23a !default;
$--color-warning: #eb9e05 !default;
$--color-danger: #fa5555 !default;
$--color-info: #878d99 !default;
```

- 修改变量

```
$--color-primary: #33ac37;
```

- 编译主题

```
et
```

# 导入样式

&emsp;&emsp;将生成的文件放在根目录/theme 目录下

# 按需加载

```
npm i -D babel-plugin-component
// or
yarn add -D babel-plugin-component
```

&emsp;\$emsp;plugins/axios.js

```
import Vue from 'vue'
import {
  Pagination,
  Dialog,
  // Autocomplete,
  // Dropdown,
  // DropdownMenu,
  // DropdownItem,
  // Menu,
  // Submenu,
  // MenuItem,
  // MenuItemGroup,
  Input,
  // InputNumber,
  // Radio,
  // RadioGroup,
  // RadioButton,
  // Checkbox,
  // CheckboxButton,
  // CheckboxGroup,
  // Switch,
  Select,
  Option,
  // OptionGroup,
  Button,
  // ButtonGroup,
  // Table,
  // TableColumn,
  // DatePicker,
  // TimeSelect,
  // TimePicker,
  // Popover,
  // Tooltip,
  // Breadcrumb,
  // BreadcrumbItem,
  Form,
  FormItem,
  Tabs,
  TabPane,
  // Tag,
  // Tree,
  // Alert,
  // Slider,
  Icon,
  Row,
  Col,
  // Upload,
  // Progress,
  // Spinner,
  // Badge,
  // Card,
  // Rate,
  // Steps,
  // Step,
  Carousel,
  Scrollbar,
  CarouselItem,
  // Collapse,
  // CollapseItem,
  // Cascader,
  // ColorPicker,
  // Transfer,
  // Container,
  // Header,
  // Aside,
  // Main,
  // Footer,
  // Loading,
  // Notification,
  Message
  // MessageBox
} from 'element-ui'

import lang from 'element-ui/lib/locale/lang/zh-CN'
import locale from 'element-ui/lib/locale'

// configure language
locale.use(lang)

// set
// Vue.use(Loading.directive)
// Vue.prototype.$loading = Loading.service
// Vue.prototype.$msgbox = MessageBox
// Vue.prototype.$alert = MessageBox.alert
// Vue.prototype.$confirm = MessageBox.confirm
// Vue.prototype.$prompt = MessageBox.prompt
// Vue.prototype.$notify = Notification
Vue.prototype.$message = Message

// import components
Vue.component(Pagination.name, Pagination)
Vue.component(Dialog.name, Dialog)
// Vue.component(Autocomplete.name, Autocomplete)
// Vue.component(Dropdown.name, Dropdown)
// Vue.component(DropdownMenu.name, DropdownMenu)
// Vue.component(DropdownItem.name, DropdownItem)
// Vue.component(Menu.name, Menu)
// Vue.component(Submenu.name, Submenu)
// Vue.component(MenuItem.name, MenuItem)
// Vue.component(MenuItemGroup.name, MenuItemGroup)
Vue.component(Input.name, Input)
// Vue.component(InputNumber.name, InputNumber)
// Vue.component(Radio.name, Radio)
// Vue.component(RadioGroup.name, RadioGroup)
// Vue.component(RadioButton.name, RadioButton)
// Vue.component(Checkbox.name, Checkbox)
// Vue.component(CheckboxButton.name, CheckboxButton)
// Vue.component(CheckboxGroup.name, CheckboxGroup)
// Vue.component(Switch.name, Switch)
Vue.component(Select.name, Select)
Vue.component(Option.name, Option)
// Vue.component(OptionGroup.name, OptionGroup)
Vue.component(Button.name, Button)
// Vue.component(ButtonGroup.name, ButtonGroup)
// Vue.component(Table.name, Table)
// Vue.component(TableColumn.name, TableColumn)
// Vue.component(DatePicker.name, DatePicker)
// Vue.component(TimeSelect.name, TimeSelect)
// Vue.component(TimePicker.name, TimePicker)
// Vue.component(Popover.name, Popover)
// Vue.component(Tooltip.name, Tooltip)
// Vue.component(Breadcrumb.name, Breadcrumb)
// Vue.component(BreadcrumbItem.name, BreadcrumbItem)
Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.component(Tabs.name, Tabs)
Vue.component(TabPane.name, TabPane)
// Vue.component(Tag.name, Tag)
// Vue.component(Tree.name, Tree)
// Vue.component(Alert.name, Alert)
// Vue.component(Slider.name, Slider)
Vue.component(Icon.name, Icon)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
// Vue.component(Upload.name, Upload)
// Vue.component(Progress.name, Progress)
// Vue.component(Spinner.name, Spinner)
// Vue.component(Badge.name, Badge)
// Vue.component(Card.name, Card)
// Vue.component(Rate.name, Rate)
// Vue.component(Steps.name, Steps)
// Vue.component(Step.name, Step)
Vue.component(Carousel.name, Carousel)
Vue.component(Scrollbar.name, Scrollbar)
Vue.component(CarouselItem.name, CarouselItem)
// Vue.component(Collapse.name, Collapse)
// Vue.component(CollapseItem.name, CollapseItem)
// Vue.component(Cascader.name, Cascader)
// Vue.component(ColorPicker.name, ColorPicker)
// Vue.component(Transfer.name, Transfer)
// Vue.component(Container.name, Container)
// Vue.component(Header.name, Header)
// Vue.component(Aside.name, Aside)
// Vue.component(Main.name, Main)
// Vue.component(Footer.name, Footer)

```

# 修改 nuxt.config.js

```
module.exports = {
  css: ['@/theme/reset.css'],
  plugins: [{ src: '@/plugins/element-ui', ssr: true }],
  build: {
    babel: {
      plugins: [['component', { libraryName: 'element-ui', styleLibraryName: '~theme' }]],
      comments: true
    }
  },
}
```
