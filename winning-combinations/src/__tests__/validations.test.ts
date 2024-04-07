import { combinatorConfig } from "../definitions";
import { validateCombinatorConfig, validateSlotMachineLine } from "../validations";

test.each([
  [[1, 6, 6, 7, 2, 3], undefined, { isValid: true }],
  [
    [1, 6, 6, 7],
    "some parent context",
    {
      isValid: false,
      context: "some parent context",
      messages: ["The slot machine line must have size between 5 and 6"],
    },
  ],
  [
    [12, -8, 6, 10, 9, 10],
    undefined,
    {
      isValid: false,
      messages: [
        "The slot machine line contains unsupported symbols. Choices are: 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15",
      ],
    },
  ],
  [
    [12, 75, 40, -5, 56.6, 6, 6, 7],
    undefined,
    {
      isValid: false,
      messages: [
        "The slot machine line must have size between 5 and 6",
        "The slot machine line contains unsupported symbols. Choices are: 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15",
      ],
    },
  ],
])(`${validateSlotMachineLine.name} - validate line %j`, (line, context, expected) => {
  const received = validateSlotMachineLine(line, combinatorConfig, context);

  expect(received).toStrictEqual(expected);
});

test.each([
  [
    {
      wildSymbol: 0,
      nonPayingSymbols: [10, 11, 12, 13, 14, 15],
      payingSymbols: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      minCombinationLength: 3,
      slotMachineLine: {
        minLineLength: 5,
        maxLineLength: 6,
      },
    },
    undefined,
    { isValid: true },
  ],
  [
    {
      wildSymbol: 0,
      nonPayingSymbols: [10, 11, 12, 13, 14, 15],
      payingSymbols: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      minCombinationLength: 7,
      slotMachineLine: {
        minLineLength: 5,
        maxLineLength: 6,
      },
    },
    "whatever context",
    {
      isValid: false,
      context: "whatever context",
      messages: ["The minimum combination length cannot exceed the specified mininum slot machine line minimum length"],
    },
  ],
  [
    {
      wildSymbol: 0,
      nonPayingSymbols: [10, 11, 12, 13, 14, 15],
      payingSymbols: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      minCombinationLength: 3,
      slotMachineLine: {
        minLineLength: 7,
        maxLineLength: 6,
      },
    },
    undefined,
    {
      isValid: false,
      messages: ["The minimum slot machine line length cannot exceed the specified maximum length"],
    },
  ],
  [
    {
      wildSymbol: 0,
      nonPayingSymbols: [10, 11, 12, 13, 14, 15],
      payingSymbols: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      minCombinationLength: 4,
      slotMachineLine: {
        minLineLength: 3,
        maxLineLength: 2,
      },
    },
    undefined,
    {
      isValid: false,
      messages: [
        "The minimum slot machine line length cannot exceed the specified maximum length",
        "The minimum combination length cannot exceed the specified mininum slot machine line minimum length",
      ],
    },
  ],
])(`${validateCombinatorConfig.name} - validate config %j`, (config, context, expected) => {
  const received = validateCombinatorConfig(config, context);

  expect(received).toStrictEqual(expected);
});
