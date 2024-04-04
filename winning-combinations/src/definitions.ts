import { CombinatorConfig } from "./types";

/**
 * Combinator configuration. Has all information needed to check anticipator.
 * @param wildSymbol Symbol that makes the whole line payable.
 * @param nomPayingSymbols Symbols whose combinations don't generate payable lines.
 * @param payingSymbols Symbols whose combinations do generate payable lines.
 * @param minCombinationLength It's the minimum length for a winning combination.
 */
export const combinatorConfig: CombinatorConfig = {
  wildSymbol: 0,
  nonPayingSymbols: [10, 11, 12, 13, 14, 15],
  payingSymbols: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  minCombinationLength: 3,
};
