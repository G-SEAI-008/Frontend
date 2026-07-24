const choiceBtns = document.querySelectorAll("#selection button");

const playBtn = document.querySelector("#play-button");
const resultDiv = document.querySelector("#result");
const userScore = document.querySelector("#user-score");
const computerScore = document.querySelector("#computer-score");

let playerChoice = "";
let playerWins = 0;
let compWins = 0;

for (const btn of choiceBtns) {
  btn.addEventListener("click", (e) => {
    playerChoice = e.target.id;
    for (const otherBtn of choiceBtns) {
      if (otherBtn.id !== playerChoice)
        otherBtn.classList.remove("border-black", "border-2");
    }
    e.target.classList.add("border-black", "border-2");
  });
}

const message = (playerChoice, compChoice, result) => {
  const resultMessage =
    result === "won"
      ? "You win!"
      : result === "lost"
        ? "You lose!"
        : "It's a draw!";
  return `You chose ${playerChoice}. Computer chose ${compChoice}. ${resultMessage}`;
};

playBtn.addEventListener("click", () => {
  if (!playerChoice) return alert("Make a selection!");
  const options = ["rock", "paper", "scissors"];
  const compChoice = options[Math.floor(Math.random() * options.length)];

  switch (true) {
    case playerChoice === "rock" && compChoice === "scissors":
    case playerChoice === "paper" && compChoice === "rock":
    case playerChoice === "scissors" && compChoice === "paper":
      resultDiv.textContent = message(playerChoice, compChoice, "won");
      playerWins++;
      userScore.textContent = playerWins;
      return;

    case playerChoice === "rock" && compChoice === "paper":
    case playerChoice === "paper" && compChoice === "scissors":
    case playerChoice === "scissors" && compChoice === "rock":
      resultDiv.textContent = message(playerChoice, compChoice, "lost");
      compWins++;
      computerScore.textContent = compWins;
      return;

    default:
      resultDiv.textContent = message(playerChoice, compChoice, "draw");
      return;
  }
});

// -----------------------
// ------Alternative------
// -----------------------

// // Select elements from DOM
// const userScoreElement = document.getElementById("user-score");
// const computerScoreElement = document.getElementById("computer-score");
// const resultElement = document.getElementById("result");
// const playButton = document.getElementById("play-button");
// const selectionButtons = document.querySelectorAll("#selection button");
// const rockButton = document.getElementById("rock");
// const paperButton = document.getElementById("paper");
// const scissorsButton = document.getElementById("scissors");

// // Variables for score and choice
// let userScore = 0;
// let computerScore = 0;
// let userChoice = "";
// const choices = ["rock", "paper", "scissors"];

// selectionButtons.forEach((el) =>
//   el.addEventListener("click", (e) => selectChoice(e.target.id)),
// );

// playButton.addEventListener("click", playRound);

// function selectChoice(choice) {
//   userChoice = choice;
//   selectionButtons.forEach((el) => {
//     if (el.id === choice) {
//       el.classList.add("line-through");
//     } else {
//       el.classList.remove("line-through");
//     }
//   });
// }

// function playRound() {
//   if (!userChoice) {
//     alert("Please select Rock, Paper, or Scissors!");
//     return;
//   }

//   const computerChoice = choices[Math.floor(Math.random() * choices.length)];
//   const result = determineWinner(userChoice, computerChoice);

//   resultElement.textContent = `You chose ${userChoice}. Computer chose ${computerChoice}. ${result.message}`;

//   if (result.winner === "user") {
//     userScore++;
//     userScoreElement.textContent = userScore;
//   } else if (result.winner === "computer") {
//     computerScore++;
//     computerScoreElement.textContent = computerScore;
//   }

//   userChoice = ""; // Reset user choice
//   selectionButtons.forEach((el) => el.classList.remove("line-through"));
// }

// function determineWinner(user, computer) {
//   if (user === computer) {
//     return { winner: "none", message: "It's a tie!" };
//   } else if (
//     (user === "rock" && computer === "scissors") ||
//     (user === "paper" && computer === "rock") ||
//     (user === "scissors" && computer === "paper")
//   ) {
//     return { winner: "user", message: "You win!" };
//   } else {
//     return { winner: "computer", message: "Computer wins!" };
//   }
// }
