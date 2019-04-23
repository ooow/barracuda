import { readFileSync, writeFileSync } from 'fs';

const store = 'bad.json';
const data = readFileSync(store);
export const badWords = new Set(JSON.parse(data));

export function updateStore(newWord) {
  badWords.add(newWord.toLowerCase());
  writeFileSync(store, JSON.stringify([...badWords]));
}

export function removeFromStore(word) {
  badWords.delete(word.toLowerCase());
  writeFileSync(store, JSON.stringify([...badWords]));
}
