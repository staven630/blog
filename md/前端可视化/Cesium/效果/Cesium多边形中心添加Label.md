```js
const viewer = new Cesium.Viewer("cesiumContainer");

const redPolygon = viewer.entities.add({
  polygon: {
    hierarchy: Cesium.Cartesian3.fromDegreesArray([
      -115.0,
      37.0,
      -115.0,
      32.0,
      -107.0,
      33.0,
      -102.0,
      31.0,
      -102.0,
      35.0,
    ]),
    material: Cesium.Color.RED.withAlpha(0.5),
  },
});

const polygonPositions = redPolygon.polygon.hierarchy.getValue(
  Cesium.JulianDate.now()
).positions;

let polygonCenter = Cesium.BoundingSphere.fromPoints(polygonPositions).center; //中心点
polygonCenter = Cesium.Ellipsoid.WGS84.scaleToGeodeticSurface(polygonCenter);
redPolygon.position = polygonCenter;

redPolygon.label = {
  text: "Polygon中心点",
  color: Cesium.Color.fromCssColorString("#FFF"),
  font: "normal 32px Microsoft Yahei",
  showBackground: true,
  scale: 0.5,
  horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
  verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
  disableDepthTestDistance: 10000.0,
};

viewer.zoomTo(viewer.entities);
```

![Polygon_center](../img/Polygon_center.png)
