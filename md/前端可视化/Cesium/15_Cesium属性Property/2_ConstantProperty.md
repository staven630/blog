&emsp;&emsp;ConstantProperty 的值不随模拟时间变化而变化，其 isConstant 的属性值始终为 true。

### 隐式转换

```js
blueBox.box.dimensions = new Cesium.Cartesian3(400000.0, 300000.0, 200000.0);
```

&emsp;&emsp;实际上等同于:

```js
blueBox.box.dimensions = new ConstantProperty(
  new Cesium.Cartesian3(400000.0, 300000.0, 200000.0)
);
```

&emsp;&emsp;Cesium.BoxGraphics 的[dimensions](https://staven630.github.io/cesium-doc-zh/BoxGraphics.html#dimensions)属性的类型是 Property 或者 undefined。而这里赋值的却是 Cartesian3 类型，是因为 Cesium 内部会隐式地将其转换成 ConstantProperty。

### setValue

&emsp;&emsp;ConstantProperty 的值不随时间改变，但并不是不可修改。setValue(value)方法就可以修改原有 ConstantProperty 的值：

```js
blueBox.box.dimensions.setValue(
  new Cesium.Cartesian3(400000.0, 300000.0, 700000.0)
);
```

&emsp;&emsp;等同于以下直接赋值方式。但区别是：直接赋值会创建一个新的 ConstantProperty。

```js
blueBox.box.dimensions = new Cesium.Cartesian3(400000.0, 300000.0, 200000.0);
```
