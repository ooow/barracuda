import { Bit } from './model';
import {badWords, badWordsReg} from './bad';

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
    if (c.match(/[а-я]/i)) {
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
