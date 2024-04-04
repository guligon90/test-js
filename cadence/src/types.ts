export type AnticipatorConfig = {
  initialCadence?: number;
  columnSize: number;
  minToAnticipate: number;
  maxToAnticipate: number;
  anticipateCadence: number;
  defaultCadence: number;
};

export type SlotCoordinate = {
  column: number;
  row: number;
};

export type Round = {
  roundIndex: number;
  specialSymbols: Array<SlotCoordinate>;
};

export type Rounds = Array<Round>;

export type SlotCadence = Array<number>;
export type NumericSequence = Array<number>;

export type RoundCadence = {
  roundIndex: number;
  slotCadence: SlotCadence;
};

export type RoundsCadences = Array<RoundCadence>;
