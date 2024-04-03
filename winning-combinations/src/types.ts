export type IndexMap = {
    [payingSymbol: number]: number[];
}

export type SequenceInstructions = {
    isAchievable: boolean;
    violatingIndexList?: number[];
}

export type WinningCombination = {
    value: number;
    indexes: number[];
}

export type WinningCombinationsResult = (number | number[])[][]

export type CombinatorConfig = {
    wildSymbol: number;
    nonPayingSymbols: number[];
    payingSymbols: number[];
    minCombinationLength: number;
}
