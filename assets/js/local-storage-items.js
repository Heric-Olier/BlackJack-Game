const highScore = document.getElementById("high-score");
const scorePlayerCounter = document.getElementById("score-player");

let playerScoreCounterValue = 0; // puntuacion del jugador
let maxAmountPlayerScoreCounter = 0; //puntuacion maxima del jugador

// guardamos la puntuacion maxima del jugador en localstorage
const saveMaxAmountPlayerScoreCounter = () => {
  localStorage.setItem(
    "maxAmountPlayerScoreCounter",
    maxAmountPlayerScoreCounter
  );
  playerScoreCounterValue = Number(playerScoreCounterValue) + 5;
  scorePlayerCounter.innerHTML = playerScoreCounterValue;
  savePlayerScore();
  if (playerScoreCounterValue > maxAmountPlayerScoreCounter) {
    maxAmountPlayerScoreCounter = playerScoreCounterValue;
    highScore.innerHTML = maxAmountPlayerScoreCounter;
  }
};

// restauramos la puntuacion maxima del jugador en localstorage
const restoreMaxAmountPlayerScoreCounter = () => {
  const btnResetHighScore = document.getElementById("reset-score");
  if (localStorage.getItem("maxAmountPlayerScoreCounter")) {
    maxAmountPlayerScoreCounter = localStorage.getItem(
      "maxAmountPlayerScoreCounter"
    );
    highScore.innerHTML = maxAmountPlayerScoreCounter;
  }
  btnResetHighScore.addEventListener("click", () => {
    localStorage.removeItem("maxAmountPlayerScoreCounter");
    maxAmountPlayerScoreCounter = 0;
  });
};

restoreMaxAmountPlayerScoreCounter();

// guardamos la puntuacion del jugador con cada victoria en localstorage
const savePlayerScore = () => {
  localStorage.setItem("playerScore", playerScoreCounterValue);
};

// restauramos la puntuacion del jugador con cada victoria en localstorage
const restorePlayerScore = () => {
  if (localStorage.getItem("playerScore")) {
    playerScoreCounterValue = localStorage.getItem("playerScore");
    scorePlayerCounter.innerHTML = playerScoreCounterValue;
  }
};
restorePlayerScore();

// esta funcion restaura los puntos del jugador (no la puntuacion maxima) cuando se reinicia el juego desde el boton de reiniciar juego
const restartPlayerScore = () => {
  playerScoreCounterValue = 0;
  scorePlayerCounter.innerHTML = playerScoreCounterValue;
  localStorage.removeItem("playerScore");
};

export { savePlayerScore, saveMaxAmountPlayerScoreCounter, restartPlayerScore };
