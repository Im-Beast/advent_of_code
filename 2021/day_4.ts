import { input } from "./day_4_input.ts";
import { printOutput } from "./util.ts";

const numbers = input[0].split(",").map(Number);

interface Bingo {
  numbers: number[];
  marked: number[];
}

const bingos: Bingo[] = [];

let index = -1;
for (const value of input.slice(1)) {
  if (value === "\n" || value === "") {
    ++index;
    bingos[index] ||= {
      marked: [],
      numbers: [],
    };
    continue;
  }

  bingos[index].numbers.push(
    ...value.replace(/\s+/g, " ").replace(/^\s/, "").split(
      " ",
    ).map(Number),
  );
}

function hasWon({ marked }: Bingo): boolean {
  const stroke: boolean[] = Array(10).fill(true);

  for (let i = 0; i < 5; ++i) {
    // vertical
    if (!marked[i]) stroke[0] = false;
    if (!marked[i + 5]) stroke[1] = false;
    if (!marked[i + 10]) stroke[2] = false;
    if (!marked[i + 15]) stroke[3] = false;
    if (!marked[i + 20]) stroke[4] = false;
    // horizontal
    if (!marked[i * 5]) stroke[5] = false;
    if (!marked[(i * 5) + 1]) stroke[6] = false;
    if (!marked[(i * 5) + 2]) stroke[7] = false;
    if (!marked[(i * 5) + 3]) stroke[8] = false;
    if (!marked[(i * 5) + 4]) stroke[9] = false;
  }

  return stroke.some((x) => x === true);
}

function partOne(): number {
  for (const calledNumber of numbers) {
    for (const bingo of bingos) {
      const index = bingo.numbers.indexOf(calledNumber);
      if (index === -1) continue;

      bingo.marked[index] = calledNumber;

      if (hasWon(bingo)) {
        const sum = bingo.numbers.reduce((a, b) => a + b);
        const markedSum = bingo.marked.reduce((a, b) => a + b);
        const unmarkedSum = sum - markedSum;

        return unmarkedSum * calledNumber;
      }
    }
  }
  return -1;
}

function partTwo(): number {
  const wonBingos = new Map<Bingo, number>();

  let lastWin!: Bingo;
  for (const number of numbers) {
    for (const bingo of bingos) {
      const index = bingo.numbers.indexOf(number);
      if (index === -1 || wonBingos.has(bingo)) continue;

      bingo.marked[index] = number;

      if (
        hasWon(bingo)
      ) {
        wonBingos.set(bingo, number);
        lastWin = bingo;
      }
    }
  }

  const calledNumber = wonBingos.get(lastWin);
  if (!calledNumber) {
    throw new Error(
      "Couldn't get correct answer. (couldn't get bingo that won)",
    );
  }

  const sum = lastWin.numbers.reduce((a, b) => a + b);
  const markedSum = lastWin.marked.reduce((a, b) => a + b);
  const unmarkedSum = sum - markedSum;

  return unmarkedSum * calledNumber;
}

printOutput(4, partOne(), partTwo());
