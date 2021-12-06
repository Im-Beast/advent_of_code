export function printOutput(day: number, part1: unknown, part2: unknown): void {
  console.log(
    `  \x1b[33mDay ${day}\x1b[0m\n   \x1b[36mPart one\x1b[0m \x1b[90m»\x1b[0m ${part1}\n   \x1b[36mPart two\x1b[0m \x1b[90m»\x1b[0m ${part2}`,
  );
}
