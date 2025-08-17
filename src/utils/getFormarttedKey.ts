export function getFormarttedKey(key: string[]): string {
  let keyFormatted: string;
  if (key.length === 1) {
    const firstLetter = key[0][0];
    keyFormatted = firstLetter.toUpperCase() + key[0].slice(1);
  } else {
    const firstLetter1 = key[0][0];
    const firstLetter2 = key[1][0];

    keyFormatted = `${firstLetter1.toUpperCase() + key[0].slice(1)} ${
      firstLetter2.toUpperCase() + key[1].slice(1)
    }`;
  }

  return keyFormatted;
}
