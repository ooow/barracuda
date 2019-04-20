// Interface.
export class Bit {
  constructor(data, isWord = true, isBad = false) {
    this.data = data;
    this.isWord = isWord; // true is a word, false is a symbol.
    this.isBad = isBad;
  }

  toString() {
    const bad = this.isBad ? 'bad' : 'common';
    const word = this.isWord ? 'russian word' : 'symbol';
    return `"${this.data}" is a ${bad} ${word}`;
  }
}
