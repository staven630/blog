# 网址
* [handsontable](https://handsontable.com)
* [handsontable文档](https://handsontable.com/docs)
* 
# 安装
```
npm install handsontable @handsontable/vue
```

# licenseKey

> process.env.VUE_APP_LICENSE_KEY = 'non-commercial-and-evaluation'

```
<template>
  <div>
    <hot-table :data="data"
               :licenseKey="licenseKey"></hot-table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { HotTable } from '@handsontable/vue'

@Component({
  components: {
    HotTable
  }
})
export default class MyTable extends Vue {
  licenseKey: string = process.env.VUE_APP_LICENSE_KEY
  data: any[] = [
    ['', 'Ford', 'Volvo', 'Toyota', 'Honda'],
    ['2016', 10, 11, 12, 13],
    ['2017', 20, 11, 14, 13],
    ['2018', 30, 15, 12, 13]
  ]
}
</script>

<style src="handsontable/dist/handsontable.full.css"></style>

```