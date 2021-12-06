import { input } from "./day_6_input.ts";

function simulate(fishTimers: number[], days: number): number {
  const timers = Array(9).fill(0);

  for (const timer of fishTimers) {
    ++timers[timer];
  }

  while (--days >= 0) {
    const zeros = timers.shift();
    timers[6] += zeros;
    timers[8] ||= zeros;
  }

  return timers.reduce((a, b) => a + b);
}

function partOne(): number {
  return simulate(input, 80);
}

function partTwo(): number {
  return simulate(input, 256);
}

console.log(`
Part one: ${partOne()}
Part two: ${partTwo()}
`);
