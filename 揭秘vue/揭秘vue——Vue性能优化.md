# Object.freeze优化长列表
&emsp;&emsp;Object.freeze()方法可以冻结一个对象。一个被冻结的对象再也不能被修改；冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性，不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值。

&emsp;&emsp;对于data()或vuex中冻结的对象，vue不会做getter和setter的转换。因此对于一个不变的、大数据量的数组或Object数据来说，使用Object.freeze()可以有效地提升性能。
* data()
```
export default {
  data: () => ({
    users: {}
  }),
  async created() {
    const users = await axios.get("/api/users");
    this.users = Object.freeze(users);
  }
};
```
* vuex
```
const mutations = {
  setUsers(state, users) {
    state.users = Object.freeze(users);
  }
};
```
&emsp;&emsp;如果需要修改数组，可以通过创建一个新数组来实现。
```
state.users = Object.freeze([...state.users, user]);
```
# 开启performance
&emsp;&emsp;在main.js中添加：
```
Vue.config.performance = process.env.NODE_ENV !== "production";
```

(...持续更新)