const computedModelMatrix = (cartesian3, attitude, length) => {
  //锥体距离卫星的高度
  let oldLength = length / 2;
  let centerCartesian3 = new Cesium.Cartesian3(cartesian3.x, cartesian3.y, cartesian3.z);
  let oldX = 0, oldY = 0, oldZ = -oldLength, newX = 0, newY = 0, newZ = 0;
  let heading = attitude.heading;
  //规定顺时针为正旋转,正东方向为0度
  if (heading < 0) {
      heading = heading + 360;
  }
  let roll = attitude.roll;
  let pitch = attitude.pitch;
  let headingRadians = Cesium.Math.toRadians(heading);
  let pitchRadians = Cesium.Math.toRadians(pitch);
  let rollRadians = Cesium.Math.toRadians(roll);
  let hpr = new Cesium.HeadingPitchRoll(headingRadians, pitchRadians, rollRadians);
  let orientation = Cesium.Transforms.headingPitchRollQuaternion(centerCartesian3, hpr);
  //旋转roll
  newY = oldY + oldLength * Math.sin(rollRadians);
  newZ = oldZ + oldLength - oldLength * Math.cos(rollRadians);
  let pitchTouying = oldLength * Math.cos(rollRadians);//进行pitch变化时在Y轴和Z轴组成的平面的投影
  //旋转pitch
  newX = oldX + pitchTouying * Math.sin(pitchRadians);
  newZ = newZ + (pitchTouying - pitchTouying * Math.cos(pitchRadians));
  if (heading != 0) {
      let headingTouying = Math.sqrt(Math.pow(Math.abs(newX), 2) + Math.pow(Math.abs(newY), 2));//进行heading变化时在Y轴和X轴组成的平面的投影
      //旋转heading
      let Xdeg = Cesium.Math.toDegrees(Math.acos(Math.abs(newX) / Math.abs(headingTouying)));//现有投影线与X轴的夹角
      let newXdeg = 0;//旋转heading后与X轴的夹角
      let newXRadians = 0;//旋转heading后与X轴的夹角弧度
      if (newX >= 0 && newY >= 0) {
          newXdeg = heading - Xdeg;
      } else if (newX > 0 && newY < 0) {
          newXdeg = heading + Xdeg;
      } else if (newX < 0 && newY > 0) {
          newXdeg = heading + (180 + Xdeg);
      } else {
          newXdeg = heading + (180 - Xdeg)
      }
      if (newXdeg >= 360) {
          newXdeg = 360 - newXdeg;
      }
      if (newXdeg >= 0 && newXdeg <= 90) {
          newXRadians = Cesium.Math.toRadians(newXdeg);
          newY = -headingTouying * Math.sin(newXRadians);
          newX = headingTouying * Math.cos(newXRadians);
      } else if (newXdeg > 90 && newXdeg <= 180) {
          newXRadians = Cesium.Math.toRadians(180 - newXdeg);
          newY = -headingTouying * Math.sin(newXRadians);
          newX = -headingTouying * Math.cos(newXRadians)
      } else if (newXdeg > 180 && newXdeg <= 270) {
          newXRadians = Cesium.Math.toRadians(newXdeg - 180);
          newY = headingTouying * Math.sin(newXRadians);
          newX = -(headingTouying * Math.cos(newXRadians))
      } else {
          newXRadians = Cesium.Math.toRadians(360 - newXdeg);
          newY = headingTouying * Math.sin(newXRadians);
          newX = headingTouying * Math.cos(newXRadians)
      }
  }
  let offset = new Cesium.Cartesian3(newX, newY, newZ);
  let newPosition = this.computeOffset(centerCartesian3, offset);
  return Cesium.Matrix4.fromTranslationQuaternionRotationScale(newPosition, orientation, new Cesium.Cartesian3(1, 1, 1))
}


const computeOffset = (cartesian3, offset) => {
  let enuTransform = Cesium.Transforms.eastNorthUpToFixedFrame(cartesian3);
  Cesium.Matrix4.multiplyByPointAsVector(enuTransform, offset, offset);
  return Cesium.Cartesian3.add(cartesian3, offset, new Cesium.Cartesian3());
}

/**
 * 计算图元所需的位置和方向。
 * @param {Cesium.Cartesian3} position - 所需原点的位置。
 * @param {Number} az - 光束中心的方位角（弧度）。
 * @param {Number} el - 光束中心的高程（弧度）。
 * @param {Number} range - 光束的范围，单位为米。
 * 
 * @returns {[Cesium.Cartesian3, Cesium.Quaternion]} 用于光束的位置和方向的数组。
 */
 const calculateBeam = (position, az, el, range) => {
  // Cesium圆柱体的起源是圆柱体的中心。
  // 它们也直接指向当地的东北面。
  // 下面的数学公式旋转和平移圆柱体，使其原点为圆柱体的顶端，其方向指向az/el指定的方向。
  let heading = az - Cesium.Math.toRadians(90);
  let pitch = Cesium.Math.toRadians(90) + el;
  let hpr = new Cesium.HeadingPitchRoll(heading, pitch, 0.0);
  let x = range/2.0 * Math.sin(pitch) * Math.cos(heading);
  let y = -range/2.0 * Math.sin(heading) * Math.sin(pitch);
  let z = -range/2.0 * Math.cos(pitch);
  var offset = new Cesium.Cartesian3(x, y, z);
  let enuTransform = Cesium.Transforms.eastNorthUpToFixedFrame(position);
  Cesium.Matrix4.multiplyByPointAsVector(enuTransform, offset, offset);
  let newPosition = Cesium.Cartesian3.add(position, offset, new Cesium.Cartesian3());
  let orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);
  return [newPosition, orientation];
}