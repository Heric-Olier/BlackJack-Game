import { alertMessage } from "./alerts.js";
import { createDeck, takeCard, valueCard, showPlayerPoints, showDealerPoints } from "./game.js";

const body = document.querySelector("body");
const betAmountContainer = document.querySelector(".bet-amount-container");
const betAmount = document.getElementById("bet-amount-home");
const betBalance = document.getElementById("bet-balance");
const cardGameBoard = document.getElementById("card__game-board");
const menuBtn = document.getElementById("menu-btn");
const chips = document.querySelectorAll(".chip");
const chipsContainer = document.querySelector(".chips-container");
const titleHome = document.querySelector(".title-home");
const btnsActionHome = document.querySelector(".btn-action-home");
const btnClearBet = document.getElementById("btn-clear");
const betChipContainer = document.querySelector(".bet-amount-center");
const gameBoardbtns = document.querySelector(".game-board__actions");
const btnRestartGame = document.getElementById("btn-restart-game");
const btnStartGame = document.getElementById("btn-start-game");

const playerCardFirstChild = document.querySelector(
  ".player__cards img:first-child"
);
const playerCardSecondChild = document.querySelector(
  ".player__cards img:nth-child(2)"
);
const dealerCardFirstChild = document.querySelector(
  ".dealer__cards img:first-child"
);
const dealerCardSecondChild = document.querySelector(
  ".dealer__cards img:nth-child(2)"
);
const playerScoreContainer = document.querySelector(".player__score");
const dealerScoreContainer = document.querySelector(".dealer__score");

betBalance.innerHTML = 2000;
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

const audio = new Audio("assets/audio/Switch_Click.mp3");
menuBtn.addEventListener("click", () => {
  audio.play();
});

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
    const audio = new Audio("assets/audio/Poker_Chip_Single.mp3");
    audio.play();
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
    if (betBalance.innerHTML == 0) {
      btnStartGame.classList.add("disabled");
      alertMessage.fire({
        timer: 6000,
        icon: "error",
        title:
          "Insufficient funds to play, please restart the game in the menu.",
      });
    }
  });
});

// funcion para limpiar la apuesta
btnClearBet.addEventListener("click", () => {
  audio.play();
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

const audioCard = new Audio("assets/audio/Card_Deal.mp3");

// funcion para iniciar el juego
btnStartGame.addEventListener("click", () => {
  audio.play();
  setTimeout(() => {
    console.log("player points");
    showPlayerPoints();
    playerCardFirstChild.classList.add("active");
    playerScoreContainer.classList.add("active");
    // dealerScoreContainer.classList.add("active");
    audioCard.play();
  }, 500);
  setTimeout(() => {
    console.log("dealer points");
    showDealerPoints();
    dealerCardFirstChild.classList.add("active");
    dealerScoreContainer.classList.add("active");
    audioCard.play();
  }, 1200);
  setTimeout(() => {
    console.log("player points");
    showPlayerPoints();
    playerCardSecondChild.classList.add("active");
    audioCard.play();
  }, 1900);
  setTimeout(() => {
    console.log("dealer points");
    showDealerPoints();
    dealerCardSecondChild.classList.add("active");
    audioCard.play();
  }, 2600);
  setTimeout(() => {
    gameBoardbtns.classList.add("visible");
  }, 2800);
  menuBtn.classList.add("hidden");
  btnsActionHome.classList.remove("visible");
  chipsContainer.classList.add("hidden");
  // cardGameBoard.classList.remove("d-none");
  betAmountContainer.classList.add("start-game");
  betBalance.innerHTML = betBalance.innerHTML - betAmount.innerHTML;

  saveBalance();
});

// funcion para reiniciar el juego
btnRestartGame.addEventListener("click", () => {
  audio.play();
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
});

export { selectBet, btnStartGame, restoreBalance, saveBalance };
