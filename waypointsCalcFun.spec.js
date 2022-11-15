const waypointsCalc = require("./waypoints-challenge")
 describe("waypointsCalc test",()=> {
    test("waypointsCalc works properly for array lenght < 2", () => {
     let returnedObj = {
    speedDistance: 0,
    speedTime: 0,
    totalTime: 0,
    totalDistance: 0,}
     expect(waypointsCalc([{ name: "Sima"}])).toEqual(returnedObj)});

    const testData = [
    { a: 1, b: 1, expected: 2 },
    { a: 1, b: 2, expected: 3 },
    { a: 2, b: 1, expected: 3 }
    ];
    for (let i = 1; i < testData.length; i++){ it("loop over array", () => {
        expect(testData[1]).toEqual({ a: 1, b: 2, expected: 3 });
    });
    }
  })