/** An interface for wrapping analyzed parts of the text. */
export default class Bit {
  constructor(data, isWord = true, isBad = false) {
    this.data = data;
    this.isWord = isWord; // true is a word, false is a symbol.
    this.isBad = isBad;
  }

  static copy(bit) {
    return new Bit(bit.data, bit.isWord, bit.isBad);
  }
}
