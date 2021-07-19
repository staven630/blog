import {
  Cartesian3,
  HeadingPitchRoll,
  Matrix3,
  Matrix4,
  Quaternion,
  Transforms
} from "cesium";

/**
 * 将局部航向/俯仰/范围旋转(heading/pitch/range)转换为地球轴相对四元数(Quaternion)
 *
 * @param position 空间中的Cartesian3点
 * @param heading 从北方，绕地球法向量旋转
 * @param pitch 水平轴，绕地球切线X轴旋转
 * @param roll 垂直轴，绕地球切线Y轴旋转
 */
export function relativeOrientation(
  position: Cartesian3,
  heading: number,
  pitch: number,
  roll: number
): Quaternion {
  // 构建表示绝对曲面参照系和局部曲面参照系之间旋转的四元数
  const transform4 = Transforms.eastNorthUpToFixedFrame(position);
  const transform3 = new Matrix3();
  Matrix4.getMatrix3(transform4, transform3);
  const transformQ = Quaternion.fromRotationMatrix(transform3);

  // 将h/p/r值转换为（局部参考）四元数
  const localHpr = HeadingPitchRoll.fromDegrees(heading, pitch, roll);
  const localQ = Quaternion.fromHeadingPitchRoll(localHpr);

  // 结果是当地时间变换
  const ret = new Quaternion();
  Quaternion.multiply(localQ, transformQ, ret);
  return ret;
}
