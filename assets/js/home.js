import { alertMessage } from "./alerts.js";

const body = document.querySelector("body");
const betAmountContainer = document.querySelector(".bet-amount-container");
const betAmount = document.getElementById("bet-amount-home");
const betAmountGame = document.querySelector("[data-bet-amount-game]");
const cardGameHome = document.getElementById("card__game-home");
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

betBalance.innerHTML = 2000;

// funcion para mostrar el menu
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

const chip = document.querySelectorAll(".chip");
chip.forEach((chip) => {
  chip.addEventListener("click", () => {
    selectBet(chip);
    titleHome.classList.add("hidden");
    btnsActionHome.classList.add("visible");
    const audio = new Audio("assets/audio/Poker_Chip_Single.mp3");
    audio.play();
    //agregamos la chip seleccionada al contenedor de apuesta
    chip.cloneNode(true).classList.add("chip-selected");
    betChipContainer.appendChild(chip.cloneNode(true));
    if (betAmount.innerHTML > betBalance.innerHTML * 1) {
      alertMessage.fire({
        icon: "error",
        title: "insufficient funds",
      });
      betAmount.innerHTML = restaureBetAmount;
      chips.forEach((chip) => {
        chip.style.pointerEvents = "none";
      });
    } else {
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

// funcion para iniciar el juego
const btnStartGame = document.getElementById("btn-start-game");
btnStartGame.addEventListener("click", () => {
  audio.play();
  menuBtn.classList.add("hidden");
  btnsActionHome.classList.remove("visible");
  chipsContainer.classList.add("hidden");
  gameBoardbtns.classList.add("visible");
  cardGameBoard.classList.remove("d-none");
  betAmountContainer.classList.add("start-game");
  betBalance.innerHTML = betBalance.innerHTML - betAmount.innerHTML;
});


// // funcion para iniciar el juego
// const startGame = () => {
//   if (betAmount.innerHTML == 0) {
//     alertMessage.fire({
//       icon: "error",
//       title: "Please select a bet amount!",
//     });
//   } else {
//     betAmountGame.innerHTML = betAmount.innerHTML; // asigna el valor de la apuesta al juego
//     betBalance.innerHTML = betBalance.innerHTML - betAmount.innerHTML; // resta el valor de la apuesta al balance
//     cardGameHome.classList.add("d-none"); // oculta el home
//     cardGameBoard.classList.remove("d-none");
//     body.classList.add("game-start"); // agrega la clase para el fondo del juego
//   }
// };

// btnStartGame.addEventListener("click", startGame);

export { selectBet, btnStartGame };
