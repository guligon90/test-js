import { isSubSet, isNonNegativeInteger, extractNumericSequences } from "../helpers";
import { Primitive } from "../types";

test.each([
  [[], [[]]],
  [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]]],
  [
    [1, 2, 4, 5, 6, 8, 9, 10, 13, 14, 15, 16, 17, 21, 24, 27],
    [[1, 2], [4, 5, 6], [8, 9, 10], [13, 14, 15, 16, 17], [21], [24], [27]],
  ],
  [
    [5, 6, 7, 13, 21, 25, 26, 27, 28, 32, 45, 71, 72, 73, 101, 110, 121, 122, 123, 215],
    [[5, 6, 7], [13], [21], [25, 26, 27, 28], [32], [45], [71, 72, 73], [101], [110], [121, 122, 123], [215]],
  ],
  [
    [12, 45, 77, 145, 666],
    [[12], [45], [77], [145], [666]],
  ],
])(`${extractNumericSequences.name} - when list is %j returns %j`, (list, expected) => {
  const received = extractNumericSequences(list);

  expect(received).toEqual(expected);
});

test.each([
  [["A", "C"], ["B", "A", "C", "D"], true],
  [[2, 3, 3, 4], [2, 1, 1, 3, 4, 5], true],
  [[1, 4, 3, 7, 5], [2, 1, 1, 3, 4, 5], false],
  [[], [], true],
  [[], [25], true],
  [[14], [], false],
  [[0, 1], [true, false], false],
])(`${isSubSet.name} for a set %j and superset %j, it should return %j`, (set, superset, expected) => {
  const received = isSubSet<Primitive>(set, superset);

  expect(received).toStrictEqual(expected);
});

test.each([
  [12.345, false],
  [-0.7e-45, false],
  [1e16, true],
  [23, true],
])(`${isNonNegativeInteger.name} for input %j should return %j`, (value, expected) => {
  expect.assertions(1);

  expect(isNonNegativeInteger(value)).toStrictEqual(expected);
});
