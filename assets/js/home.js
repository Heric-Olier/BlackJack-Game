import { alertMessage } from "./alerts.js";
import { createDeck, createPlayerCard, createDealerCard } from "./game.js";

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
const btnDouble = document.getElementById("btn-double");

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
  createDeck();
  setTimeout(() => {
    createPlayerCard();
    // playerScoreContainer.classList.add("active");
    playerScoreContainer.classList.add("active");
    audioCard.play();
  }, 600);
  setTimeout(() => {
    createDealerCard();
    dealerScoreContainer.classList.add("active");
    audioCard.play();
  }, 1300);
  setTimeout(() => {
    createPlayerCard();
    audioCard.play();
  }, 2000);
  setTimeout(() => {
    createDealerCard();
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

if (betAmount.innerHTML > betBalance.innerHTML * 1) {
  btnDouble.classList.add("disabled");
} else {
  btnDouble.classList.remove("disabled");
}

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

// funcion para doblar la apuesta
const doubleBet = () => {
  audio.play();
  createPlayerCard();
  //valor de la apuesta por 2 menos el valor de la ficha seleccionada
  betAmount.innerHTML = betAmount.innerHTML * 2;
  betBalance.innerHTML = betBalance.innerHTML - betAmount.innerHTML;
  btnDouble.classList.add("disabled");

  saveBalance();
};

export { selectBet, restoreBalance, saveBalance, doubleBet };
