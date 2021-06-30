&emsp;&emsp;[Billboard](https://staven630.github.io/cesium-doc-zh/Billboard.html)、[BillboardCollection](https://staven630.github.io/cesium-doc-zh/BillboardCollection.html)

| 名称                       | 类型                                                                                                                                                                       | 是否必填 | 默认值                  | 描述                                                                                                     |
| :------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------- | :---------------------- | :------------------------------------------------------------------------------------------------------- |
| show                       | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| boolean                                                                                             | <可选>   | true                    | 指定广告牌可见性的布尔属性。                                                                             |
| image                      | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| string \| HTMLCanvasElement                                                                         | <可选>   |                         | 指定用于广告牌的图像、URI 或画布。                                                                       |
| scale                      | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| number                                                                                              | <可选>   | 1.0                     | 指定要应用于图像大小的比例。                                                                             |
| pixelOffset                | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| [Cartesian2](https://staven630.github.io/cesium-doc-zh/Cartesian2.html)                             | <可选>   | Cartesian2.ZERO         | Cartesian2 属性指定像素偏移。                                                                            |
| eyeOffset                  | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| [Cartesian3](https://staven630.github.io/cesium-doc-zh/Cartesian3.html)                             | <可选>   | Cartesian3.ZERO         | Cartesian3 属性指定的眼睛偏移。                                                                          |
| horizontalOrigin           | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| [HorizontalOrigin](https://staven630.github.io/cesium-doc-zh/global.html#HorizontalOrigin)          | <可选>   | HorizontalOrigin.CENTER | 指定 HorizontalOrigin。                                                                                  |
| verticalOrigin             | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| [VerticalOrigin](https://staven630.github.io/cesium-doc-zh/global.html#VerticalOrigin)              | <可选>   | VerticalOrigin.CENTER   | 指定 VerticalOrigin。                                                                                    |
| heightReference            | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| [HeightReference](https://staven630.github.io/cesium-doc-zh/global.html#HeightReference)            | <可选>   | HeightReference.NONE    | 指定高度相对于什么的属性。                                                                               |
| color                      | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| [Color](https://staven630.github.io/cesium-doc-zh/Color.html)                                       | <可选>   | Color.WHITE             | 指定 Color 图像色调的属性。                                                                              |
| rotation                   | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| number                                                                                              | <可选>   | 0                       | 指定围绕对齐轴的旋转                                                                                     |
| alignedAxis                | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| [Cartesian3](https://staven630.github.io/cesium-doc-zh/Cartesian3.html)                             | <可选>   | Cartesian3.ZERO         | Cartesian3 属性指定的单位矢量轴的旋转。                                                                  |
| sizeInMeters               | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| boolean                                                                                             | <可选>   |                         | 指定此广告牌的大小是否应以米为单位。                                                                     |
| width                      | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| number                                                                                              | <可选>   |                         | 以像素为单位指定广告牌的宽度，覆盖本机大小。                                                             |
| height                     | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| number                                                                                              | <可选>   |                         | 以像素为单位指定广告牌的高度，覆盖本机大小。                                                             |
| scaleByDistance            | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| [NearFarScalar](https://staven630.github.io/cesium-doc-zh/NearFarScalar.html)                       | <可选>   |                         | NearFarScalar 属性用于根据距相机的距离缩放点。                                                           |
| translucencyByDistance     | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| [NearFarScalar](https://staven630.github.io/cesium-doc-zh/NearFarScalar.html)                       | <可选>   |                         | NearFarScalar 用来设置半透明基于从相机的距离。                                                           |
| pixelOffsetScaleByDistance | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| [NearFarScalar](https://staven630.github.io/cesium-doc-zh/NearFarScalar.html)                       | <可选>   |                         | NearFarScalar 属性用于根据距相机的距离设置 pixelOffset。                                                 |
| imageSubRegion             | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| [BoundingRectangle](https://staven630.github.io/cesium-doc-zh/BoundingRectangle.html)               | <可选>   |                         | 指定一个 BoundingRectangle，它定义要用于广告牌的图像的子区域，而不是整个图像，以像素为单位从左下角开始。 |
| distanceDisplayCondition   | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| [DistanceDisplayCondition](https://staven630.github.io/cesium-doc-zh/DistanceDisplayCondition.html) | <可选>   |                         | 指定将在距相机多远的地方显示此广告牌。                                                                   |
| disableDepthTestDistance   | [Property](https://staven630.github.io/cesium-doc-zh/Property.html) \| number                                                                                              | <可选>   |                         | 指定要禁用深度测试的距离相机的距离。                                                                     |

```js
const entity = viewer.entities.add({
  position: new Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
  billboard: {
    // 获取或设置世界空间中对齐的轴。
    alignedAxis: Cesium.Cartesian3.ZERO,

    // 获取或设置从相机到禁用深度测试的距离
    disableDepthTestDistance: Number.POSITIVE_INFINITY,

    // 获取或设置与广告牌纹理相乘的颜色。
    color: Cesium.Color.LIME,

    // 获取或设置在眼睛坐标中应用于此广告牌的 3D 笛卡尔偏移量
    eyeOffset: new Cesium.Cartesian3(0.0, 0.0, 0.0),

    // 获取或设置广告拍的高度
    height: 25,

    // 此广告牌的高度参考
    heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,

    // 广告牌在锚点的左侧、右侧还是中间
    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,

    // 广告牌的ID
    id: "",

    // 用于此广告牌的图像
    image: "./Cesium_Logo_overlay.png",

    // 获取或设置指定用于广告牌BoundingRectangle的子区域的属性image，而不是整个图像，从左下角开始以像素为单位。
    imageSubRegion: new Cesium.BoundingRectangle(61, 23, 18, 18),

    // 获取或设置屏幕空间中距此广告牌原点的像素偏移量。
    pixelOffset: new Cesium.Cartesian2(0, -50),

    // 根据广告牌与相机的距离，获取或设置广告牌的近/远像素偏移缩放属性
    // 当相机距离广告牌1500米时，将广告牌的像素偏移比例设置为0.0
    // 当相机距离接近8.0e6米时，将y方向的像素偏移比例设置为10.0像素
    pixelOffsetScaleByDistance: new Cesium.NearFarScalar(1.5e2, 0.0, 8.0e6, 10.0);

    // 旋转角度(以弧度为单位)
    rotation:  Cesium.Math.PI_OVER_FOUR,

    // 缩放比例
    scale: 2.0,

    // 根据广告牌与摄像机的距离，获取或设置广告牌的近和远缩放属性。
    // 当相机距离广告牌1500米时，将广告牌的缩放距离设置为1.5。
    // 当相机距离接近8.0e6米时，广告牌将消失。
    scaleByDistance : new Cesium.NearFarScalar(1.5e2, 1.5, 8.0e6, 0.0);

    // 是否显示此广告牌
    show: true,

    // 广告牌大小是否以米或像素为单位
    sizeInMeters: false,

    // 根据广告牌到相机的距离获取或设置广告牌的近和远半透明属性
    // 当摄影机距离广告牌1500米时，将广告牌的半透明度设置为1.0
    // 当摄影机距离接近8.0e6米时，广告牌将消失。
    translucencyByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 8.0e6, 0.0),

    // 广告牌位于锚点的上方、下方还是中间。
    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,

    // 获取或设置广告牌的宽度
    width: 100,
  },
});
```

## 克隆 Billboard

```js
const cloneBillboard = entity.billboard.clone();
const cloneEntity = new Cesium.Entity();
cloneEntity.position = Cesium.Cartesian3.fromDegrees(-90, 40.5);
cloneEntity.billboard = cloneBillboard;
viewer.entities.add(cloneEntity);
```

## 合并 Billboard

```js
const billboardGraphics = new Cesium.BillboardGraphics();
billboardGraphics.merge(entity.billboard);
```

## 动态切换 billboard 属性

```js
viewer = new Cesium.Viewer("cesiumContainer");

const entity = viewer.entities.add({
  name: "logo",
  position: Cesium.Cartesian3.fromDegrees(109.44, 32.11, 30.0),
  point: {
    pixelSize: 0,
    HeightReference: 1000,
  },
  label: {
    text: "Hello",
    font: "500 30px Helvetica",
    scale: 0.5,
    style: Cesium.LabelStyle.FILL,
    fillColor: Cesium.Color.WHITE,
    pixelOffset: new Cesium.Cartesian2(-8, -35),
    showBackground: true,
    backgroundColor: new Cesium.Color(0.5, 0.6, 1, 1.0),
  },
  billboard: {
    image: "./Cesium_Logo_overlay.png",
  },
});

viewer.flyTo(entity, {
  duration: 2,
  offset: {
    heading: Cesium.Math.toRadians(0.0),
    pitch: Cesium.Math.toRadians(-30),
    range: 720,
  },
});

const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

handler.setInputAction((e) => {
  const pick = viewer.scene.pick(e.position);

  if (pick && pick.id.name === "logo") {
    entity.billboard.image._value = "./Cesium_Logo_Color.jpg";
    entity.label.text._value = "Cesium";
  }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
```

## 加载自定义图片

```js
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
<foreignObject width="100%" height="100%">
<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:40px; color: #FF0">
  <em>I</em> like <span style="color:white; text-shadow:0 0 2px blue;">Cesium</span>
</div>
</foreignObject>
</svg>`;

const canvas = document.createElement("canvas");
canvas.width = 300;
canvas.height = 300;

const image = new Image();
image.src = `data:image/svg+xml;base64,${window.btoa(svg)}`;
image.onload = () => {
  canvas.getContext("2d").drawImage(image, 0, 0);
  viewer.entities.add({
    id: "svg",
    position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
    billboard: {
      image: canvas,
    },
    description: "<p>This is a cupcake that can be modified.</p>",
  });
};
```

## 处理大量数据

```js
const billboards = viewer.scene.primitives.add(
  new Cesium.BillboardCollection()
);

billboards.add({
  image: "./facility.gif",
});

billboards.add({
  image: "./gitHub16px.png",
});

Cesium.GeoJsonDataSource.load(
  "https://gist.githubusercontent.com/arelenglish/ebacfe043de319b4e72fb5232e208281/raw/004c5a0bf4024fc715f035989e86e0b3d62cd976/test.geojson",
  {
    stroke: Cesium.Color.fromBytes(0, 230, 240, 40),
    markerSize: 0,
  }
).then((data) => {
  viewer.dataSources.add(data);
  viewer.zoomTo(data);
  const entities = data.entities.values;
  entities.forEach((entity) => {
    const type = entity.properties.feature_type._value;
    if (type === "airport") {
      entity.billboard = billboards.get(0);
    } else if (type === "waypoint") {
      entity.billboard = billboards.get(1);
    }
  });
});
```

[Sandcastle Billboards](https://sandcastle.cesium.com/index.html?src=Billboards.html)
