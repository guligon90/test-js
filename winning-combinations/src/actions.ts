import { combinatorConfig } from "./definitions";
import { extractNumericSequences, reduceWinningCombinations } from "./helpers";
import { WinningCombination, WinningCombinations } from "./types";

function sanitizeRegularCombinations(
  combinations: WinningCombinations,
  minCombinationLength: number,
): WinningCombinations {
  const sanitizedCombinations: WinningCombinations = [];

  for (const combination of combinations) {
    const [payingSymbol, sequence] = combination;
    const sanitized = extractNumericSequences(sequence).find((sequence) => sequence.length >= minCombinationLength);

    if (sanitized) {
      sanitizedCombinations.push([payingSymbol, sanitized]);
    }
  }

  return sanitizedCombinations;
}

function sanitizeWildCombinations(
  wildCombination: WinningCombination,
  combinations: WinningCombinations,
  wildSymbol: number,
  minCombinationLength: number,
): WinningCombinations {
  const filtered: WinningCombinations = combinations
    // Extract all combinations not mapped to the wild symbol.
    .filter((item) => item[0] !== wildSymbol);

  // Do the merge between the combinations of both paying and wild symbols, sorting them at the end
  const rawWildCombinations: WinningCombinations =
    filtered.length > 0
      ? filtered.map((item) => [item[0], [...wildCombination[1], ...item[1]].sort()])
      : combinations.map((item) => [wildSymbol, item[1]]);

  // Only the valid merged (sequential) combinations are extracted, i.e.
  // the ones whose size is greater than the mininum specified by the paying line
  return sanitizeRegularCombinations(rawWildCombinations, minCombinationLength);
}

export function extractWinningCombinations(line: number[]): WinningCombinations {
  const { minCombinationLength, payingSymbols, wildSymbol } = combinatorConfig;
  const allowedSymbols = [wildSymbol, ...payingSymbols];

  const combinations = allowedSymbols.reduce<WinningCombinations>(
    (acc, payingSymbol) => reduceWinningCombinations(acc, payingSymbol, line),
    [],
  );

  if (combinations.length > 0) {
    const wildCombination = combinations.find((item) => item[0] === wildSymbol);

    return wildCombination
      ? sanitizeWildCombinations(wildCombination, combinations, wildSymbol, minCombinationLength)
      : sanitizeRegularCombinations(combinations, minCombinationLength);
  }

  return [];
}
