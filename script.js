const openRules = document.querySelector("#open-rules");
const closeRules = document.querySelector("#close-rules");
const rulesModal = document.querySelector("#rules-modal");

const choiceButtons = document.querySelectorAll("[data-choice]");
const choiceArea = document.querySelector("#choice-area");
const resultScreen = document.querySelector("#result-screen");

const playerResult = document.querySelector("#player-result");
const houseResult = document.querySelector("#house-result");
const resultMessage = document.querySelector("#result-message");
const playAgainButton = document.querySelector("#play-again");
const scoreText = document.querySelector("#score");

const choices = ["rock", "paper", "scissors"];

const beats = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

let score = 12;

openRules.addEventListener("click", function () {
  rulesModal.classList.remove("hidden");
  rulesModal.classList.add("flex");
});

closeRules.addEventListener("click", function () {
  rulesModal.classList.add("hidden");
  rulesModal.classList.remove("flex");
});

function createChoice(choice, isWinner = false) {
  const colors = {
    rock: "bg-[#526ff4]",
    paper: "bg-[#df3151]",
    scissors: "bg-[#eca10a]",
  };

  const choiceElement = document.createElement("div");

  choiceElement.className = `
    grid h-48 w-48 place-items-center rounded-full p-6
    sm:h-[300px] sm:w-[300px] sm:p-8
    ${colors[choice]}
    ${
      isWinner
        ? "shadow-[0_0_0_24px_rgba(255,255,255,0.05),0_0_0_48px_rgba(255,255,255,0.04),0_0_0_72px_rgba(255,255,255,0.03)]"
        : ""
    }
  `;

  choiceElement.innerHTML = `
    <span class="grid h-full w-full place-items-center rounded-full bg-gray-100">
      <img
        src="./images/icon-${choice}.svg"
        alt="${choice}"
        class="h-16 w-16 sm:h-24 sm:w-24"
      />
    </span>
  `;

  return choiceElement;
}

choiceButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const playerChoice = button.dataset.choice;

    const randomIndex = Math.floor(Math.random() * choices.length);
    const houseChoice = choices[randomIndex];

    let result;

    if (playerChoice === houseChoice) {
      result = "DRAW";
    } else if (beats[playerChoice] === houseChoice) {
      result = "YOU WIN";
      score++;
    } else {
      result = "YOU LOSE";
      score = Math.max(0, score - 1);
    }

    scoreText.textContent = score;
    resultMessage.textContent = result;

    playerResult.replaceChildren(
      createChoice(playerChoice, result === "YOU WIN"),
    );

    houseResult.replaceChildren(
      createChoice(houseChoice, result === "YOU LOSE"),
    );

    choiceArea.classList.add("hidden");
    resultScreen.classList.remove("hidden");
    resultScreen.classList.add("grid");

    console.log("You picked:", playerChoice);
    console.log("House picked:", houseChoice);
    console.log("Result:", result);
  });
});

playAgainButton.addEventListener("click", function () {
  resultScreen.classList.add("hidden");
  resultScreen.classList.remove("grid");

  choiceArea.classList.remove("hidden");

  playerResult.innerHTML = "";
  houseResult.innerHTML = "";
});

rulesModal.addEventListener("click", function (event) {
  if (event.target === rulesModal) {
    rulesModal.classList.add("hidden");
    rulesModal.classList.remove("flex");
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    rulesModal.classList.add("hidden");
    rulesModal.classList.remove("flex");
  }
});