
```
<template>
  <div>
<HotTable ref="table"
          :settings="hotSetting"
          :licenseKey="licenseKey"></HotTable>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { HotTable } from '@handsontable/vue';
import Handsontable from 'handsontable';

@Component({
  components: {
    HotTable
  }
})
export default class MyTable extends Vue {
  licenseKey = process.env.VUE_APP_LICENSE_KEY;

  hotSetting = {
    data: [['张三', 28], ['李四', 19], ['王五', 25]]
  }
}
</script>

<style src="handsontable/dist/handsontable.full.css">
</style>
```

# 二维数组
```
hotSetting = {
  data: [['张三', 28], ['李四', 19], ['王五', 25]]
}
```
![二维数组](https://raw.githubusercontent.com/staven630/blog/master/assets/handsontable/1-1.png)

# 对象数组
```
hotSetting = {
  data: [
    { name: '张三', age: 25, a: 'A' },
    { name: '李四', age: 11, b: 'B' },
    { name: '王五', age: 21 }
  ]
}
```
* 以对象属性值，显示在表格中
* 使用哪些属性，取决于第一个对象

![对象数组](https://raw.githubusercontent.com/staven630/blog/master/assets/handsontable/1-2.png)

# 嵌套对象
```
hotSetting = {
  data: [
    { name: { first: '张三', last: '高' }, age: 25 },
    { name: { first: '李四', last: '富' }, age: 11 },
    { name: { first: '王五', last: '帅' }, age: 21 }
  ]
}
```
![嵌套对象1](https://raw.githubusercontent.com/staven630/blog/master/assets/handsontable/1-3.png)


```
hotSetting = {
  data: [
    { name: { first: '张三', last: '高' }, age: 25 },
    { name: { first: '李四', last: '富' }, age: 11 },
    { name: { first: '王五', last: '帅' }, age: 21 }
  ],
  columns: [
    { data: 'name.first' },
    { data: 'age' },
    { data: 'name.last' }
  ]
}
```
* column: 可选配置项。声明每列详细定义
* column data: 指定具体需要显示的对象属性。
* 通过name.first来指定嵌套属性
  
![嵌套对象2](https://raw.githubusercontent.com/staven630/blog/master/assets/handsontable/1-4.png)


# 对象
* Person.ts
```
class Person {
  name: string = ''
  age: number = 0

  constructor(name?: string, age?: number) {
    if (name) {
      this.name = name
    }

    if (age) {
      this.age = age
    }
  }

  getName(): string {
    return this.name
  }

  setName(name: string) {
    this.name = name
  }

  getAge(): number {
    return this.age
  }

  setAge(age: number) {
    this.age = age
  }
}

export default Person
```
```
hotSetting = {
  data: [
    new Person('张三', 28),
    new Person('李四', 19),
    new Person('王五', 25)
  ]
}
```
![对象1](https://raw.githubusercontent.com/staven630/blog/master/assets/handsontable/1-1.png)

```
hotSetting = {
  data: [
    new Person('张三', 28),
    new Person('李四', 19),
    new Person('王五', 25)
  ],
  dataSchema: new Person(),
  columns: [
    {
      data(model: Person, age: number) {
        if (name) {
          model.setName(name)
        } else {
          return model.getName() + 'a';
        }
      }
    },
    {
      data(model: Person, age: number) {
        if (age) {
          model.setAge(age)
        } else {
          return model.getAge() + 'b';
        }
      }
    }
  ]
}
```
![对象2](https://raw.githubusercontent.com/staven630/blog/master/assets/handsontable/1-5.png)

# 空表格
```
hotSetting = {
  data: [],
  dataSchema: { name: null, age: null },
  columns: [
    { data: 'name' },
    { data: 'age' }
  ],
  minSpareRows: 1
}
```
![空表格](https://raw.githubusercontent.com/staven630/blog/master/assets/handsontable/1-6.png)
