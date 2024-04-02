import { AnticipatorConfig, RoundsCadences, Rounds } from "./types";

/**
 * Anticipator configuration. Has all information needed to check anticipator.
 * @param columnSize It's the number of columns the slot machine has.
 * @param minToAnticipate It's the minimum number of symbols to start anticipation.
 * @param maxToAnticipate It's the maximum number of symbols to end anticipation.
 * @param anticipateCadence It's the cadence value when has anticipation.
 * @param defaultCadence It's the cadence value when don't has anticipation.
 */
const anticipatorConfig: AnticipatorConfig = {
  initialCadence: 0,
  columnSize: 5,
  minToAnticipate: 2,
  maxToAnticipate: 3,
  anticipateCadence: 2,
  defaultCadence: 0.25,
  };
  
/**
 * Game rounds with special symbols position that must be used to generate the SlotCadences.
 */
const gameRounds: Rounds = [
  {
    roundIndex: 1,
    specialSymbols: [
      { column: 0, row: 2 },
      { column: 1, row: 3 },
      { column: 3, row: 4 },
    ],
  },
  {
    roundIndex: 1,
    specialSymbols: [
      { column: 0, row: 2 },
      { column: 0, row: 3 },
    ],
  },
  {
    roundIndex: 3,
    specialSymbols: [
      { column: 4, row: 2 },
      { column: 4, row: 3 },
    ],
  },
];


export { anticipatorConfig, gameRounds };
