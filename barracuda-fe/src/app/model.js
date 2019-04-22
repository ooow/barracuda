/** An interface for wrapping analyzed parts of the text. */
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

  toRightString() {
    if (this.isBad) {
      let hidedBadWord = '';
      for (let i = 0; i < this.data.length; i++) {
        hidedBadWord += '*';
      }
      return hidedBadWord;
    }
    return this.data;
  }
}

/** An interface for wrapping the checking result stats. */
export class Stats {
  constructor(filteredSymbols, badWordsFound, badWordsAdded = 0) {
    this.filteredSymbols = filteredSymbols;
    this.badWordsFound = badWordsFound;
    this.badWordsAdded = badWordsAdded;
  }
}
