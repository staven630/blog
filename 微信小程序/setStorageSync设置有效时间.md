```
//设置缓存 (单位为秒)
export const setStorage = (value, key = ACCESS_TOKEN) => {
  const params = {
    date: new Date().getTime(),
    value
  };
  wx.setStorageSync(key, JSON.stringify(params));
}


export const getStorage = (day = 0.5, key = ACCESS_TOKEN) => {
  let obj = wx.getStorageSync(key);
  if (!obj) return null;
  obj = JSON.parse(obj);
  const date = new Date().getTime();
  if (date - obj.date > 86400000 * day) return null;
  return obj.value;
}

export const removeStorage = (key = ACCESS_TOKEN) => {
  wx.removeStorageSync(key);
}
```