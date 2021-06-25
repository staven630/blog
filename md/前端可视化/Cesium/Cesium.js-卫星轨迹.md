- 筛选起始结束时间

```js
// 卫星数据
const flightData = [];

const step = 30;
const start = Cesium.JulianDate.fromIso8601("2020-03-09T23:10:00Z");
const totalSeconds = step * (flightData.length - 1);
const stop = Cesium.JulianDate.addSeconds(
  start,
  totalSeconds,
  new Cesium.JulianDate()
);
```

- 设置时间轴范围

```js
viewer.clock.startTime = start.clone();
viewer.clock.stopTime = stop.clone();
viewer.clock.currentTime = start.clone();

viewer.clock.multiplier = 50;
viewer.clock.shouldAnimate = true;

viewer.timeline.zoomTo(start, stop);
```
