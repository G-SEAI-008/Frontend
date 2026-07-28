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

// Use the .map() method to iterate over each word
const pigLatinArray = phraseArray.map((word) => {
  // Rule 1: If the word starts with a vowel, add "way" to the end.
  // .some() checks if at least one element in the array passes the test.
  if (vowels.some((vowel) => word.toLowerCase().startsWith(vowel))) {
    return `${word}way`;
  }
  // Rule 2: If the word starts with a consonant.
  else if (consonants.some((con) => word.toLowerCase().startsWith(con))) {
    // Check if the word starts with a two-consonant cluster.
    if (consonants.some((con) => word.toLowerCase().charAt(1) === con)) {
      // Move the first two consonants to the end and add "ay".
      let pigWord = `${word.slice(2) + word.slice(0, 2)}ay`;
      // Convert the word to lowercase.
      pigWord = pigWord.toLowerCase();
      // This is a check to preserve the original capitalization.
      // The outer `if` condition already checked `word.toLowerCase()` to see if it starts with a consonant.
      // This check, `word.startsWith(con)`, is case-sensitive.
      // The `consonants` array only contains lowercase letters.
      // So, if the original `word` started with a capital letter (e.g., "Street"), `word.startsWith(con)` will always be false.
      // `!consonants.some(...)` will then be `true`, and we capitalize the new `pigWord`.
      // If the original word was lowercase (e.g., "street"), `word.startsWith(con)` will be true for 's', `!consonants.some(...)` will be false, and the word remains lowercase.
      if (!consonants.some((con) => word.startsWith(con))) {
        pigWord = pigWord.charAt(0).toUpperCase() + pigWord.slice(1);
      }
      return pigWord;
    }
    // Check if the word starts with a single consonant followed by a vowel.
    if (vowels.some((vowel) => word.toLowerCase().charAt(1) === vowel)) {
      let pigWord = `${word.slice(1) + word.charAt(0)}ay`;
      pigWord = pigWord.toLowerCase();
      if (!consonants.some((con) => word.startsWith(con))) {
        pigWord = pigWord.charAt(0).toUpperCase() + pigWord.slice(1);
      }
      return pigWord;
    }
    // If the word starts with a consonant but doesn't fit the rules above (e.g., contains symbols), return it as is.
    return word;
  }
  // Rule 3: If the word doesn't start with a letter (e.g., it's a number or symbol), return it unchanged.
  return word;
});

// Join the array of translated words back into a single string, separated by spaces.
console.log(pigLatinArray.join(' '));
