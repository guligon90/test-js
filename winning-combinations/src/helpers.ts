import { Primitive, WinningCombinations } from "./types";

export function isPositiveInteger(value: number): boolean {
  return Number.isInteger(value) && value > 0;
}

export function isNonNegativeInteger(value: number): boolean {
  return Number.isInteger(value) && value >= 0;
}

export function isSubSet<T extends Primitive>(subset: T[], superset: T[]): boolean {
  const set = (list: T[]): T[] => [...new Set(list)];

  return set(subset).every((item: T) => set(superset).includes(item));
}

/**
 * Function that extracts the indexes associated to the paying symbols from a slot machine line.
 * @param line number[] - The slot machine line. Example: [14, 2, 2, 2, 11, 3].
 * @param payingSymbol number - A supported paying symbol. Example: 2.
 * @returns number[] - List of paying symbols indexes. Example: [1, 2, 3].
 */
export function extractPayingSymbolsIndexes(line: number[], payingSymbol: number): number[] {
  return line.map((value, idx) => (value === payingSymbol ? idx : -1)).filter((idx) => idx !== -1);
}

/**
 * Function used by the sanitizer to associate a paying symbol to its list of indexes within the slot machine line.
 * @param reduced WinningCombinations - The accumulated paying combinations. Example: [[2, [1, 2, 3]]].
 * @param payingSymbol number - A supported paying symbol. Example: 2.
 * @param line number[] - The slot machine line. Example: [14, 2, 2, 2, 11, 3].
 * @returns WinningCombinations - Reduced payable combinations for a paying symbol.Example: [[2, [1, 2, 3]]].
 */
export function reduceWinningCombinations(
  reduced: WinningCombinations,
  payingSymbol: number,
  line: number[],
): WinningCombinations {
  const indexList = extractPayingSymbolsIndexes(line, payingSymbol);

  return indexList.length > 0 ? reduced.concat([[payingSymbol, indexList]]) : reduced;
}

/**
 * This function receives a pre-ordered numeric list.
 * It returns another list, containing all possible contiguous subarrays extracted from the original list.
 * @param list number[] - The pre-ordered numeric list. Example: [0.1, 0.2, 1, 2, 3, 13, 17].
 * @returns number[][] - List of all possible sequential subarrays. Example: [[0.1, 0.2], [1, 2, 3], [13], [17]]
 */
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

  // Build the index ranges, based on the extracted transition indexes.
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
