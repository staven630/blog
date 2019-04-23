```
export const promisify = (fn, options) => {
  return new Promise((resolve, reject) => {
    let data = {
      success: resolve,
      fail: reject
    };
    if (typeof options !== 'undefined')
      data = Object.assign(data, options);
    fn({
      ...data,
      success: resolve,
      fail: reject
    })
  })
}
```
调用函数
```
promisify(wx.getStorage, {key: 'key'})
	.then(value => {
		
	}).catch(reason => {
		
	});
```