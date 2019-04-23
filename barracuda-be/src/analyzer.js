import { badWords, updateStore } from './bad';
import { Bit } from './model';

const russianSymbol = /[а-я]/i;

const regExps = [
  /п+(и|е|ё)+(з|с)+д+/gi, // пизда*
  /([а-я])*б+и?л(я|е)+(д|т)?/gi, // бля*
  /([а-я])*х+у+(й|е|ё|и|я|ли[а-я]|э)/gi, // хуй*
  /(?:^|\W)((?:х|x|h|к|k|}{)\W*[уyu]\W*[йuyi])(?:$|\W)/ig, // хуй* v.2.0.
  /^(о|а)н(о|а)нист.*/,
  /^лошар.*/,
  /^к(а|о)злина$/,
  /^к(о|а)зел$/,
  /^сволоч(ь|ъ|и|уга|ам|ами).*/,
  /^лох[уеыаоэяию].*/,
  /.*урод(ы|у|ам|ина|ины).*/,
  /.*бля(т|д).*", ".*гандо.*/,
  /^м(а|о)нд(а|о).*/,
  /.*сперма.*/,
  /.*[уеыаоэяию]еб$/,
  /^сучк(а|у|и|е|ой|ай).*/,
  /^придур(ок|ки).*/,
  /^д(е|и)би(л|лы).*/,
  /^сос(ать|и|ешь|у)$/,
  /^залуп./,
  /^муд(е|ил|о|а|я|еб).*/,
  /.*шалав(а|ы|ам|е|ами).*/,
  /.*пр(а|о)ст(и|е)т(у|е)тк(а|и|ам|е|ами).*/,
  /.*шлюх(а|и|ам|е|ами).*/,
  /.*ху(й|и|я|е|л(и|е)).*/,
  /.*п(и|е|ы)зд.*/,
  /^бл(я|т|д).*/,
  /(с|сц)ук(а|о|и|у).*/,
  /^еб.*/,
  /.*(д(о|а)лб(о|а)|разъ|разь|за|вы|по)ебы*.*/,
  /.*пид(а|о|е)р.*/,
  /.*хер.*/,
];

/** Returns true if the word is not allowed by any of the reg exps. */
const badWordsReg = word => regExps.some(regexp => regexp.test(word));

/** Splits the text into words and symbols wrapped by Bit class. */
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

/** Marks the bit as bad when is contains a bad word. */
export function checkIsBad(bit) {
  // Do not check if the bit is not a word.
  if (!bit.isWord) {
    return bit;
  }
  const checkedBit = Bit.copy(bit);
  const word = bit.data.toLowerCase();

  // Check if the bit exist in base.
  if (badWords.has(word)) {
    checkedBit.isBad = true;
  }

  // Check if the bit allowed by the reg exps.
  if (badWordsReg(word)) {
    checkedBit.isBad = true;
    updateStore(word); // Tries to learn and save new words.
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
