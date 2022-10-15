const gamesPlayed = document.getElementById("games-played");
const gamesWon = document.getElementById("games-won");
const gamesLost = document.getElementById("games-lost");
const gamesDraw = document.getElementById("games-draw");
const gamesRestarts = document.getElementById("games-restart");

const statisticsCounter = (gameMode) => {
  switch (gameMode) {
    case "played":
      gamesPlayed.innerHTML = gamesPlayed.innerHTML * 1 + 1;
      break;
    case "win":
      gamesWon.innerHTML = gamesWon.innerHTML * 1 + 1;
      break;
    case "lost":
      gamesLost.innerHTML = gamesLost.innerHTML * 1 + 1;
      break;
    case "draw":
      gamesDraw.innerHTML = gamesDraw.innerHTML * 1 + 1;
      break;
    case "restart":
      gamesRestarts.innerHTML = gamesRestarts.innerHTML * 1 + 1;
      break;
  }
};

// guardar las estadisticas en localstorage
const saveStatistics = () => {
  localStorage.setItem("gamesPlayed", gamesPlayed.innerHTML);
  localStorage.setItem("gamesWon", gamesWon.innerHTML);
  localStorage.setItem("gamesLost", gamesLost.innerHTML);
  localStorage.setItem("gamesDraw", gamesDraw.innerHTML);
  localStorage.setItem("gamesRestarts", gamesRestarts.innerHTML);
};

const restoreStatistics = () => {
  if (localStorage.getItem("gamesPlayed")) {
    gamesPlayed.innerHTML = localStorage.getItem("gamesPlayed");
  }
  if (localStorage.getItem("gamesWon")) {
    gamesWon.innerHTML = localStorage.getItem("gamesWon");
  }
  if (localStorage.getItem("gamesLost")) {
    gamesLost.innerHTML = localStorage.getItem("gamesLost");
  }
  if (localStorage.getItem("gamesDraw")) {
    gamesDraw.innerHTML = localStorage.getItem("gamesDraw");
  }
  if (localStorage.getItem("gamesRestarts")) {
    gamesRestarts.innerHTML = localStorage.getItem("gamesRestarts");
  }

  // removemos el localstorage si el valor es NaN
  if (isNaN(gamesPlayed.innerHTML)) {
    localStorage.removeItem("gamesPlayed");
  }
  if (isNaN(gamesWon.innerHTML)) {
    localStorage.removeItem("gamesWon");
  }
  if (isNaN(gamesLost.innerHTML)) {
    localStorage.removeItem("gamesLost");
  }
  if (isNaN(gamesDraw.innerHTML)) {
    localStorage.removeItem("gamesDraw");
  }
  if (isNaN(gamesRestarts.innerHTML)) {
    localStorage.removeItem("gamesRestarts");
  }
};

restoreStatistics();

export { statisticsCounter, saveStatistics, restoreStatistics };
