import { input } from "./day_1_input.ts";

function partOne(): number {
  let increases = 0;

  let lastDepth;
  for (const depth of input) {
    if (lastDepth && depth - lastDepth > 0) {
      ++increases;
    }

    lastDepth = depth;
  }

  return increases;
}

function partTwo(): number {
  let increases = 0;

  const windows: number[][] = [];

  for (const [i, depth] of input.entries()) {
    for (let o = 0; o < 3; ++o) {
      windows[i + o] ||= [];
      windows[i + o].push(depth);
    }
  }

  let lastMeasurement;
  for (const window of windows) {
    if (window.length !== 3) continue;

    const measurement = window.reduce((a, b) => a + b);

    if (lastMeasurement && measurement - lastMeasurement > 0) {
      ++increases;
    }

    lastMeasurement = measurement;
  }

  return increases;
}

console.log(`
Part one: ${partOne()}
Part two: ${partTwo()}
`);
