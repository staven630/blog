## 轮廓线材质[PolylineOutlineMaterialProperty](https://staven630.github.io/cesium-doc-zh/PolylineOutlineMaterialProperty.html)

| 名称         | 类型                                                                                                                                 | 是否必填 | 默认值      | 描述                           |
| :----------- | :----------------------------------------------------------------------------------------------------------------------------------- | :------- | :---------- | :----------------------------- |
| color        | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| [Color](https://staven630.github.io/cesium-doc-zh/Color.html) | 可选     | Color.WHITE | 用于线的 Color 属性。          |
| outlineColor | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| [Color](https://staven630.github.io/cesium-doc-zh/Color.html) | 可选     | 1.0         | 指定轮廓的 color 属性          |
| outlineWidth | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| Number                                                        | 可选     | 1.0         | 指定轮廓的宽度（以像素为单位） |

```js
const orangeOutlined = viewer.entities.add({
  name: "OrangeLine",
  polyline: {
    positions: Cesium.Cartesian3.fromDegreesArrayHeights([
      -75,
      39,
      250000,
      -125,
      39,
      250000,
    ]),
    width: 5,
    material: new Cesium.PolylineOutlineMaterialProperty({
      color: Cesium.Color.ORANGE,
      outlineWidth: 2,
      outlineColor: Cesium.Color.BLACK,
    }),
  },
});
```

![PolylineOutlineMaterialProperty](../img/PolylineOutlineMaterialProperty.png)
