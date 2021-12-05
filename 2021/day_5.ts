import { input } from "./day_5_input.ts";

const mapping: number[][] = [];

function getOverlaps(): number {
  let overlaps = 0;
  for (const x of mapping) {
    if (!x) continue;
    for (const y of x) {
      if (!y) continue;
      if (y > 1) ++overlaps;
    }
  }
  return overlaps;
}

function partOne(): number {
  for (const command of input) {
    const coords = command.split(" -> ");
    const [x1, y1] = coords[0].split(",").map(Number);
    const [x2, y2] = coords[1].split(",").map(Number);

    const startX = x1 < x2 ? x1 : x2;
    const endX = x1 < x2 ? x2 : x1;
    const startY = y1 < y2 ? y1 : y2;
    const endY = y1 < y2 ? y2 : y1;

    if (x1 === x2 || y1 === y2) {
      for (let x = startX; x <= endX; ++x) {
        for (let y = startY; y <= endY; ++y) {
          mapping[x] ||= [];
          mapping[x][y] ||= 0;
          ++mapping[x][y];
        }
      }
    }
  }

  return getOverlaps();
}

function partTwo(): number {
  // This function handles only diagonals, that's why
  if (!mapping.length) partOne();

  for (const command of input) {
    const coords = command.split(" -> ");
    const [x1, y1] = coords[0].split(",").map(Number);
    const [x2, y2] = coords[1].split(",").map(Number);

    const deltaX = x2 === x1 ? 0 : x2 < x1 ? -1 : 1;
    const deltaY = y2 === y1 ? 0 : y2 < y1 ? -1 : 1;

    for (
      let x = x1, y = y1;
      x !== x2 + deltaX && y !== y2 + deltaY;
      x += deltaX, y += deltaY
    ) {
      mapping[x] ||= [];
      mapping[x][y] ||= 0;
      ++mapping[x][y];
    }
  }

  return getOverlaps();
}

console.log(`
Part one: ${partOne()}
Part two: ${partTwo()}
`);
