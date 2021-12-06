import { input } from "./day_3_input.ts";
import { printOutput } from "./util.ts";

function partOne(): number {
  const ones: number[] = [];
  const zeros: number[] = [];

  for (const bits of input) {
    for (const [i, bit] of bits.split("").entries()) {
      ones[i] ||= 0;
      zeros[i] ||= 0;

      if (bit === "1") {
        ++ones[i];
      } else {
        ++zeros[i];
      }
    }
  }

  let gammaRate = "";
  let epsilonRate = "";
  for (const num in ones) {
    gammaRate += ones[num] > zeros[num] ? "1" : "0";
    epsilonRate += ones[num] > zeros[num] ? "0" : "1";
  }

  return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);
}

function partTwo(): number {
  const getData = (reversed: boolean): number => {
    let array = [...input];

    for (let i = 0; array.length > 1; ++i) {
      const amounts = { "0": 0, "1": 0 };

      for (const bits of array) {
        ++amounts[bits[i] as "0" | "1"];
      }

      const common = amounts["1"] >= amounts["0"] ? "1" : "0";
      const filter = (value: string) =>
        reversed ? value[i] !== common : value[i] === common;
      if (array.some(filter)) {
        array = array.filter(filter);
      }
    }

    return parseInt(array[0], 2);
  };

  const oxygenGeneratorRating = getData(false);
  const co2ScrubberRating = getData(true);

  return oxygenGeneratorRating * co2ScrubberRating;
}

printOutput(3, partOne(), partTwo());
