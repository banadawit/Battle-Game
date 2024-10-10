// Elements
const helpSection = document.querySelector(".help-section");
const helpContent = document.getElementById("help-content");
const strategies = document.querySelectorAll(
  ".aggressive, .flexible, .protective"
);
const resultText = document.querySelector(".draw"); // Will update the result here

// Strategy Relationships (Winning Logic)
const strategyMap = {
  aggressive: { winsAgainst: "flexible", losesTo: "protective" },
  flexible: { winsAgainst: "protective", losesTo: "aggressive" },
  protective: { winsAgainst: "aggressive", losesTo: "flexible" },
};

// Toggle Help Section
helpSection.addEventListener("click", function () {
  if (helpContent.style.display === "block") {
    helpContent.style.display = "none";
  } else {
    helpContent.style.display = "block";
  }
});

// Generate Random Strategy for Opponent
function getRandomStrategy() {
  const keys = Object.keys(strategyMap);
  return keys[Math.floor(Math.random() * keys.length)];
}

// Handle User Selection of Strategy
strategies.forEach((strategy) => {
  strategy.addEventListener("click", function () {
    const userStrategy = this.classList[0]; // Get class like 'aggressive'
    const opponentStrategy = getRandomStrategy();

    displayResult(userStrategy, opponentStrategy);
  });
});

// Display Game Result
function displayResult(userStrategy, opponentStrategy) {
  if (userStrategy === opponentStrategy) {
    resultText.textContent =
      "It's a Draw! Both chose " + capitalizeFirstLetter(userStrategy);
    resultText.style.color = "gray";
  } else if (strategyMap[userStrategy].winsAgainst === opponentStrategy) {
    resultText.textContent =
      "You Win! " +
      capitalizeFirstLetter(userStrategy) +
      " beats " +
      capitalizeFirstLetter(opponentStrategy);
    resultText.style.color = "green";
  } else {
    resultText.textContent =
      "You Lose! " +
      capitalizeFirstLetter(opponentStrategy) +
      " beats " +
      capitalizeFirstLetter(userStrategy);
    resultText.style.color = "red";
  }
}

// Helper function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
