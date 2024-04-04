import { generateRoundsCadences } from "../actions";

describe("unit testing for the cadence generation for the game round data", () => {
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
      rounds: [
        {
          roundIndex: 1,
          specialSymbols: [
            { column: 1, row: 2 },
            { column: 4, row: 3 },
          ],
        },
      ],
      expected: [
        {
          roundIndex: 1,
          slotCadence: [0, 1, 3, 5, 7, 8],
        },
      ],
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
      rounds: [
        {
          roundIndex: 1,
          specialSymbols: [
            { column: 0, row: 2 },
            { column: 1, row: 3 },
            { column: 3, row: 4 },
          ],
        },
        {
          roundIndex: 2,
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
      ],
      expected: [
        {
          roundIndex: 1,
          slotCadence: [0, 0.25, 2.25, 4.25, 4.5],
        },
        {
          roundIndex: 2,
          slotCadence: [0, 2, 4, 6, 8],
        },
        {
          roundIndex: 3,
          slotCadence: [0, 0.25, 0.5, 0.75, 1],
        },
      ],
    },
  ];

  test.each(testCases)(
    "game round should generate slot cadence sequences",
    ({ anticipationConfig, rounds, expected }) => {
      const received = generateRoundsCadences(rounds, anticipationConfig);

      expect(received).toStrictEqual(expected);
    },
  );
});
