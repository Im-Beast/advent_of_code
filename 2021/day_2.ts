import { input } from "./day_2_input.ts";
import { printOutput } from "./util.ts";

function partOne(): number {
  const position = {
    horiz: 0,
    depth: 0,
  };

  for (const move of input) {
    const [command, am] = move.split(" ");
    const amount = Number(am);

    switch (command) {
      case "forward":
        position.horiz += amount;
        break;
      case "down":
        position.depth += amount;
        break;
      case "up":
        position.depth -= amount;
        break;
    }
  }

  return position.horiz * position.depth;
}

function partTwo(): number {
  const position = {
    horiz: 0,
    depth: 0,
    aim: 0,
  };

  for (const move of input) {
    const [command, am] = move.split(" ");
    const amount = Number(am);

    switch (command) {
      case "forward":
        position.horiz += amount;
        position.depth += position.aim * amount;
        break;
      case "down":
        position.aim += amount;

        break;
      case "up":
        position.aim -= amount;
        break;
    }
  }

  return position.horiz * position.depth;
}

printOutput(2, partOne(), partTwo());
