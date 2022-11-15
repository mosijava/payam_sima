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
  waypointsCalc([
    {
      timestamp: "2016-06-21T12:00:00.000Z",
      position: {
        latitude: 59.334,
        longitude: 18.0667,
      },
      speed: 6.3889,
      speed_limit: 8.33,
    },
    {
      timestamp: "2016-06-21T12:00:05.000Z",
      position: {
        latitude: 59.3337,
        longitude: 18.0662,
      },
      speed: 9.4,
      speed_limit: 8.33,
    },
    {
      timestamp: "2016-06-21T12:00:10.000Z",
      position: {
        latitude: 59.3331,
        longitude: 18.0664,
      },
      speed: 11.1,
      speed_limit: 8.33,
    },
    {
      timestamp: "2016-06-21T12:00:15.000Z",
      position: {
        latitude: 59.3327,
        longitude: 18.0665,
      },
      speed: 8.32,
      speed_limit: 8.33,
    },
    {
      timestamp: "2016-06-21T12:00:20.000Z",
      position: {
        latitude: 59.3323,
        longitude: 18.0666,
      },
      speed: 8.33,
      speed_limit: 8.33,
    },
  ])
);
