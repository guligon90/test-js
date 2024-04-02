import { AnticipatorConfig, RoundsCadences, Rounds, SlotCadence, SlotCoordinate } from "./types";

export function generateSymbolSumSequence(symbols: Array<SlotCoordinate>, config: AnticipatorConfig): number[] {
  const { columnSize } = config;
  const symbolsInColumn = (colIndex: number): number => symbols.filter((coords) => coords.column === colIndex).length;
  const sequence: number[] = [];
  
  let sum = 0;

  for (let j=0; j<columnSize; j++) {
    sum += symbolsInColumn(j);
    sequence.push(sum);
  }
  
  return sequence;
}

export function generateCadenceIncrementSequence(symbolSumSequence: number[], config: AnticipatorConfig): number[] {
  const {
    defaultCadence,
    anticipateCadence,
    minToAnticipate,
    maxToAnticipate,
  } = config;

  const incrementFromInterval = (symbolSum: number): number => (minToAnticipate <= symbolSum && symbolSum < maxToAnticipate)
    ? anticipateCadence
    : defaultCadence;

  return symbolSumSequence.map(sum => incrementFromInterval(sum));
}

/**
 * This function receives an array of coordinates relative to positions in the slot machine's matrix.
 * This array is the positions of the special symbols.
 * And it has to return a slot machine stop cadence.
 * @param symbols Array<SlotCoordinate> positions of the special symbols. Example: [{ column: 0, row: 2 }, { column: 2, row: 3 }]
 * @returns SlotCadence Array of numbers representing the slot machine stop cadence.
 */
export function generateSlotCadenceSequence(symbols: Array<SlotCoordinate>, config: AnticipatorConfig): SlotCadence {
  const symbolSums = generateSymbolSumSequence(symbols, config);
  const cadenceIncrements = generateCadenceIncrementSequence(symbolSums, config);
  const { initialCadence } = config;
  const sequence: SlotCadence = [];

  // Covers a more general case, when the cadence start with a non-zero value
  sequence[0] = initialCadence || 0;

  for (let j=1; j<cadenceIncrements.length; j++) {
    sequence[j] = sequence[j-1] + cadenceIncrements[j-1];
  }

  return sequence;
}

/**
 * Get all game rounds and return the final cadences of each.
 * @param rounds RoundsSymbols with contains all rounds special symbols positions.
 * @return RoundsCadences has all cadences for each game round.
 */
export function handleCadences(rounds: Rounds, config: AnticipatorConfig): RoundsCadences {
  return Object.values(rounds).map(round => {
    const { roundIndex, specialSymbols } = round;

    return {
      roundIndex,
      slotCadence: generateSlotCadenceSequence(specialSymbols, config)
    };
  });
}
