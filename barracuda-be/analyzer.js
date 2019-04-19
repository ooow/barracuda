// Interface.
export class Bit {
  constructor(data, type = 0) {
    this.data = data;
    this.type = type; // 0 is a word, 1 is a symbol.
  }
}

export class Analyzer {
  constructor(arr = []) {
    this.arr = arr;
  }

  run() {
    return this.arr.map(bit => {
      return { word: bit.data, isBad: this.isBadWord(bit.data) };
    });
  }

  isBadWord(word) {
    return badWords.indexOf(word) !== -1;
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
      res.push(new Bit(c, 1));
      word = '';
    }
  }
  if (word.length !== 0) {
    res.push(new Bit(word));
  }
  return res;
}

// Temporary base.
const badWords = [
  'ебать',
  'блядь',
  'хуй',
  'хер',
  'елда',
  'муде',
  'пизда',
  'манда',
  'дрочить',
  'залупа',
  'пидарас',
  'гандон',
  'малафья',
  'срать',
  'ссать',
  'пердеть',
  'дристать',
  'говно',
  'жопа',
  'целка',
  'курва',
];
