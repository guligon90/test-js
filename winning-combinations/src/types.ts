export type Primitive = boolean | number | string | never[] | null;
export type WinningCombination = [number, number[]];
export type WinningCombinations = WinningCombination[];

export type CombinatorConfig = {
  wildSymbol: number;
  nonPayingSymbols: number[];
  payingSymbols: number[];
  minCombinationLength: number;
  slotMachineLine: {
    minLineLength: number;
    maxLineLength: number;
  };
};

export type ValidationSchemaItem = {
  condition: boolean;
  errorMessage: string;
};

export type ValidationSchema = ValidationSchemaItem[];

export type ValidationParams = {
  schema: ValidationSchema;
  line?: number[];
  config?: CombinatorConfig;
  context?: string;
};

export type ValidationReport = {
  isValid: boolean;
  context?: string;
  messages?: string[];
};
