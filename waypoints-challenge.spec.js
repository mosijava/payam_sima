const waypointsCalc = require("./waypoints-challenge")
describe("waypointsCalc function", () => {
  test("it returns empty obj if input array is empty", () => {
    const emptyArr = []
    const returnedObj1 = {
      speedDistance: 0,
      speedTime: 0,
      totalTime: 0,
      totalDistance: 0,
    };
    expect(waypointsCalc(emptyArr)).toEqual(returnedObj1)
  });
  test("it returns empty obj if input array has one element", () => {
    const arrLength1 = [{ name: "sima" }]
    const returnedObj1 = {
      speedDistance: 0,
      speedTime: 0,
      totalTime: 0,
      totalDistance: 0,
    };
    expect(waypointsCalc(arrLength1)).toEqual(returnedObj1)
  });
  
  test("it returns calculated data if input array has more than one element", () => {
    const fs = require('fs');
    const initialData = fs.readFileSync('waypoints.json');
    const waypointsArr = JSON.parse(initialData)
    const finalOutput = {
      speedDistance: 0.11145661209476529,
      speedTime: 10,
      totalTime: 20,
      totalDistance: 0.20113284650677926
    }
    expect(waypointsCalc(waypointsArr)).toEqual(finalOutput)
  });
});
 