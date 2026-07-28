// Pig Latin is a simple word game. The goal is to translate a sentence from English to Pig Latin.
// The rules are as follows:
// 1. If a word starts with a vowel (a, e, i, o, u), add "way" to the end of the word.
//    Example: "apple" becomes "appleway"
// 2. If a word starts with a single consonant, move that consonant to the end of the word and add "ay".
//    Example: "hello" becomes "ellohay"
// 3. If a word starts with two consonants, move both consonants to the end of the word and add "ay".
//    Example: "street" becomes "eetstray"
//

// console.log('Pig latin ran.');

// The first two elements are 'node' and the script path, so we slice them off.
const args = process.argv.slice(2);
// console.log(args[0]);

// This block checks if exactly one argument is provided.
if (args.length !== 1) {
  console.error('Please enter your phrase surrounded by quotes.');
  process.exit(1);
}

// Split the input phrase into an array of individual words.
const phraseArray = args[0].split(' ');
// console.log(phraseArray);

// An array of vowels to check against.
const vowels = ['a', 'e', 'i', 'o', 'u'];

// An array of consonants to check against.
const consonants = [
  'b',
  'c',
  'd',
  'f',
  'g',
  'h',
  'j',
  'k',
  'l',
  'm',
  'n',
  'p',
  'q',
  'r',
  's',
  't',
  'v',
  'w',
  'x',
  'y',
  'z',
];

// Use the .map() method to iterate over each word in the phraseArray and translate it.
const pigLatinArray = phraseArray.map((word) => {
  // Separate punctuation from the end of the word so it can be re-attached later.
  // This regex matches any characters that are NOT letters at the end of the string.
  const puncMatch = word.match(/[^a-zA-Z]+$/u);
  const punctuation = puncMatch ? puncMatch[0] : '';
  // The 'actualWord' is the original word with the punctuation stripped off.
  const actualWord = punctuation ? word.slice(0, -punctuation.length) : word;

  // If there's no actual word to translate (e.g., the "word" was just a comma),
  // return the punctuation as is.
  if (actualWord === '') {
    return punctuation;
  }

  let translatedWord = actualWord;

  // Rule 1: If the word starts with a vowel, add "way" to the end.
  if (vowels.some((vowel) => actualWord.toLowerCase().startsWith(vowel))) {
    translatedWord = `${actualWord}way`;
  }
  // Rule 2: If the word starts with a consonant.
  else if (consonants.some((con) => actualWord.toLowerCase().startsWith(con))) {
    // Check if the word starts with a two-consonant cluster.
    if (consonants.some((con) => actualWord.toLowerCase().charAt(1) === con)) {
      let pigWord = `${actualWord.slice(2) + actualWord.slice(0, 2)}ay`;
      pigWord = pigWord.toLowerCase();
      if (!consonants.some((con) => actualWord.startsWith(con))) {
        pigWord = pigWord.charAt(0).toUpperCase() + pigWord.slice(1);
      }
      translatedWord = pigWord;
    }
    // Check if the word starts with a single consonant followed by a vowel.
    else if (vowels.some((vowel) => actualWord.toLowerCase().charAt(1) === vowel)) {
      let pigWord = `${actualWord.slice(1) + actualWord.charAt(0)}ay`;
      pigWord = pigWord.toLowerCase();
      if (!consonants.some((con) => actualWord.startsWith(con))) {
        pigWord = pigWord.charAt(0).toUpperCase() + pigWord.slice(1);
      }
      translatedWord = pigWord;
    } else {
      // If it starts with consonants but doesn't fit the vowel rules (e.g. "rhythm"), return as is.
      translatedWord = actualWord;
    }
  }
  // Rule 3: If the word doesn't start with a letter (e.g., it's a number or symbol), return it unchanged.
  else {
    translatedWord = actualWord;
  }

  // Add the punctuation back to the end of the translated word.
  return translatedWord + punctuation;
});

// Join the array of translated words back into a single string, separated by spaces.
console.log(pigLatinArray.join(' '));
