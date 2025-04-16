import { getEuclidianPattern } from "./euclidian";

const examplePatterns: Record<string, number[]> = {
  "0,4": [0, 0, 0, 0],
  "4,4": [1, 1, 1, 1],
  "2,4": [1, 0, 1, 0],
  "5,16": [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
  "5,13": [1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0],
  "7,12": [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0],
};

describe("Euclidian pattern generation", () => {
  test("should throw if hits is greater than steps", () => {
    expect(() => getEuclidianPattern(4, 1)).toThrow();
  });

  Object.keys(examplePatterns).forEach((key) => {
    const pattern = examplePatterns[key];

    if (!pattern) {
      throw new Error(`Pattern not found for key: ${key}`);
    }

    const [hits, steps] = key.split(",").map(Number);

    test(`should return E(${key}) = ${pattern}`, () => {
      expect(getEuclidianPattern(hits, steps)).toEqual(pattern);
    });
  });
});
