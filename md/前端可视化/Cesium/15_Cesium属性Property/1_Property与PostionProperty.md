## Property

&emsp;&emsp;[Property](https://staven630.github.io/cesium-doc-zh/Property.html) 是所有 Property 类型的接口。代表一个可以随时间变化的值。该类型定义了一个接口，不能直接实例化。

### 基本 Property 类型

- SampledProperty
- TimeIntervalCollectionProperty
- ConstantProperty
- CompositeProperty

## PositionProperty

&emsp;&emsp;[PositionProperty](https://staven630.github.io/cesium-doc-zh/PositionProperty.html)也是一个基类接口，扩展了 Property 接口，增加了 referenceFrame，只能用来表示 position。

### 基于 PositionProperty 的类型

- ConstantPositionProperty
- PositionProperty
- PositionPropertyArray
- SampledPositionProperty
- TimeIntervalCollectionPositionProperty
- CompositePositionProperty

&emsp;&emsp;此类 Property 与普通 Property 用法相似，只是多了 Position 限制，主要用来表示位置操作。
