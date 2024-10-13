// Elements
const helpSection = document.querySelector(".help-section");
const helpContent = document.getElementById("help-content");
const strategies = document.querySelectorAll(
  ".aggressive, .flexible, .protective"
);
const resultText = document.querySelector(".draw"); // Will update the result here
const overlay = document.getElementById("result-overlay"); // Overlay for result
const resultMessage = document.getElementById("result-message"); // Message in overlay

// Audio Elements for Sound Effects
const winSound = new Audio("sounds/win.mp3"); // Add the sound file paths
const loseSound = new Audio("sounds/lose.mp3");
const drawSound = new Audio("sounds/draw.mp3");

// Ensure we stop all sounds before playing new ones
function stopAllSounds() {
  winSound.pause();
  loseSound.pause();
  drawSound.pause();

  // Reset the audio to the start
  winSound.currentTime = 0;
  loseSound.currentTime = 0;
  drawSound.currentTime = 0;
}

// Strategy Relationships (Winning Logic)
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

// Handle User Selection of Strategy
strategies.forEach((strategy) => {
  strategy.addEventListener("click", function () {
    clearSelection();
    stopAllSounds(); // Stop any currently playing sounds
    const userStrategy = this.classList[0]; // Get class like 'aggressive'
    const opponentStrategy = getRandomStrategy();

    displayResult(userStrategy, opponentStrategy);
    this.classList.add("selected"); // Add highlight to the selected strategy
  });
});

// Display Game Result
function displayResult(userStrategy, opponentStrategy) {
  clearHighlights(); // Remove previous highlights

  const userElement = document.querySelector(`.${userStrategy}`);
  const opponentElement = document.querySelector(`.${opponentStrategy}`);

  let result;

  if (userStrategy === opponentStrategy) {
    resultText.textContent =
      "It's a Draw! Both chose " + capitalizeFirstLetter(userStrategy);
    resultText.style.color = "gray";
    userElement.classList.add("draw-highlight");
    opponentElement.classList.add("draw-highlight");
    drawSound.play(); // Play draw sound
    result = "It's a Draw!";
  } else if (strategyMap[userStrategy].winsAgainst === opponentStrategy) {
    resultText.textContent =
      "You Win! " +
      capitalizeFirstLetter(userStrategy) +
      " beats " +
      capitalizeFirstLetter(opponentStrategy);
    resultText.style.color = "green";
    userElement.classList.add("win-highlight");
    opponentElement.classList.add("lose-highlight");
    winSound.play(); // Play win sound
    result = "You Win!";
  } else {
    resultText.textContent =
      "You Lose! " +
      capitalizeFirstLetter(opponentStrategy) +
      " beats " +
      capitalizeFirstLetter(userStrategy);
    resultText.style.color = "red";
    userElement.classList.add("lose-highlight");
    opponentElement.classList.add("win-highlight");
    loseSound.play(); // Play lose sound
    result = "You Lose!";
  }

  // Show the overlay with the result
  showResultOverlay(result);
}

// Helper function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Clear previous selection
function clearSelection() {
  strategies.forEach((strategy) => strategy.classList.remove("selected"));
}

// Clear previous highlights
function clearHighlights() {
  strategies.forEach((strategy) => {
    strategy.classList.remove(
      "win-highlight",
      "lose-highlight",
      "draw-highlight"
    );
  });
}

// Function to show the result overlay
function showResultOverlay(message) {
  resultMessage.textContent = message; // Set the result message
  overlay.style.visibility = "visible"; // Make the overlay visible

  // Hide the game content temporarily
  document.querySelector("main").style.display = "none";
  document.querySelector(".help-section").style.display = "none";

  // After 3 seconds, hide the overlay and show the game content again
  setTimeout(() => {
    overlay.style.visibility = "hidden"; // Hide the overlay
    document.querySelector("main").style.display = "flex"; // Show game content again
    document.querySelector(".help-section").style.display = "flex";
  }, 5000); // Adjust the delay as needed
}
