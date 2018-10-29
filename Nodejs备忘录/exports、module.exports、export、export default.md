### exports 与 module.exports
* nodejs执行文件，会自动创建一个module对象，module对象有一个exports属性，初始值为{}
* exports 是指向的 module.exports 的引用
* 真正导出的是module.exports，require() 返回的是 module.exports