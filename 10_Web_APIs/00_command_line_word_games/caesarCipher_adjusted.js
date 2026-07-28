// A Caesar Cipher is a simple method of encryption. It's a type of substitution cipher where each letter in the plaintext is shifted a certain number of places down or up the alphabet.
// For example, with a shift of 1, 'A' would be replaced by 'B', 'B' would become 'C', and so on.
// The script can both encode (shift forward) and decode (shift backward) a phrase.

// The first two elements are 'node' and the script path, so we slice them off.
const args = process.argv.slice(2);

// --- Argument Validation ---
// The script requires either 2 arguments (for encoding) or 3 arguments (for decoding).
if (args.length !== 2 && args.length !== 3) {
  console.error(
    'Please enter your phrase surrounded by quotes, followed by a number. If you want to decode,  write "decode" as a third argument.',
  );
  process.exit(1);
}

// The first argument is the phrase, which we split into an array of words.
const phraseArray = args[0].split(' ');
// The second argument is the shift number. Number() attempts to convert the entire string argument to a number.
const shift = Number(args[1]);

// It returns true only if the value is NaN.
if (Number.isNaN(shift)) {
  console.error('Second argument must be a number');
}

// If there are three arguments, the third one MUST be the word "decode".
if (args.length === 3 && args[2].toLowerCase() !== 'decode') {
  console.error('Third argument must say "decode"');
}

// The alphabet, which is the basis for our cipher.´
const alphabet = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

// --- Encoding Logic ---
// This block runs if only two arguments are provided (phrase and shift number).
if (args.length === 2) {
  // We map over each word in the phrase.
  const shiftedPhraseArray = phraseArray.map((word) => {
    // We split the word into an array of letters & convert all letters in lowercase.
    const wordArray = [...word.toLowerCase()];

    // We map over each letter to shift it.
    const shiftedWordArray = wordArray.map((letter) => {
      // First, find the index of the current letter in our alphabet array.
      const i = alphabet.indexOf(letter);

      // If the character is not in the alphabet, return it as is.
      if (i === -1) {
        return letter;
      }

      // Calculate the new index by adding the shift amount.
      const shiftedI = i + shift;

      // --- Alphabet Wrapping Logic ---
      // This logic handles cases where the shift goes past 'z' or before 'a'.
      if (shiftedI >= alphabet.length) {
        // If the new index is past the end of the alphabet, we wrap around to the beginning.
        // The modulo operator (%) gives us the remainder of a division.
        // For example, if the alphabet has 26 letters and our new index is 27, 27 % 26 is 1. So we get the letter at index 1 ('b').
        return alphabet[shiftedI % alphabet.length];
      } else if (shiftedI < 0) {
        // If the new index is negative, we wrap around to the end.
        return alphabet[alphabet.length + (shiftedI % alphabet.length)];
      }
      // If the new index is within the bounds of the alphabet, just return the letter at that index.
      return alphabet[shiftedI];
    });
    // Join the array of shifted letters back into a word.
    return shiftedWordArray.join('');
  });

  // Join the array of shifted words back into a full phrase and print it.
  console.log(shiftedPhraseArray.join(' '));
  process.exit(1);
}

// --- Decoding Logic ---
// This block runs if the third argument is "decode". The logic is the reverse of encoding.
const decodedPhraseArray = phraseArray.map((word) => {
  const wordArray = [...word.toLowerCase()];

  const decodedWordArray = wordArray.map((letter) => {
    const i = alphabet.indexOf(letter);

    // If the character is not in the alphabet, return it as is.
    if (i === -1) {
      return letter;
    }

    // Calculate the new index by SUBTRACTING the shift amount.
    const decodedI = i - shift;

    // --- Alphabet Wrapping Logic (for decoding) ---
    if (decodedI < 0) {
      // If the index is negative, wrap around to the end of the alphabet.
      // For example, with a shift of 3, 'b' (index 1) becomes -2.
      // -2 % 26 is -2.  26 + (-2) = 24, which is the index for 'y'.
      const newIndex = decodedI % alphabet.length;
      // In JS, the modulo of a negative number is negative, so we add the length to get a positive index.
      return alphabet[newIndex < 0 ? alphabet.length + newIndex : newIndex];
    }
    // If the index is positive, we can just use the modulo operator to handle wrapping past the end.
    return alphabet[decodedI % alphabet.length];
  });
  // Join the array of decoded letters back into a word.
  return decodedWordArray.join('');
});

// Join the array of decoded words back into a full phrase and print it.
console.log(decodedPhraseArray.join(' '));
