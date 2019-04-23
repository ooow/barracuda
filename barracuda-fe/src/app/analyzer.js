const russianWord = /[^а-я]+/i;

/** Returns true if the word is russian. */
export default function validateWord(word) {
  return word.length > 1 && !russianWord.test(word);
}
