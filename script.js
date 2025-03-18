// Elements
const helpSection = document.querySelector(".help-section");
const helpContent = document.getElementById("help-content");
const strategies = document.querySelectorAll(".strategy");
const resultText = document.querySelector(".draw");
const overlay = document.getElementById("result-overlay");
const resultMessage = document.getElementById("result-message");

// Audio Elements for Sound Effects
const winSound = new Audio("sounds/win.mp3");
const loseSound = new Audio("sounds/lose.mp3");
const drawSound = new Audio("sounds/draw.mp3");

// Stop All Sounds
function stopAllSounds() {
  winSound.pause();
  loseSound.pause();
  drawSound.pause();

  winSound.currentTime = 0;
  loseSound.currentTime = 0;
  drawSound.currentTime = 0;
}

// Strategy Relationships
const strategyMap = {
  aggressive: { winsAgainst: "flexible", losesTo: "protective" },
  flexible: { winsAgainst: "protective", losesTo: "aggressive" },
  protective: { winsAgainst: "aggressive", losesTo: "flexible" },
};

// Toggle Help Section
helpSection.addEventListener("click", function () {
  helpContent.style.display =
    helpContent.style.display === "block" ? "none" : "block";
});

// Generate Random Strategy for Opponent
function getRandomStrategy() {
  const keys = Object.keys(strategyMap);
  return keys[Math.floor(Math.random() * keys.length)];
}

// Handle Strategy Selection
strategies.forEach((strategy) => {
  strategy.addEventListener("click", function () {
    clearSelection();
    stopAllSounds();
    const userStrategy = this.classList[1]; // Get the strategy class (aggressive, flexible, protective)
    const opponentStrategy = getRandomStrategy();

    displayResult(userStrategy, opponentStrategy);
    this.classList.add("selected");
  });
});

function displayResult(userStrategy, opponentStrategy) {
  clearHighlights();

  const userElement = document.querySelector(`.${userStrategy}`);
  const opponentElement = document.querySelector(`.${opponentStrategy}`);

  let result;

  if (userStrategy === opponentStrategy) {
    resultText.textContent =
      "It's a Draw! Both choose " + capitalizeFirstLetter(userStrategy);
    resultText.style.color = "gray";
    userElement.classList.add("draw-highlight");
    opponentElement.classList.add("draw-highlight");
    drawSound.play();
    result = "It's a Draw! Both choose " + capitalizeFirstLetter(userStrategy);

    // Style for draw
    resultMessage.textContent = result;
    resultMessage.style.color = "gray"; // Gray text for draw
    resultMessage.style.fontSize = "4rem";
    resultMessage.style.fontWeight = "bold";
    resultMessage.style.backgroundColor = "rgba(255, 255, 255, 0.9)"; // Light background
    resultMessage.style.padding = "20px";
    resultMessage.style.borderRadius = "10px";
    resultMessage.style.textShadow = "2px 2px 4px rgba(0, 0, 0, 0.5)";
  } else if (strategyMap[userStrategy].winsAgainst === opponentStrategy) {
    resultText.textContent =
      "You Win! " +
      capitalizeFirstLetter(userStrategy) +
      " beats " +
      capitalizeFirstLetter(opponentStrategy);
    resultText.style.color = "green";
    userElement.classList.add("win-highlight");
    opponentElement.classList.add("lose-highlight");
    winSound.play();
    result =
      "You Win! " +
      capitalizeFirstLetter(userStrategy) +
      " beats " +
      capitalizeFirstLetter(opponentStrategy);

    // Style for win
    resultMessage.textContent = result;
    resultMessage.style.color = "green"; // Green text for win
    resultMessage.style.fontSize = "4rem";
    resultMessage.style.fontWeight = "bold";
    resultMessage.style.backgroundColor = "rgba(0, 0, 0, 0.7)"; // Dark background
    resultMessage.style.padding = "20px";
    resultMessage.style.borderRadius = "10px";
    resultMessage.style.textShadow = "2px 2px 4px rgba(0, 0, 0, 0.5)";
  } else {
    resultText.textContent =
      "You Lose! " +
      capitalizeFirstLetter(opponentStrategy) +
      " beats " +
      capitalizeFirstLetter(userStrategy);
    resultText.style.color = "red";
    userElement.classList.add("lose-highlight");
    opponentElement.classList.add("win-highlight");
    loseSound.play();
    result =
      "You Lose! " +
      capitalizeFirstLetter(opponentStrategy) +
      " beats " +
      capitalizeFirstLetter(userStrategy);

    // Style for lose
    resultMessage.textContent = result;
    resultMessage.style.color = "red"; // Red text for lose
    resultMessage.style.fontSize = "4rem";
    resultMessage.style.fontWeight = "bold";
    resultMessage.style.backgroundColor = "rgba(0, 0, 0, 0.7)"; // Dark background
    resultMessage.style.padding = "20px";
    resultMessage.style.borderRadius = "10px";
    resultMessage.style.textShadow = "2px 2px 4px rgba(0, 0, 0, 0.5)";
  }

  showResultOverlay(result); // Show the result on the full page
}

// Helper Functions
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function clearSelection() {
  strategies.forEach((strategy) => strategy.classList.remove("selected"));
}

function clearHighlights() {
  strategies.forEach((strategy) => {
    strategy.classList.remove(
      "win-highlight",
      "lose-highlight",
      "draw-highlight"
    );
  });
}

function showResultOverlay(message) {
  resultMessage.textContent = message;
  overlay.style.display = "flex";

  setTimeout(() => {
    overlay.style.display = "none";
  }, 3000);
}
