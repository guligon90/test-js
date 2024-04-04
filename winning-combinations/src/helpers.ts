import { WinningCombinations } from "./types";

export function extractPayingSymbolsIndexes(line: number[], payingSymbol: number): number[] {
  return line.map((value, idx) => (value === payingSymbol ? idx : -1)).filter((idx) => idx !== -1);
}

export function reduceWinningCombinations(reduced: WinningCombinations, payingSymbol: number, line: number[]) {
  const indexList = extractPayingSymbolsIndexes(line, payingSymbol);

  return indexList.length > 0 ? reduced.concat([[payingSymbol, indexList]]) : reduced;
}

export function extractNumericSequences(list: number[]): number[][] {
  const indexRanges: number[][] = [];
  const transitionIndexes: number[] = [];

  // Extracting the indexes from the original list
  // whenever a break in the numerical sequence occurs
  for (let i = 1; i < list.length; i++) {
    if (list[i] != list[i - 1] + 1) transitionIndexes.push(i);
  }

  // For constructing the sequence groups through
  // the transition indexes, the starting index is added here,
  transitionIndexes.unshift(0);

  // Build the index
  for (let j = 1; j < transitionIndexes.length; j++) {
    const bottomIndex = transitionIndexes[j - 1];
    const topIndex = transitionIndexes[j] - 1;

    if (topIndex - bottomIndex > 0) {
      // When we have a sequence with more than one element.
      indexRanges.push([bottomIndex, topIndex]);
    } else {
      // Degenerate sequence: one element.
      indexRanges.push([topIndex, topIndex]);
    }
  }

  // Account for the final index range
  indexRanges.push([transitionIndexes[transitionIndexes.length - 1], list.length - 1]);

  // Do the slicing of the original list into sequential groups
  return indexRanges.map((range) => {
    const [start, end] = range;

    return start === end ? [list[start]] : list.slice(start, end + 1);
  });
}
