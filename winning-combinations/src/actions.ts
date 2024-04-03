import { combinatorConfig } from "./definitions";
import { IndexMap, WinningCombinationsResult } from "./types";
import { performSequentialAnalysisOnArray } from "./validation";

export function extractSymbolIndexes(list: number[], symbolToSearch: number): number[] {
  return list
    .map((item, i) => item === symbolToSearch ? i : -1) // maps only indexes for matching symbols
    .filter(index => index !== -1); // filters away the "undefined" indexes
}

export function mapSymbolsToIndexes(lines: number[]): IndexMap {
  const { payingSymbols, wildSymbol } = combinatorConfig;
  const allowedSybols = [ wildSymbol, ...payingSymbols ];

  return allowedSybols.reduce<IndexMap>((map, payingSymbol) => {
    const indexes = extractSymbolIndexes(lines, payingSymbol);

    if (indexes.length) {
      map[payingSymbol] = map[payingSymbol] === undefined
        ? indexes // Initializes map for payingSymbol
        : [...map[payingSymbol], ...indexes]; // only updates existing data
    }

    return map;
  }, {});
}

export function extractWinningCombinations(lines: number[]): WinningCombinationsResult {
  const { minCombinationLength } = combinatorConfig;
  const payingLines = [];
  const mappedIndexes = mapSymbolsToIndexes(lines);

  for (const mapItem of Object.entries(mappedIndexes)) {
    const [payingSymbol, indexes] = mapItem;

    if (indexes.length >= minCombinationLength) {
      // const { isAchievable, violatingIndexList } = performSequentialAnalysisOnArray(indexes);

      // const sanitizedIndexList = isAchievable && violatingIndexList?.length
      //   ? [ ...violatingIndexList.map(idxToRemove => indexes.slice(0, idxToRemove).concat(indexes.slice(idxToRemove+1)))]
      //   : indexes;
      
      payingLines.push([parseInt(payingSymbol), indexes]);
    }
  }

  return payingLines;
}
