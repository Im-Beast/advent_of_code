import { input } from "./day_7_input.ts";
import { printOutput } from "./util.ts";

function partOne(): number {
  let leastFuel!: number;

  for (const possibleMove of input) {
    let fuel = 0;
    for (const position of input) {
      fuel += Math.abs(position - possibleMove);
    }

    if (!leastFuel || fuel < leastFuel) {
      leastFuel = fuel;
    }
  }

  return leastFuel;
}

function partTwo(): number {
  let leastFuel!: number;

  for (const possibleMove of input) {
    let fuel = 0;
    for (const position of input) {
      const delta = Math.abs(position - possibleMove);
      for (let i = delta; i > 0; --i) {
        fuel += i;
      }
    }

    if (!leastFuel || fuel < leastFuel) {
      leastFuel = fuel;
    }
  }

  return leastFuel;
}

printOutput(7, partOne(), partTwo());
