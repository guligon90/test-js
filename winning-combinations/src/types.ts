export type Primitive = string | number | symbol | boolean;
export type WinningCombination = [number, number[]];
export type WinningCombinations = WinningCombination[];

export type CombinatorConfig = {
  wildSymbol: number;
  nonPayingSymbols: number[];
  payingSymbols: number[];
  minCombinationLength: number;
};