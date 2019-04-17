# errorCapture
&emsp;&emsp;当捕获一个来自子孙组件的错误时被调用。此钩子会受到三个参数：err错误对象、vm发生错误的组件实例、info错误来源信息的字符串。

&emsp;&emsp;此钩子返回false以阻止该错误继续向上传播。

&emsp;&emsp;可以在此钩子中修改组件的状态。因此在模板或渲染函数中设置其它内容的短路条件非常重要，它可以防止当一个错误被捕获时该组件进入一个无限的渲染循环。

# errorHandler
```
const handlerError = (err, vm, info) => { }

Vue.config.errorHandler = handlerError;
Vue.prototype.$throw = function(error) {
	return handlerError(error, this);
}
```
### 捕获组件生命周期钩子错误
&emsp;&emsp;组件生命周期钩子中异步错误处理的3种方式：
```
export default {
  name: "HelloWorld",
  mounted() {
    throw new Error("error");
  }
};
```

```
export default {
  name: "HelloWorld",
  mounted() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject("error");
      }, 2000);
    });
  }
};
```

```
const err = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('error')
    }, 2000)
  })
}

export default {
  name: 'HelloWorld',
  async mounted() {
    return err()
  }
}
```

### 捕获自定义事件处理函数内部错误

### 捕获DOM监听器内部错误

# 错误传播规则
&emsp;&emsp;源码：[vue/src/core/util/error.js](https://github.com/vuejs/vue/blob/dev/src/core/util/error.js)

```
import config from '../config'
import { warn } from './debug'
import { inBrowser, inWeex } from './env'
import { isPromise } from 'shared/util'
import { pushTarget, popTarget } from '../observer/dep'

export function handleError (err: Error, vm: any, info: string) {
   pushTarget()
  try {
    if (vm) {
      let cur = vm
      while ((cur = cur.$parent)) {
        const hooks = cur.$options.errorCaptured
        if (hooks) {
          for (let i = 0; i < hooks.length; i++) {
            try {
              const capture = hooks[i].call(cur, err, vm, info) === false
              if (capture) return
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook')
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info)
  } finally {
    popTarget()
  }
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      if (e !== err) {
        logError(e, null, 'config.errorHandler')
      }
    }
  }
  logError(err, vm, info)
}

function logError (err, vm, info) {
  if (process.env.NODE_ENV !== 'production') {
    warn(`Error in ${info}: "${err.toString()}"`, vm)
  }
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err)
  } else {
    throw err
  }
}
```
&emsp;&emsp;默认情况下，如果全局的 config.errorHandler 被定义，所有的错误仍会发送它，因此这些错误仍然会向单一的分析服务的地方进行汇报。

&emsp;&emsp;如果一个组件的继承或父级从属链路中存在多个 errorCaptured 钩子，则它们将会被相同的错误逐个唤起。如果此 errorCaptured 钩子自身抛出了一个错误，则这个新错误和原本被捕获的错误都会发送给全局的 config.errorHandler。

&emsp;&emsp;一个 errorCaptured 钩子能够返回 false 以阻止错误继续向上传播。本质上是说“这个错误已经被搞定了且应该被忽略”。它会阻止其它任何会被这个错误唤起的 errorCaptured 钩子和全局的 config.errorHandler。