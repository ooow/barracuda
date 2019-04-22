import { Bit } from './model';
import { badWords, badWordsReg } from './bad';

const russianSymbol = /[а-я]/i;

export class Analyzer {
  constructor(text = '') {
    this.arr = splitText(text);
  }

  run() {
    return this.arr.map(bit => {
      bit = checkIsBad(bit);
      return bit;
    });
  }
}

// Splits the text into words and symbols wrapped by Bit class.
export function splitText(text) {
  const res = [];

  let word = '';
  for (let c of text) {
    if (c.match(russianSymbol)) {
      word += c;
    } else {
      if (word.length !== 0) {
        res.push(new Bit(word));
      }
      res.push(new Bit(c, false));
      word = '';
    }
  }
  if (word.length !== 0) {
    res.push(new Bit(word));
  }
  return res;
}

// Marks the bit as bad when is contains a bad word.
export function checkIsBad(bit) {
  if (!bit.isWord) {
    return bit;
  }
  if (badWords.has(bit.data.toLowerCase())) {
    bit.isBad = true;
  }
  if (badWordsReg(bit.data.toLowerCase())) {
    bit.isBad = true;
  }
  return bit;
}

// Returns true if the word is exist in the base.
export function isBadWordExist(badWord) {
  return typeof badWord === 'string' && badWord.length > 1
    && badWords.has(badWord.toLowerCase());
}
