import { input } from "./day_12_input.ts";
import { printOutput } from "./util.ts";

const caves = new Map<string, string[]>();

for (const [a, b] of input) {
  if (a !== "start" && b !== "end") {
    caves.set(b, (caves.get(b) || []).concat(a));
  }
  if (a !== "end" && b !== "start") {
    caves.set(a, (caves.get(a) || []).concat(b));
  }
}

function partOne(): number {
  let pathCount = 0;
  const paths: string[][] = [["start"]];
  while (paths.length) {
    const previous = paths.pop();
    const currentIndex = previous?.at(-1);
    const currentNodes = caves?.get(currentIndex!);
    if (!previous || !currentIndex || !currentNodes) continue;

    for (const node of currentNodes) {
      if (node === "end") {
        ++pathCount;
      } else if (node.toUpperCase() === node || !previous?.includes(node)) {
        paths.push(previous.concat(node));
      }
    }
  }

  return pathCount;
}

function partTwo(): number {
  let pathCount = 0;
  const paths: [string[], boolean][] = [[["start"], true]];

  const smallCaves: {
    [node: string]: number;
  } = {};

  while (paths.length) {
    const [previous, visitedSmall] = paths.pop()!;

    const currentIndex = previous.at(-1)!;
    const currentNodes = caves.get(currentIndex!)!;

    for (const node of currentNodes) {
      if (node === "end") {
        ++pathCount;
      } else if (node.toUpperCase() === node || !previous?.includes(node)) {
        paths.push([previous.concat(node), visitedSmall]);
      } else if (visitedSmall) {
        smallCaves[node] ||= 1;
        ++smallCaves[node];
        paths.push([previous.concat(node), false]);
      }
    }
  }

  return pathCount;
}

printOutput(12, partOne(), partTwo());
