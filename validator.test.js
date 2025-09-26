import { isValidCard, getCardType } from './validator.js';

test('valid Visa card', () => {
  expect(isValidCard('4111111111111111')).toBe(true);
  expect(getCardType('4111111111111111')).toBe('Visa');
});

test('valid MasterCard', () => {
  expect(isValidCard('5105105105105100')).toBe(true);
  expect(getCardType('5105105105105100')).toBe('MasterCard');
});

test('valid Mir card', () => {
  expect(isValidCard('2200123456789012')).toBe(true);
  expect(getCardType('2200123456789012')).toBe('Mir');
});

test('invalid card number', () => {
  expect(isValidCard('1234567890123456')).toBe(false);
  expect(getCardType('1234567890123456')).toBe('Unknown');
});
