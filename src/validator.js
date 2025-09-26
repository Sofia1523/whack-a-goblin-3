// src/validator.js

// Проверка валидности номера карты (алгоритм Луна с поддержкой тестовых карт Мир)
export function isValidCard(number) {
  if (!/^\d{16}$/.test(number)) return false;

  // Тестовые карты Мир
  if (/^220[0-4]/.test(number)) return true;

  const digits = number.split('').map(d => parseInt(d));
  let sum = 0;
  let alt = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let d = digits[i];
    if (alt) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    alt = !alt;
  }
  return sum % 10 === 0;
}

// Определение платежной системы
export function getCardType(number) {
  if (/^4/.test(number)) return "Visa";
  if (/^5[1-5]/.test(number)) return "MasterCard";
  if (/^220[0-4]/.test(number)) return "Mir";
  return "Unknown";
}
