import { alertMessage } from "./alerts.js";

const body = document.querySelector("body");
const chip10 = document.getElementById("chip-10");
const chip25 = document.getElementById("chip-25");
const chip50 = document.getElementById("chip-50");
const chip100 = document.getElementById("chip-100");
const chip250 = document.getElementById("chip-250");
const betAmount = document.querySelector("[data-bet-amount]");
const betAmountGame = document.querySelector("[data-bet-amount-game]");
const cardGameHome = document.getElementById("card__game-home");
const betBalance = document.querySelector("[data-bet-balance]");
const cardGameBoard = document.getElementById("card__game-board");
const menuBtn = document.getElementById("menu-btn");


// funcion para mostrar el menu
menuBtn.addEventListener("click", () => {
  const audio = new Audio("assets/audio/Switch_Click.mp3");
  audio.play();
});

// funcion para seleccionar la apuesta
const selectBet = (chip) => {
  betAmount.innerHTML = parseInt(betAmount.innerHTML) + parseInt(chip.dataset.value); // sumar el valor del chip al monto de la apuesta
};

const chip = document.querySelectorAll(".chip");
chip.forEach((chip) => {
  chip.addEventListener("click", () => {
    const audio = new Audio("assets/audio/Poker_Chip_Single.mp3");
    audio.play();
    selectBet(chip);
  });
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

export { selectBet };
