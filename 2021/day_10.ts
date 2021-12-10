import { printOutput } from "./util.ts";
import { input } from "./day_10_input.ts";

const chars: { [char: string]: string } = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
};

const points: { [char: string]: number } = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

const points2: { [char: string]: number } = {
  "(": 1,
  "[": 2,
  "{": 3,
  "<": 4,
};

function partOne(): number {
  let score = 0;

  for (const line of input) {
    const opened: string[] = [];

    line:
    for (const char of line) {
      if (char in chars) {
        opened.push(char);
      } else if (char !== chars[opened.pop() as string][0]) {
        score += points[char] || 0;
        break line;
      }
    }
  }

  return score;
}

function partTwo(): number {
  const scores: number[] = [];

  input:
  for (const line of input) {
    const opened: string[] = [];

    for (const char of line) {
      if (char in chars) {
        opened.unshift(char);
      } else if (char !== chars[opened.shift() as string][0]) {
        continue input;
      }
    }

    scores.push(
      opened.reduce((score, char) => score * 5 + points2[char], 0),
    );
  }

  return scores.sort((a, b) => a - b)[~~(scores.length / 2)];
}

printOutput(10, partOne(), partTwo());
