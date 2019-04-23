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
  constructor(rating, badBits) {
    this.rating = rating;
    this.badBits = badBits;
  }

  analyzeRate() {
    const count = Math.floor(Math.random() * this.badBits.length - 1);
    let counter = 0;
    for (let i = 0; i < count; i += 1) {
      if (updateStore(this.badBits[i].data)) {
        counter += 1;
      }
    }
    return counter;
  }

  static copy(rate) {
    return new Rate(rate.rating, rate.badBits.map(b => Bit.copy(b)));
  }
}
