import { combinatorConfig } from "./definitions";
import { extractNumericSequences, reduceWinningCombinations } from "./helpers";
import { WinningCombination, WinningCombinations } from "./types";

/**
 * This function receives a list of raw payable combinations without wild symbols and a config parameter.
 * It returns another list, containing the sanitized winning combinations, for the allowed paying symbols.
 * @param combinations WinningCombinations - Raw default paying combinations.
 * @param minCombinationLength number - Minimun length for a paying combination to be considered valid.
 * @returns WinningCombinations The sanitized winning combinations.
 */
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

/**
 * This function receives a list of raw payable combinations containing wild symbols and a config parameter.
 * It returns another list, containing the sanitized winning combinations, for the allowed paying symbols.
 * @param wildCombination WinningCombination - The wild combination within the set of extracted combinations.
 * @param combinations WinningCombinations - Raw defauilt paying combinations.
 * @param wildSymbol number - The supported wild symbol, which makes any line payable.
 * @param minCombinationLength number - Minimun length for a paying combination to be considered valid.
 * @returns WinningCombinations The sanitized winning combinations.
 */
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

/**
 * This function receives a line from a slot machine, which might contain payable symbols.
 * It returns another list, containing the sanitized winning combinations, for the allowed paying symbols.
 * @param line number[] - The slot machine line.
 * @returns WinningCombinations The sanitized winning combinations.
 */
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
