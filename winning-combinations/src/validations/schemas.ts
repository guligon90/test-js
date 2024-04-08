import { isPositiveInteger, isSubSet } from "../helpers";
import { CombinatorConfig, ValidationSchema } from "../types";

export function buildCombinatorConfigValidationSchema(config: CombinatorConfig): ValidationSchema {
  const {
    minCombinationLength,
    slotMachineLine: { minLineLength, maxLineLength },
  } = config;

  return [
    {
      condition: isPositiveInteger(minLineLength),
      errorMessage: "minLineLength must be a positive integer",
    },
    {
      condition: isPositiveInteger(maxLineLength),
      errorMessage: "maxLineLength must be a positive integer",
    },
    {
      condition: minLineLength < maxLineLength,
      errorMessage: "The minimum slot machine line length cannot exceed the specified maximum length",
    },
    {
      condition: minCombinationLength < minLineLength,
      errorMessage:
        "The minimum combination length cannot exceed the specified mininum slot machine line minimum length",
    },
  ];
}

export function buildSlotMachineLineValidationSchema(line: number[], config: CombinatorConfig): ValidationSchema {
  const {
    nonPayingSymbols,
    payingSymbols,
    wildSymbol,
    slotMachineLine: { minLineLength, maxLineLength },
  } = config;

  const supportedSymbols = [wildSymbol, ...payingSymbols, ...nonPayingSymbols];
  const rangeCondition = minLineLength <= line.length && line.length <= maxLineLength;
  const hasSupportedSymbols = isSubSet<number>(line, supportedSymbols);

  return [
    {
      condition: rangeCondition,
      errorMessage: `The slot machine line must have size between ${minLineLength} and ${maxLineLength}`,
    },
    {
      condition: hasSupportedSymbols,
      errorMessage: `The slot machine line contains unsupported symbols. Choices are: ${supportedSymbols.join(",")}`,
    },
  ];
}
