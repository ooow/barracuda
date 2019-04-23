import { readFileSync, writeFileSync } from 'fs';

const store = 'bad.json';
const data = readFileSync(store);
export const badWords = new Set(JSON.parse(data));

/** Returns true if the word is exist in the base. */
export function isBadWordExist(badWord) {
  return typeof badWord === 'string' && badWord.length > 1
    && badWords.has(badWord.toLowerCase());
}

/** Tries to save new bad word. Returns true on success. */
export function updateStore(newWord) {
  if (!isBadWordExist(newWord)) {
    badWords.add(newWord.toLowerCase());
    writeFileSync(store, JSON.stringify([...badWords]));
    return true;
  }
  return false;
}

/** Tries to remove the word. Returns true on success. */
export function removeFromStore(word) {
  if (isBadWordExist(word)) {
    badWords.delete(word.toLowerCase());
    writeFileSync(store, JSON.stringify([...badWords]));
    return true;
  }
  return false;
}
