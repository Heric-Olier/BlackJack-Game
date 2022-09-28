import { alertMessage } from "./alerts.js";

const body = document.querySelector("body");
const betAmountContainer = document.querySelector(".bet-amount-container");
const betAmount = document.getElementById("bet-amount");
const betAmountGame = document.querySelector("[data-bet-amount-game]");
const cardGameHome = document.getElementById("card__game-home");
const betBalance = document.getElementById("bet-balance");
const cardGameBoard = document.getElementById("card__game-board");
const menuBtn = document.getElementById("menu-btn");
const chips = document.querySelectorAll(".chip");

betBalance.innerHTML = 2000; 

// funcion para mostrar el menu
menuBtn.addEventListener("click", () => {
  const audio = new Audio("assets/audio/Switch_Click.mp3");
  audio.play();
});

// funcion para seleccionar la apuesta
const selectBet = (chip) => {
  betAmount.innerHTML =
    chip.getAttribute("data-value") * 1 + betAmount.innerHTML * 1; // 1 para convertir el string a numero
};

const chip = document.querySelectorAll(".chip");
chip.forEach((chip) => {
  chip.addEventListener("click", () => {
    const audio = new Audio("assets/audio/Poker_Chip_Single.mp3");
    audio.play();
    selectBet(chip);
    //agregamos la chip seleccionada al contenedor de apuesta
    chip.cloneNode(true).classList.add("chip-selected");
    betAmountContainer.appendChild(chip.cloneNode(true));

    if (betAmount.innerHTML > betBalance.innerHTML * 1) {
      // 1 para convertir el string a numero
      alertMessage.fire({
        icon: "error",
        title: "insufficient funds",
      });
      // bloqueamos el valor de la apuesta
      betAmount.innerHTML = betBalance.innerHTML;
      chips.forEach((chip) => {
        chip.style.pointerEvents = "none";
      });
      
    } else {
      chips.forEach((chip) => {
        chip.style.pointerEvents = "auto";
      });
    }
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
