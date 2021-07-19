## 图片材质：[ImageMaterialProperty]()

| 名称        | 类型                                                                                                                                           | 默认值                   | 是否可选 | 描述                                                         |
| :---------- | :--------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------- | :------- | ------------------------------------------------------------ |
| image       | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| String \| HTMLImageElement \| HTMLCanvasElement \| HTMLVideoElement     |                          | 可选     | 指定图像,URL, Canvas 或视频。                                |
| repeat      | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| [Cartesian2](https://staven630.github.io/cesium-doc-zh/Cartesian2.html) | new Cartesian2(1.0, 1.0) | 可选     | Cartesian2 属性，用于指定图像在每个方向上重复的次数。        |
| color       | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| [Color](https://staven630.github.io/cesium-doc-zh/Color.html)           | Color.white              | 可选     | 应用于图片的颜色                                             |
| transparent | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| Boolean                                                                 | false                    | 可选     | 当图像具有透明度时（例如，当 png 具有透明部分时）设置为 true |

```js
viewer.entities.add({
  rectangle: {
    coordinates: Cesium.Rectangle.fromDegrees(-100.0, 20.0, -80.0, 25.0),
    material: new Cesium.ImageMaterialProperty({
      image: "./Cesium_Logo_Color.jpg",
      transparent: true,
    }),
  },
});
```
