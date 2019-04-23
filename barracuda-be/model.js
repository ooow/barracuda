import { updateStore } from './bad';

/** An interface for wrapping analyzed parts of the text. */
export class Bit {
  constructor(data, isWord = true, isBad = false) {
    this.data = data;
    this.isWord = isWord; // true is a word, false is a symbol.
    this.isBad = isBad;
  }

  static copy(bit) {
    return new Bit(bit.data, bit.isWord, bit.isBad);
  }
}

/** An interface for wrapping rate. */
export class Rate {
  constructor(rating, filteredBadWords) {
    this.rating = rating;
    this.filteredBadWords = filteredBadWords;
  }

  analyzeRate() {
    const count = Math.floor(Math.random() * this.filteredBadWords.length - 1);
    let counter = 0;
    for (let i = 0; i < count; i += 1) {
      if (updateStore(this.filteredBadWords[i])) {
        counter += 1;
      }
    }
    return counter;
  }

  static toObject(rate) {
    return new Rate(rate.rating, rate.filteredBadWords);
  }
}
