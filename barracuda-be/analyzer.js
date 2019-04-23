import { badWords } from './bad';
import Bit from './model';

const russianSymbol = /[а-я]/i;

const regExps = [
  /п+(и|е|ё)+(з|с)+д+/gi, // пизда*
  /([а-я])*б+и?л(я|е)+(д|т)?/gi, // бля*
  /([а-я])*х+у+(й|е|ё|и|я|ли[а-я]|э)/gi, // хуй*
];

// Returns true if the word is not allowed by any of the reg exps.
const badWordsReg = word => regExps.some(regexp => regexp.test(word));

// Splits the text into words and symbols wrapped by Bit class.
export function splitText(text) {
  const res = [];

  let word = '';
  text.split('')
    .forEach((c) => {
      if (c.match(russianSymbol)) {
        word += c;
      } else {
        if (word.length !== 0) {
          res.push(new Bit(word)); // Push the russian word.
        }
        res.push(new Bit(c, false)); // Push other stuff.
        word = '';
      }
    });

  if (word.length !== 0) {
    res.push(new Bit(word));
  }
  return res;
}


// Marks the bit as bad when is contains a bad word.
export function checkIsBad(bit) {
  // Do not check if the bit is not a word.
  if (!bit.isWord) {
    return bit;
  }
  const checkedBit = Bit.copy(bit);

  // Check if the bit exist in base.
  if (badWords.has(bit.data.toLowerCase())) {
    checkedBit.isBad = true;
  }

  // Check if the bit allowed by the reg exps.
  if (badWordsReg(bit.data.toLowerCase())) {
    checkedBit.isBad = true;
  }
  return checkedBit;
}

export class Analyzer {
  constructor(text = '') {
    this.arr = splitText(text);
  }

  run() {
    return this.arr.map(bit => checkIsBad(bit));
  }
}

// Returns true if the word is exist in the base.
export function isBadWordExist(badWord) {
  return typeof badWord === 'string' && badWord.length > 1
    && badWords.has(badWord.toLowerCase());
}
