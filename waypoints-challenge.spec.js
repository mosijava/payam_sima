const waypointsCalc = require("./waypoints-challenge");

initialExpectedOutput = {
  speedDistance: 0,
  speedTime: 0,
  totalTime: 0,
  totalDistance: 0,
};

describe("waypointsCalc function", () => {
  test("it throws an error if input is not an array", () => {
    expect(() => {
      waypointsCalc();
    }).toThrowError();
  });

  test("it returns all calculated data as zero if input array is empty", () => {
    expect(waypointsCalc([])).toEqual(initialExpectedOutput);
  });

  test("it returns all calculated data as zero if input array contains only one point", () => {
    expect(
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
      ])
    ).toEqual(initialExpectedOutput);
  });

  test("it returns calculated data if input array has more than one element", () => {
    const fs = require("fs");
    const fileContent = fs.readFileSync("waypoints.json");
    const pointsArr = JSON.parse(fileContent);
    const finalOutput = {
      speedDistance: 0.11145661209476529,
      speedTime: 10,
      totalTime: 20,
      totalDistance: 0.20113284650677926,
    };
    expect(waypointsCalc(pointsArr)).toEqual(finalOutput);
  });
});
