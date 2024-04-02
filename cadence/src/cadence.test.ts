import { generateCadenceIncrementSequence, generateSymbolSumSequence, generateSlotCadenceSequence } from "./actions";

describe(`unit testing for the slot sequence generation action functions`, () => {
	const testCases = [
		{
			anticipationConfig: {
				initialCadence: 0,
				columnSize: 6,
				minToAnticipate: 1,
				maxToAnticipate: 2,
				anticipateCadence: 2,
				defaultCadence: 1,
			},
			symbols: [
				{ column: 1, row: 2 },
				{ column: 4, row: 3 },
			],
			expected: {
				symbolSums: [0, 1, 1, 1, 2, 2],
				cadenceIncrements: [1, 2, 2, 2, 1, 1],
				slotCadences: [0, 1, 3, 5, 7, 8],
			},
		},
		{
			anticipationConfig: {
				initialCadence: 0,
				columnSize: 5,
				minToAnticipate: 2,
				maxToAnticipate: 3,
				anticipateCadence: 2,
				defaultCadence: 0.25,
			},
			symbols: [
				{ column: 0, row: 2 },
				{ column: 1, row: 3 },
				{ column: 3, row: 4 },
			],
			expected: {
				symbolSums: [1, 2, 2, 3, 3],
				cadenceIncrements:  [0.25, 2, 2, 0.25, 0.25],
				slotCadences: [0, 0.25, 2.25, 4.25, 4.5],
			},
		},
		{
			anticipationConfig: {
				initialCadence: 0,
				columnSize: 5,
				minToAnticipate: 2,
				maxToAnticipate: 3,
				anticipateCadence: 2,
				defaultCadence: 0.25,
			},
			symbols: [
				{ column: 0, row: 2 },
				{ column: 0, row: 3 },
			],
			expected: {
				symbolSums: [2, 2, 2, 2, 2],
				cadenceIncrements:  [2, 2, 2, 2, 2],
				slotCadences: [0, 2, 4, 6, 8],
			},
		},
		{
			anticipationConfig: {
				initialCadence: 0,
				columnSize: 5,
				minToAnticipate: 2,
				maxToAnticipate: 3,
				anticipateCadence: 2,
				defaultCadence: 0.25,
			},
			symbols: [
				{ column: 4, row: 2 },
				{ column: 4, row: 3 },
			],
			expected: {
				symbolSums: [0, 0, 0, 0, 2],
				cadenceIncrements:  [0.25, 0.25, 0.25, 0.25, 2],
				slotCadences: [0, 0.25, 0.5, 0.75, 1],
			},
		},
	];

	test.each(testCases)
		("for anticipationConfig %j", ({ anticipationConfig, symbols, expected }) => {
			const receivedSums = generateSymbolSumSequence(symbols, anticipationConfig);
			const receivedIncrements = generateCadenceIncrementSequence(receivedSums, anticipationConfig);
			const receivedCadences = generateSlotCadenceSequence(symbols, anticipationConfig);

			expect(receivedSums).toStrictEqual(expected.symbolSums);
			expect(receivedIncrements).toStrictEqual(expected.cadenceIncrements);
			expect(receivedCadences).toStrictEqual(expected.slotCadences);
		});
});

