const buttons = document.querySelectorAll('.button');
const startButton = document.getElementById('start-button');

let gameSequence = [];
let playerSequence = [];
let round = 1;

// Function to generate a random button press and add it to the game sequence
function addToSequence() {
  const colors = ['red', 'blue', 'green', 'yellow'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  gameSequence.push(randomColor);
}

// Function to play the current sequence of button presses
function playSequence() {
  let i = 0;
  const interval = setInterval(() => {
    if (i >= gameSequence.length) {
      clearInterval(interval);
      playerSequence = [];
      return;
    }
    flashButton(gameSequence[i]);
    i++;
  }, 1000);
}

// Function to flash a button by changing its opacity
function flashButton(color) {
  const button = document.getElementById(color);
  button.style.opacity = 0.5;
  setTimeout(() => {
    button.style.opacity = 1;
  }, 500);
}

// Event listener for button clicks
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const color = button.id;
    playerSequence.push(color);
    flashButton(color);

    if (playerSequence.length === gameSequence.length) {
      if (JSON.stringify(playerSequence) === JSON.stringify(gameSequence)) {
        // Player successfully repeated the sequence
        round++;
        setTimeout(() => {
          addToSequence();
          playSequence();
        }, 1000);
      } else {
        // Player made a mistake
        alert(`Game Over! You reached round ${round}.`);
        resetGame();
      }
    }
  });
});

// Event listener to start the game
startButton.addEventListener('click', () => {
  resetGame();
  startButton.disabled = true;
  addToSequence();
  playSequence();
});

// Function to reset the game
function resetGame() {
  gameSequence = [];
  playerSequence = [];
  round = 1;
  startButton.disabled = false;
}
