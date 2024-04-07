import { reduceWinningCombinations } from "../helpers";
import { CombinatorConfig, ValidationReport, WinningCombinations } from "../types";
import { validateCombinatorConfig, validateSlotMachineLine } from "../validations";
import { sanitizeWildCombinations, sanitizeRegularCombinations } from "./sanitizers";

/**
 * Generates a report concerning the validations of the winning combinations input parameters.
 * @param line number[] - The slot machine line.
 * @param config CombinatorConfig - An object containing the configurations to extract combinations.
 * @returns ValidationReport - The validation report.
 */
function validateInputs(line: number[], config: CombinatorConfig): ValidationReport {
  const configValidation = validateCombinatorConfig(config);
  const lineValidation = validateSlotMachineLine(line, config);
  const isValid = lineValidation.isValid && configValidation.isValid;

  return {
    isValid,
    context: extractWinningCombinations.name,
    ...(!isValid && {
      messages: [...lineValidation.messages!, ...configValidation.messages!],
    }),
  };
}

/**
 * This function receives a line from a slot machine, which might contain payable symbols.
 * It returns another list, containing the sanitized winning combinations, for the allowed paying symbols.
 * @param line number[] - The slot machine line.
 * @param config CombinatorConfig - An object containing the configurations to extract combinations.
 * @returns WinningCombinations | ValidationReport - The sanitized winning combinations of the validation report
 * if there is something wrong with the provided inputs.
 */
export function extractWinningCombinations(
  line: number[],
  config: CombinatorConfig,
): WinningCombinations | ValidationReport {
  const validationReport = validateInputs(line, config);

  if (!validationReport.isValid) {
    return validationReport;
  }

  const { minCombinationLength, payingSymbols, wildSymbol } = config;
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
