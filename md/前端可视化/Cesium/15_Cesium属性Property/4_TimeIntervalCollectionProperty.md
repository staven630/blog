&emsp;&emsp;该 Property 用来指定各个具体的时间段的属性值，每个时间段内的属性值是固定的，并不会发生变化，除非已经进入到下一个时间段，表现出的变化是跳跃式的。

```js
const property = new Cesium.TimeIntervalCollectionProperty(Cesium.Cartesian3);

property.intervals.addInterval(
  Cesium.TimeInterval.fromIso8601({
    iso8601: "2021-06-24T00:00:00.00Z/2021-06-24T12:00:00.00Z",
    isStartIncluded: true,
    isStopIncluded: false,
    data: new Cesium.Cartesian3(400000.0, 300000.0, 200000.0),
  })
);
property.intervals.addInterval(
  Cesium.TimeInterval.fromIso8601({
    iso8601: "2021-06-24T12:00:01.00Z/2021-06-25T00:00:00.00Z",
    isStartIncluded: true,
    isStopIncluded: false,
    data: new Cesium.Cartesian3(400000.0, 300000.0, 400000.0),
  })
);
property.intervals.addInterval(
  Cesium.TimeInterval.fromIso8601({
    iso8601: "2021-06-25T00:00:01.00Z/2021-06-25T12:00:00.00Z",
    isStartIncluded: true,
    isStopIncluded: false,
    data: new Cesium.Cartesian3(400000.0, 300000.0, 500000.0),
  })
);
property.intervals.addInterval(
  Cesium.TimeInterval.fromIso8601({
    iso8601: "2021-06-25T12:00:01.00Z/2021-06-26T00:00:00.00Z",
    isStartIncluded: true,
    isStopIncluded: true,
    data: new Cesium.Cartesian3(400000.0, 300000.0, 700000.0),
  })
);

blueBox.box.dimensions = property;
```

![TimeIntervalCollectionProperty](../img/TimeIntervalCollectionProperty.gif)
