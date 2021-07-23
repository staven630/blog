//定义一些常量
const X_PI = (3.14159265358979324 * 3000.0) / 180.0;

const AA = 6378245.0;
const EE = 0.00669342162296594323;

/**
 * 判断是否在国内，不在国内则不做偏移
 * @param lng
 * @param lat
 * @returns {boolean}
 */
export const outOfChina = (lng, lat) =>
  lng < 72.004 || lng > 137.8347 || lat < 0.8293 || lat > 55.8271;

/**
 * 百度坐标系 (BD-09) 与 火星坐标系 (GCJ-02)的转换
 * 即 百度 转 腾讯、谷歌、高德
 * @param bd_lon
 * @param bd_lat
 * @returns {*[]}
 */

export const bdToGcj = (bd_lon, bd_lat) => {
  const x = bd_lon - 0.0065;
  const y = bd_lat - 0.006;
  const z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI);
  const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI);
  return [z * Math.cos(theta), z * Math.sin(theta)];
};

/**
 * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
 * 即腾讯、谷歌、高德 转 百度
 * @param lng
 * @param lat
 * @returns {*[]}
 */
export const gcjToBd = (lng, lat) => {
  const z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * X_PI);
  const theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * X_PI);
  return [z * Math.cos(theta) + 0.0065, z * Math.sin(theta) + 0.006];
};

export const transformLat = (lng, lat) => {
  let ret =
    -100.0 +
    2.0 * lng +
    3.0 * lat +
    0.2 * lat * lat +
    0.1 * lng * lat +
    0.2 * Math.sqrt(Math.abs(lng));
  ret +=
    ((20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) *
      2.0) /
    3.0;
  ret +=
    ((20.0 * Math.sin(lat * PI) + 40.0 * Math.sin((lat / 3.0) * PI)) * 2.0) /
    3.0;
  ret +=
    ((160.0 * Math.sin((lat / 12.0) * PI) + 320 * Math.sin((lat * PI) / 30.0)) *
      2.0) /
    3.0;
  return ret;
};

export const transformLng = (lng, lat) => {
  let ret =
    300.0 +
    lng +
    2.0 * lat +
    0.1 * lng * lng +
    0.1 * lng * lat +
    0.1 * Math.sqrt(Math.abs(lng));
  ret +=
    ((20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) *
      2.0) /
    3.0;
  ret +=
    ((20.0 * Math.sin(lng * PI) + 40.0 * Math.sin((lng / 3.0) * PI)) * 2.0) /
    3.0;
  ret +=
    ((150.0 * Math.sin((lng / 12.0) * PI) +
      300.0 * Math.sin((lng / 30.0) * PI)) *
      2.0) /
    3.0;
  return ret;
};

/**
 *
 * @param lng
 * @param lat
 * @returns {*[]}
 */
export const transfromLatlng = (lng, lat) => {
  if (outOfChina(lng, lat)) return [lng, lat];
  // 卫星椭球坐标投影到平面地图坐标系的投影因子
  const FACTOR = 6378245.0;
  // 椭球的偏心率
  const ECCENTRICITY = 0.00669342162296594323;
  // 圆周率
  const PI = 3.1415926535897932384626;

  const radlat = (lat / 180.0) * PI;
  let magic = Math.sin(radlat);
  magic = 1 - ECCENTRICITY * magic * magic;
  const sqrtmagic = Math.sqrt(magic);

  let dLat = transformLat(lng - 105.0, lat - 35.0);
  let dLng = transformLng(lng - 105.0, lat - 35.0);
  dLat =
    (dLat * 180.0) /
    (((FACTOR * (1 - ECCENTRICITY)) / (magic * sqrtmagic)) * PI);
  dLng = (dLng * 180.0) / ((FACTOR / sqrtmagic) * Math.cos(radlat) * PI);

  return [dLng, dLat];
};

/**
 * WGS84转GCj02
 * @param lng
 * @param lat
 * @returns {*[]}
 */
export const wgsToGcj = (lng, lat) => {
  if (outOfChina(lng, lat)) return [lng, lat];
  const [dLng, dLat] = transfromLatlng(lng, lat);
  return [lng + dLng, lat + dLat];
};

/**
 * GCJ02 转换为 WGS84
 * @param lng
 * @param lat
 * @returns {*[]}
 */
export const gcjToWgs = (lng, lat) => {
  if (outOfChina(lng, lat)) return [lng, lat];
  const [dLng, dLat] = transfromLatlng(lng, lat);
  return [lng - dLng, lat - dLat];
};

/**
 * WGS84转Web mercator
 * @param lng
 * @param lat
 * @returns {*[]}
 */
export const wgsToMercator = (lng, lat) => {
  const mLng = (lng * 20037508.34) / 180;
  let mLat = Math.log(Math.tan(((90 + lat) * this.PI) / 360)) / (this.PI / 180);
  mLat = (mLat * 20037508.34) / 180;
  return [mLng, mLat];
};
