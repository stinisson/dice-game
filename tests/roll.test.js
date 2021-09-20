const naughtyList = require('./naughty_list.js');
const parseGuess = require('../static/dice.js');

test.each(naughtyList.naughtyList)(
  '.checkRoll(%s) ',
  (naughtyword) => {
    expect(parseGuess(naughtyword)).toBe(false);
  },
);

test('Bad user input', () => {
  expect(parseGuess("abc")).toBe(false);
});

test('Outside range', () => {
  expect(parseGuess("-46657")).toBe(false);
  expect(parseGuess("46657")).toBe(false);
});


test('Valid user input', () => {
  expect(parseGuess("-46656")).toBe(-46656);
  expect(parseGuess("46656")).toBe(46656);
  expect(parseGuess("0")).toBe(0);
  expect(parseGuess("1")).toBe(1);
});
