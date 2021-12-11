import { input } from "./day_11_input.ts";
import { printOutput } from "./util.ts";

function simulate(
  unparsedOctos: string,
  untilAllFlash: boolean,
): [number, number];
function simulate(unparsedOctos: string, steps: number): [number, number];
function simulate(
  unparsedOctos: string,
  stepsOrUntillFlash: number | boolean,
): [number, number] {
  const dumboOctos = unparsedOctos.split("\n").map((x) =>
    x.split("").map(Number)
  );

  let totalFlashes = 0;
  let currFlashes = 0;
  let step = 0;

  while (
    typeof stepsOrUntillFlash === "number"
      ? --stepsOrUntillFlash >= 0
      : currFlashes !== dumboOctos.length * dumboOctos[0].length
  ) {
    ++step;
    currFlashes = 0;
    const flashed: [number, number][] = [];

    for (let x = 0; x < dumboOctos.length; ++x) {
      for (let y = 0; y < dumboOctos[0].length; ++y) {
        if (++dumboOctos[x][y] > 9) {
          flashed.push([x, y]);
        }
      }
    }

    while (flashed.length) {
      const pos = flashed.pop();
      if (!pos) break;

      const [sx, sy] = pos;

      ++currFlashes;

      for (let dx = -1; dx <= 1; ++dx) {
        for (let dy = -1; dy <= 1; ++dy) {
          const x = sx + dx;
          const y = sy + dy;

          if (typeof dumboOctos?.[x]?.[y] !== "number") continue;

          if (++dumboOctos[x][y] === 10) {
            flashed.push([x, y]);
          }
        }
      }
    }

    for (let x = 0; x < dumboOctos.length; ++x) {
      for (let y = 0; y < dumboOctos[0].length; ++y) {
        if (dumboOctos[x][y] > 9) {
          dumboOctos[x][y] = 0;
        }
      }
    }

    totalFlashes += currFlashes;
  }

  return [totalFlashes, step];
}

function partOne() {
  return simulate(input, 100)[0];
}

function partTwo() {
  return simulate(input, true)[1];
}

printOutput(11, partOne(), partTwo());
