import { alertMessage } from "./alerts.js";

const chip10 = document.getElementById("chip-10");
const chip25 = document.getElementById("chip-25");
const chip50 = document.getElementById("chip-50");
const chip100 = document.getElementById("chip-100");
const betamount = document.querySelector("[data-bet-amount]");
const cardGameHome = document.getElementById("card__game-home");
const cardGameBoard = document.getElementById("card__game-board");
const btnStartGame = document.getElementById("btn-start-game");
const body = document.querySelector("body");

// funcion para seleccionar la apuesta
const selectBet = (chip) => {
  betamount.innerHTML = chip.dataset.value;
};

chip10.addEventListener("click", () => selectBet(chip10));
chip25.addEventListener("click", () => selectBet(chip25));
chip50.addEventListener("click", () => selectBet(chip50));
chip100.addEventListener("click", () => selectBet(chip100));

// funcion para iniciar el juego
const startGame = () => {
  if (betamount.innerHTML == 0) {
    alertMessage.fire({
      icon: "error",
      title: "Please select a bet amount!",
    });
  } else {
    cardGameHome.classList.add("d-none");
    cardGameBoard.classList.remove("d-none");
    body.classList.add("game-start");
  }
};

btnStartGame.addEventListener("click", startGame);

export { selectBet, startGame };
