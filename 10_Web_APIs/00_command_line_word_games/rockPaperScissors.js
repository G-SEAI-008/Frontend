// The first two elements are 'node' and the name of the file, so we slice them off.
const args = process.argv.slice(2);

// We want to make sure the user only entered one option.
if (args.length !== 1) {
  console.error('Can only choose 1 option!');
  process.exit(1);
}
// We can now safely get the user's choice and make it lowercase.
const playerChoice = args[0].toLowerCase();

// We need to define the possible options for the game.
const options = ['rock', 'paper', 'scissors'];

// We need to make sure the user's choice is one of the valid options.
if (!options.some((opt) => opt === playerChoice)) {
  console.error('Must select rock, paper, or scissors!');
  process.exit(1);
}

// Now it's the computer's turn to make a choice.
// We can use Math.random() to get a random number between 0 and 2.
// We then use that number to select an option from the options array.
const compChoice = options[Math.floor(Math.random() * 3)];

// This is a helper function to create the message that will be displayed to the user.
const message = (playerChoice, compChoice, result) => {
  // We use a ternary operator to set the result message based on the result.
  const resultMessage =
    result === 'won' ? 'You win! :D' : result === 'lost' ? 'You lose! :(' : "It's a draw! :O";
  // We then return the full message.
  return `You chose ${playerChoice}. Computer chose ${compChoice}. ${resultMessage}`;
};

// This is the main logic of the game.
// We use a switch statement to check all the possible outcomes.
switch (true) {
  // These are the cases where the player wins.
  case playerChoice === 'rock' && compChoice === 'scissors':
  case playerChoice === 'paper' && compChoice === 'rock':
  case playerChoice === 'scissors' && compChoice === 'paper': {
    console.log(message(playerChoice, compChoice, 'won'));
    break;
  }

  // These are the cases where the player loses.
  case playerChoice === 'rock' && compChoice === 'paper':
  case playerChoice === 'paper' && compChoice === 'scissors':
  case playerChoice === 'scissors' && compChoice === 'rock': {
    console.log(message(playerChoice, compChoice, 'lost'));
    break;
  }

  // If none of the above cases are true, it must be a draw.
  default: {
    console.log(message(playerChoice, compChoice, 'draw'));
  }
}
