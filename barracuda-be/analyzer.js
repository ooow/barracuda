export class Analyzer {

  constructor(arr = []) {
    this.arr = arr;
  }

  run() {
    return this.arr.map(word => {
      return { word, isBad: this.isBadWord(word) };
    });
  }

  isBadWord(word) {
    return badWords.indexOf(word) !== -1;
  }
}

//TODO: Make this method smarter. Should split text by all punctuation marks.
export function splitText(text) {
  return text.split(' ');
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
