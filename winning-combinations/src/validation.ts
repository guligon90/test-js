import { SequenceInstructions, WinningCombination, WinningCombinationsResult } from "./types";
import { combinatorConfig } from "./definitions";


export function performSequentialAnalysisOnArray(targetList: number[], delta: number = 1): SequenceInstructions {
  let violationCount = 0;
  let isAchievable = true;
  let comparisonValue: number | null = null;

  const violatingIndexList: number[] = [];

  targetList.every((value, idx, targetList) => {
    if (idx >= 1) {
      comparisonValue = comparisonValue ?? targetList[idx - 1];
			
			const orderFailureCondition = comparisonValue >= value;
			const stepFailureCondition = Math.abs(value - comparisonValue) > delta;

			if (orderFailureCondition || stepFailureCondition) {
        violatingIndexList.push(idx);
        ++violationCount;
      } else {
        comparisonValue = null;
      }

      isAchievable = (violationCount <= 1);
    }

    return isAchievable;
  });

	return {
		isAchievable,
		...( isAchievable && { violatingIndexList }),
	};
}

export function checkPayingSequencesOnLine(line: number[]): [number, number[]][] {
	const { minCombinationLength, payingSymbols, wildSymbol } = combinatorConfig;
  const allowedSybols = [ wildSymbol, ...payingSymbols ];

	return allowedSybols.reduce<[number, number[]][]>((acc, payingSymbol) => {
		const indexList: number[] = [];
		const rawIndexList = line.map((value, idx) => value === payingSymbol ? idx : -1).filter(idx => idx !== -1); 
	
		rawIndexList.forEach((value, idx, values) => {
			if (idx >= 1) {
				if (Math.abs(value - values[idx-1]) === 1) {
					indexList.push(values[idx-1]);
					indexList.push(value);
				}
			}
		})
		
		const indexes = [...new Set(indexList)];

		return indexes.length >= minCombinationLength ? [ ...acc, [payingSymbol, indexes]] : acc;		
  }, []);
}
