
const naughtyList = require('./naughty_list.js');
const parseGuess = require('../static/dice_parse_guess.js');


test.each(naughtyList.naughtyList)(
  '.parseGuess(%s) ',
  (naughtyword) => {
    expect(parseGuess(naughtyword)).toBe("invalid");
  },
);

test('Bad user input', () => {
  expect(parseGuess("abc")).toBe("invalid");
});

test('Outside range', () => {
  expect(parseGuess("-46657")).toBe("invalid");
  expect(parseGuess("46657")).toBe("invalid");
});


test('Valid user input', () => {
  expect(parseGuess("-46656")).toBe(-46656);
  expect(parseGuess("46656")).toBe(46656);
  expect(parseGuess("0")).toBe(0);
  expect(parseGuess("1")).toBe(1);
});
