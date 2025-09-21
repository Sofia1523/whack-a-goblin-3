// Возвращает случайный индекс 0..max-1, не равный prev (если возможно)
export function getRandomIndex(prev, max) {
    if (max <= 1) return 0;
    let idx;
    do {
      idx = Math.floor(Math.random() * max);
    } while (idx === prev);
    return idx;
  }
  