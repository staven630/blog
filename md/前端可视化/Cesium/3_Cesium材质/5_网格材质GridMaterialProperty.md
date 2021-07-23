## 网格材质[GridMaterialProperty](https://staven630.github.io/cesium-doc-zh/GridMaterialProperty.html)

| 名称          | 类型                                                                                                                                           | 默认值                  | 是否可选 | 描述                             |
| :------------ | :--------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------- | :------- | -------------------------------- |
| color         | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| [Color](https://staven630.github.io/cesium-doc-zh/Color.html)           | Color.WHITE             | 可选     | 指定网格的 Color 属性。          |
| cellAlpha     | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| Number                                                                  | 0.1                     | 可选     | 指定单元格 alpha 值得数字属性    |
| lineCount     | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| [Cartesian2](https://staven630.github.io/cesium-doc-zh/Cartesian2.html) | new Cartesian(8, 8)     | 可选     | 指定沿每个轴网格线的数量。       |
| lineThickness | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| [Cartesian2](https://staven630.github.io/cesium-doc-zh/Cartesian2.html) | new Cartesian(1.0, 1.0) | 可选     | 指定沿每个轴网格线的厚度。       |
| lineOffset    | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| [Cartesian2](https://staven630.github.io/cesium-doc-zh/Cartesian2.html) | new Cartesian(0.0, 0.0) | 可选     | 指定的起始偏移的沿每个轴网格线。 |
