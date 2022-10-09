import "./change-language.js";

import { alertMessage } from "./alerts.js";
import { statisticsCounter, saveStatistics } from "./game-statistics.js";
import { restartPlayerScore } from "./local-storage-items.js";
import {
  restartGame,
  activeCards,
  gameEndConditionIntialCards,
} from "./game.js";

const betAmountContainer = document.querySelector(".bet-amount-container");
const betAmount = document.getElementById("bet-amount-home");
const betBalance = document.getElementById("bet-balance");
const cardGameBoard = document.getElementById("card__game-board");
const menuBtn = document.getElementById("menu-btn");
const helpBtn = document.getElementById("help-btn");
const chips = document.querySelectorAll(".chip");
const chipsContainer = document.querySelector(".chips-container");
const titleHome = document.querySelector(".title-home");
const btnsActionHome = document.querySelector(".btn-action-home");
const btnClearBet = document.getElementById("btn-clear");
const betChipContainer = document.querySelector(".bet-amount-center");
const gameBoardbtns = document.querySelector(".game-board__actions");
const btnRestartGame = document.getElementById("btn-restart-game");
const btnStartGame = document.getElementById("btn-start-game");
const btnDouble = document.getElementById("btn-double");
const scorePlayerCounter = document.getElementById("score-player");
const playerScoreContainer = document.querySelector(".player__score");
const dealerScoreContainer = document.querySelector(".dealer__score");
const scorePlayerContainer = document.querySelector(".player__score-counter");
const playerCardsContainer = document.querySelector(".player__cards");
const dealerCardsContainer = document.querySelector(".dealer__cards");
const languageChangeBtn = document.querySelector(".languaje-change-btn");

const fixDecimal = (number) => {
  return parseFloat(number.toFixed(2));
};

betBalance.innerHTML = fixDecimal(2000);
let restaureBetBalance = betBalance.innerHTML;

// guardamos el valor del balance en localstorage
const saveBalance = () => {
  localStorage.setItem("balance", betBalance.innerHTML);
};

const restoreBalance = () => {
  if (localStorage.getItem("balance")) {
    betBalance.innerHTML = localStorage.getItem("balance");
  }
};
restoreBalance();

const audioClick = new Audio("assets/audio/Switch_Click.mp3");
const audioChip = new Audio("assets/audio/Poker_Chip_Single.mp3");
const audioCard = new Audio("assets/audio/Card_Deal.mp3");

const audioCliclBtns = () => {
  audioClick.play();
};

const btnsclick = document.querySelectorAll(".btn-action-menu");
btnsclick.forEach((btn) => {
  btn.addEventListener("click", audioCliclBtns);
});

const moneyTotalWon = () => {
  const moneyWon = document.getElementById("money-won");
  moneyWon.innerHTML = fixDecimal(betBalance.innerHTML - restaureBetBalance);
};

const moneyTotalLost = () => {
  const moneyLost = document.getElementById("money-lost");
  moneyLost.innerHTML = fixDecimal(restaureBetBalance - betBalance.innerHTML);
};

// funcion para seleccionar la apuesta
const selectBet = (chip) => {
  betAmount.innerHTML =
    chip.getAttribute("data-value") * 1 + betAmount.innerHTML * 1; // 1 para convertir el string a numero
};

// variable para restaurar el valor de la apuesta
let restaureBetAmountContainer = betChipContainer.innerHTML;
let restaureBetAmount = betAmount.innerHTML;

// funcion para seleccionar la apuesta
const chip = document.querySelectorAll(".chip");
chip.forEach((chip) => {
  chip.addEventListener("click", () => {
    selectBet(chip);
    titleHome.classList.add("hidden");
    btnsActionHome.classList.add("visible");
    audioChip.play();
    saveBalance();
    restoreBalance();
    //agregamos la chip seleccionada al contenedor de apuesta
    chip.cloneNode(true).classList.add("chip-selected");
    betChipContainer.appendChild(chip.cloneNode(true));
    if (betAmount.innerHTML > betBalance.innerHTML * 1) {
      alertMessage.fire({
        icon: "error",
        title: "insufficient funds.",
      });
      betAmount.innerHTML = betBalance.innerHTML * 1;
      chips.forEach((chip) => {
        chip.style.pointerEvents = "none";
        // no seleccionar chips con el mouse
        chip.style.userSelect = "none";
      });
    }
    if (betBalance.innerHTML == 0 || betBalance.innerHTML < 0) {
      btnStartGame.classList.add("disabled");
      alertMessage.fire({
        timer: 3500,
        icon: "error",
        title:
          "Insufficient funds to play, please restart the game in the menu.",
      });
    }
  });
});

// funcion para limpiar la apuesta
btnClearBet.addEventListener("click", () => {
  audioClick.play();
  betChipContainer.innerHTML = restaureBetAmountContainer;
  setTimeout(() => {
    betAmount.innerHTML = restaureBetAmount;
  }, 0);
  titleHome.classList.remove("hidden");
  btnsActionHome.classList.remove("visible");
  chips.forEach((chip) => {
    chip.style.pointerEvents = "auto";
  });
});

// funcion para iniciar el juego, ocultar el menu y mostrar el tablero de juego
// en esta funcion se llama a la funcion para ir activando las cartas con la funcion activeCards
// las cartas se van activando intervalo de milisegundos para que se aprecie el efecto de que se van repartiendo
btnStartGame.addEventListener("click", () => {
  statisticsCounter("played"); // contador de partidas jugadas
  saveStatistics();
  audioClick.play();
  gameEndConditionIntialCards();
  setTimeout(() => {
    activeCards(0, playerCardsContainer);
  }, 600);
  setTimeout(() => {
    activeCards(0, dealerCardsContainer);
  }, 1300);
  setTimeout(() => {
    activeCards(1, playerCardsContainer);
    playerScoreContainer.classList.add("active");
  }, 2000);
  setTimeout(() => {
    activeCards(1, dealerCardsContainer);
  }, 2600);
  setTimeout(() => {
    gameBoardbtns.classList.add("visible");
  }, 2800);
  menuBtn.classList.add("hidden");
  languageChangeBtn.classList.add("hidden");
  helpBtn.classList.add("hidden");
  scorePlayerContainer.classList.add("hidden");
  btnsActionHome.classList.remove("visible");
  chipsContainer.classList.add("hidden");
  betAmountContainer.classList.add("start-game");
  betBalance.innerHTML = betBalance.innerHTML - betAmount.innerHTML;

  if (betAmount.innerHTML > betBalance.innerHTML * 1) {
    btnDouble.classList.add("disabled");
  } else {
    btnDouble.classList.remove("disabled");
  }

  saveBalance();
});

// funcion para reiniciar el juego
btnRestartGame.addEventListener("click", () => {
  audioClick.play();
  statisticsCounter("restart");
  saveStatistics();
  // menuBtn.classList.remove("hidden");
  btnStartGame.classList.remove("disabled");
  titleHome.classList.remove("hidden");
  chipsContainer.classList.remove("hidden");
  gameBoardbtns.classList.remove("visible");
  cardGameBoard.classList.add("d-none");
  betAmountContainer.classList.remove("start-game");
  betAmount.innerHTML = "";
  betChipContainer.innerHTML = restaureBetAmountContainer;
  betBalance.innerHTML = restaureBetBalance;
  btnsActionHome.classList.remove("visible");
  swal.fire({
    icon: "success",
    title: "Game restarted!",
    showConfirmButton: false,
    timerProgressBar: true,
    timer: 1500,
  });
  chips.forEach((chip) => {
    chip.style.pointerEvents = "auto";
  });
  saveBalance();
  restartPlayerScore();
});

// funcion para doblar la apuesta
const doubleBet = () => {
  audioClick.play();
  audioChip.play();
  let betAmountDouble = betAmount.innerHTML * 2;
  betAmount.innerHTML = betAmountDouble;
  betBalance.innerHTML = betBalance.innerHTML - betAmount.innerHTML;
  console.log({ betAmountDouble });
  btnDouble.classList.add("disabled");
  saveBalance();
};

// const betAllInn = () => {
//   audioChip.play();
//   betAmount.innerHTML = betBalance.innerHTML;
//   saveBalance();
// };

// btnStartGame.onmousedown = betAllInn;

const playerWinGame = () => {
  //le sumamos el 50% de la apuesta al balance cuando gana
  let win = betAmount.innerHTML * 2;
  betBalance.innerHTML = betBalance.innerHTML * 1 + win * 1;
  console.log({ win });
  setTimeout(() => {
    swal.fire({
      icon: "success",
      title: "♠️ You win + $" + win + " ♠️",
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 2000,
    });
  }, 600);

  saveBalance();
};

const drawEqualGame = () => {
  betBalance.innerHTML = betBalance.innerHTML * 1 + betAmount.innerHTML * 1;
  saveBalance();
};

const validatePlayerMoney = () => {
  if (betAmount.innerHTML > betBalance.innerHTML * 1) {
    betAmount.innerHTML = betBalance.innerHTML * 1;
  } else if (betBalance.innerHTML === 0 || betBalance.innerHTML < 0) {
    btnStartGame.classList.add("disabled");
    alertMessage.fire({
      timer: 3000,
      icon: "error",
      title: "Insufficient funds to play, please restart the game in the menu.",
    });
  }
};

const finishGame = () => {
  setTimeout(() => {
    audioChip.play();
    audioCard.play();
    btnsActionHome.classList.add("visible");
    btnStartGame.classList.remove("disabled");
    btnDouble.classList.remove("disabled");
    gameBoardbtns.classList.remove("visible");
    menuBtn.classList.remove("hidden");
    helpBtn.classList.remove("hidden");
    languageChangeBtn.classList.remove("hidden");
    scorePlayerContainer.classList.remove("hidden");
    chipsContainer.classList.remove("hidden");
    betAmountContainer.classList.remove("start-game");
    playerScoreContainer.classList.remove("active");
    dealerScoreContainer.classList.remove("active");
    chips.forEach((chip) => {
      chip.style.pointerEvents = "auto";
      chip.style.userSelect = "auto";
    });
    validatePlayerMoney();
    restartGame();
  }, 2700);
};

export {
  selectBet,
  restoreBalance,
  saveBalance,
  doubleBet,
  playerWinGame,
  finishGame,
  drawEqualGame,
  saveStatistics,
  statisticsCounter,
  moneyTotalWon,
  moneyTotalLost,
  validatePlayerMoney,
};
