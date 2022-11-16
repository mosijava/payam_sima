const fs = require('fs');
const initialData = fs.readFileSync('waypoints.json');
const waypointsArr = JSON.parse(initialData)

function distance(pos1, pos2) {
  var p = 0.017453292519943295; // Math.PI / 180
  var c = Math.cos;
  var a =
    0.5 -
    c((pos2.latitude - pos1.latitude) * p) / 2 +
    (c(pos1.latitude * p) *
      c(pos2.latitude * p) *
      (1 - c((pos2.longitude - pos1.longitude) * p))) /
      2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

const waypointsCalc = (points) => {
  const initialCalculatedData = {
    speedDistance: 0,
    speedTime: 0,
    totalTime: 0,
    totalDistance: 0,
  };

  if (points.length < 2) return initialCalculatedData;

  const calculatedData = points.reduce((acc, curr, index, points) => {
    if (index === 0) {
      return acc;
    }

    const prev = points[index - 1];

    const timeDiff =
      (new Date(curr.timestamp) - new Date(prev.timestamp)) / 1000;

    const distanceInKm = distance(prev.position, curr.position);

    const isSpeeding = curr.speed_limit < curr.speed;

    return {
      speedDistance: isSpeeding
        ? acc.speedDistance + distanceInKm
        : acc.speedDistance,
      speedTime: isSpeeding ? acc.speedTime + timeDiff : acc.speedTime,
      totalTime: acc.totalTime + timeDiff,
      totalDistance: acc.totalDistance + distanceInKm,
    };
  }, initialCalculatedData);

  return calculatedData;
};

console.log(
  waypointsCalc(waypointsArr));
  module.exports = waypointsCalc