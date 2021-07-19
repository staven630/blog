```js
const viewer = new Cesium.Viewer("cesiumContainer");

const latitude = 28.458491;
const longitude = -80.528413;

const Parabola = (p, h) => {
  const d = p / 2;
  const a = h / (d * d);
  const b = 2 * a * d;
  return (t) => -a * t * t + b * t;
};
const altitude = Parabola(330, 100000);

const pathPosition = new Cesium.SampledPositionProperty();

pathPosition.forwardExtrapolationType = Cesium.ExtrapolationType.EXTRAPOLATE;

const entityPath = viewer.entities.add({
  position: pathPosition,
  path: {
    show: true,
    leadTime: 0,
    trailTime: Infinity,
    width: 2,
    resolution: 5,
    material: new Cesium.ColorMaterialProperty(Cesium.Color.RED),
  },
  billboard: {
    image: Cesium.buildModuleUrl("./Assets/Textures/maki/rocket.png"),
    scale: 0.5,
    rotation: Cesium.Math.toRadians(10),
  },
});

viewer.trackedEntity = entityPath;

let t = 0;
setInterval(() => {
  let position = Cesium.Cartesian3.fromDegrees(
    longitude + t * 0.1,
    latitude,
    altitude(t)
  );
  pathPosition.addSample(Cesium.JulianDate.fromDate(new Date()), position);
  t++;
}, 1000);
```

![missile_1.gif](../img/missile_1.gif)
