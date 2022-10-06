import "./home.js";
import * as underscore from "./underscore-min.js";
import { alertMessage } from "./alerts.js";
import { statisticsCounter, saveStatistics } from "./game-statistics.js";
import {
  doubleBet,
  drawEqualGame,
  finishGame,
  playerWinGame,
  moneyTotalWon,
  moneyTotalLost,
} from "./home.js";

// Referencias del HTML
const btnHit = document.getElementById("btn-hit");
const btnStand = document.getElementById("btn-stand");
const btnDouble = document.getElementById("btn-double");
const btnDeal = document.getElementById("btn-start-game");
const playerScoreContainer = document.querySelector(".player__score");
const dealerScoreContainer = document.querySelector(".dealer__score");
const playerScore = document.getElementById("player-score");
const dealerScore = document.getElementById("dealer-score");
const playerCardsContainer = document.querySelector(".player__cards");
const dealerCardsContainer = document.querySelector(".dealer__cards");
const scorePlayerCounter = document.getElementById("score-player");
const highScore = document.getElementById("high-score");

let deck = []; // Creamos un deck vacío
let playedCards = []; // Arreglo para guardar las cartas que se han jugado

const typesofCards = ["C", "D", "H", "S"];
const letterSpecials = ["A", "J", "Q", "K"];

let playerPoints = 0;
let dealerPoints = 0;
let playerScoreCounterValue = 0; // puntuacion del jugador
let maxAmountPlayerScoreCounter = 0; //puntuacion maxima del jugador

const saveMaxAmountPlayerScoreCounter = () => {
  localStorage.setItem(
    "maxAmountPlayerScoreCounter",
    maxAmountPlayerScoreCounter
  );
};

const restoreMaxAmountPlayerScoreCounter = () => {
  if (localStorage.getItem("maxAmountPlayerScoreCounter")) {
    maxAmountPlayerScoreCounter = localStorage.getItem(
      "maxAmountPlayerScoreCounter"
    );
    highScore.innerHTML = maxAmountPlayerScoreCounter;
  }
};

restoreMaxAmountPlayerScoreCounter();

export const savePlayerScore = () => {
  localStorage.setItem("playerScore", playerScoreCounterValue);
};

export const restorePlayerScore = () => {
  if (localStorage.getItem("playerScore")) {
    playerScoreCounterValue = localStorage.getItem("playerScore");
    scorePlayerCounter.innerHTML = playerScoreCounterValue;
  }
};
restorePlayerScore();

export const restartPlayerScore = () => {
  playerScoreCounterValue = 0;
  scorePlayerCounter.innerHTML = playerScoreCounterValue;
  localStorage.removeItem("playerScore");
};

// Esta función crea una nueva baraja
const createDeck = () => {
  deck = []; // Reiniciamos el deck

  for (let i = 2; i <= 10; i++) {
    // Creamos un ciclo for para crear los números del 2 al 10
    for (let type of typesofCards) {
      // Creamos un ciclo for para crear los tipos de cartas
      deck.push(i + type); // Agregamos el número y el tipo de carta al deck
    }
  }

  for (let type of typesofCards) {
    // Creamos un ciclo for para crear los tipos de cartas
    for (let special of letterSpecials) {
      // Creamos un ciclo for para crear las letras especiales
      deck.push(special + type); // Agregamos la letra especial y el tipo de carta al deck
    }
  }

  deck = _.shuffle(deck); // Barajamos el deck
  // console.log(deck);
  return deck; // Retornamos el deck
};

// Esta función me permite tomar una carta
const takeCard = () => {
  const card = deck.pop(); // Obtenemos la última carta del deck
  playedCards.push(card); // Agregamos la carta al arreglo de cartas jugadas
  if (deck.length === 0) {
    alertMessage.fire({
      icon: "error",
      title: "No cards left in the deck.",
    });
  }

  return card;
};

// Esta función me permite valorar una carta
const valueCard = (card) => {
  const value = card.substring(0, card.length - 1); // Obtenemos el valor de la carta
  return isNaN(value) ? (value === "A" ? 11 : 10) : value * 1; // Si el valor no es un número, entonces es una letra y le asignamos un valor, si es un número lo convertimos a un número
};

// Audios del juego
const audioCard = new Audio("assets/audio/Card_Deal.mp3");
const audioClick = new Audio("assets/audio/Switch_Click.mp3");
const audioWin = new Audio("assets/audio/Win_Sound.mp3");
const audioLose = new Audio("assets/audio/Lose_Sound.mp3");

// deshabilitar botones
const btnsDisabled = () => {
  btnHit.classList.add("disabled");
  btnStand.classList.add("disabled");
  btnDouble.classList.add("disabled");
};

// habilitar botones
const btnsEnabled = () => {
  btnHit.classList.remove("disabled");
  btnStand.classList.remove("disabled");
  btnDouble.classList.remove("disabled");
};

// Esta funcion termina el juego player gana
const playerWins = () => {
  dealerScoreContainer.classList.add("active");
  playerScoreCounterValue = Number(playerScoreCounterValue) + 5; // Suma 5 puntos al contador
  maxAmountPlayerScoreCounter = Number(maxAmountPlayerScoreCounter) + 5; // Suma 5 puntos al contador
  highScore.innerHTML = maxAmountPlayerScoreCounter;
  scorePlayerCounter.innerText = playerScoreCounterValue;
  moneyTotalWon();
  savePlayerScore();
  saveMaxAmountPlayerScoreCounter();
  statisticsCounter("win");
  saveStatistics();
  audioWin.play();
  btnsDisabled();
  playerWinGame();
  replaceCardBack(`assets/cards/${playedCards[3]}.png`);
  setTimeout(() => {
    finishGame();
  }, 800);
};

// Esta funcion termina el juego dealer gana
const dealerWins = () => {
  dealerScoreContainer.classList.add("active");
  audioLose.play();
  btnsDisabled();
  moneyTotalLost();
  statisticsCounter("lost");
  saveStatistics();
  replaceCardBack(`assets/cards/${playedCards[3]}.png`);
  setTimeout(() => {
    finishGame();
    swal.fire({
      icon: "error",
      title: "You lost",
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 2200,
    });
  }, 800);
};

// Esta función termina el juego si ambos jugadores empatan
const drawGame = () => {
  dealerScoreContainer.classList.add("active");
  audioLose.play();
  btnsDisabled();
  statisticsCounter("draw");
  saveStatistics();
  replaceCardBack(`assets/cards/${playedCards[3]}.png`);
  setTimeout(() => {
    drawEqualGame();
    finishGame();
    swal.fire({
      icon: "info",
      title: "Draw",
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 2200,
    });
  }, 800);
};

// Esta función me permite crear una carta para el jugador
const createPlayerCard = () => {
  audioCard.play();
  const card = takeCard();
  const cardValue = valueCard(card);
  playerPoints += cardValue;
  playerScore.innerText = playerPoints;
  const cardImg = document.createElement("img");
  cardImg.src = `assets/cards/${card}.png`;
  playerCardsContainer.append(cardImg);
  setTimeout(() => {
    cardImg.classList.add("hidden");
  }, 50);
  if (playerPoints === 21) {
    playerScoreCounterValue += 1 * 2 * 2;
    maxAmountPlayerScoreCounter = Number(maxAmountPlayerScoreCounter) + 5; // Suma 5 puntos al contador
    highScore.innerHTML = maxAmountPlayerScoreCounter;
    scorePlayerCounter.innerText = playerScoreCounterValue;
    saveMaxAmountPlayerScoreCounter();
    savePlayerScore();
    audioWin.play();
    btnsDisabled();
    playerWinGame();
    setTimeout(() => {
      finishGame();
    }, 800);
    // console.log("BLACKJACK - Player Wins - Player Create Card Section");
  } else if (playerPoints > 21) {
    audioLose.play();
    btnsDisabled();
    setTimeout(() => {
      finishGame();
      swal.fire({
        icon: "error",
        title: "You lost",
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 2200,
      });
    }, 800);
    // console.log("Dealer Wins - Player Create Card Section");
  }
};

// Esta función me permite crear una carta para el dealer
const createDealerCard = () => {
  audioCard.play();
  const card = takeCard();
  const cardValue = valueCard(card);
  dealerPoints += cardValue;
  dealerScore.innerText = dealerPoints;
  const cardImg = document.createElement("img");
  cardImg.src = `assets/cards/${card}.png`;
  dealerCardsContainer.append(cardImg);
  setTimeout(() => {
    cardImg.classList.add("hidden");
    replaceCardBack(`assets/cards/red_back-alt.png`);
  }, 50);
  if (dealerPoints === 21) {
    replaceCardBack(`assets/cards/${playedCards[3]}.png`);
    dealerWins();
    // console.log("Dealer Wins - Dealer Create Card Section");
    // } else if (dealerPoints > 21) {
    //   playerWins();
    //   console.log("Player Wins - Dealer Create Card Section");
  } else {
    return;
  }
};

// Esta función me permite reemplazar la carta de atrás por la carta del dealer
const replaceCardBack = (img) => {
  dealerCardsContainer.children[1].src = img;
};


// Esta funcion permite que el dealer tome su turno
const dealerTurn = () => {
  if (dealerPoints === 21) {
    dealerWins();
    console.log("Dealer Wins - Dealer Turn Section");
  }
  // creamos una funcion que se ejecute cada 1 segundo hasta que el dealer tenga 17 puntos o mas
  const interval = setInterval(() => {
    if (dealerPoints >= playerPoints && dealerPoints >= 17) {
      clearInterval(interval);
      replaceCardBack(`assets/cards/${playedCards[3]}.png`);
      if (dealerPoints > 21) {
        playerWins();
        // console.log("Player Wins - Dealer Turn Section");
      } else if (playerPoints < dealerPoints) {
        dealerWins();
        // console.log("Dealer Wins - Dealer Turn Section");
      } else if (dealerPoints < playerPoints) {
        playerWins();
        // console.log("Player Wins - Dealer Turn Section");
      } else {
        drawGame();
        // console.log("Draw - Dealer Turn Section");
      }
    } else {
      createDealerCard();
    }
  }, 800);
};

// Esta funcion permite reiniciar el juego
const restartGame = () => {
  playedCards = [];
  playerPoints = 0;
  dealerPoints = 0;
  playerScore.innerText = 0;
  dealerScore.innerText = 0;
  playerCardsContainer.classList.add("game-over");
  dealerCardsContainer.classList.add("game-over");
  console.clear();
  setTimeout(() => {
    btnsEnabled();
    playerCardsContainer.innerHTML = "";
    dealerCardsContainer.innerHTML = "";
    playerCardsContainer.classList.remove("game-over");
    dealerCardsContainer.classList.remove("game-over");
  }, 500);
};

//todo <--- botones listener --->

// Esta función me permite al player tomar una carta
btnHit.addEventListener("click", () => {
  audioClick.play();
  createPlayerCard();
  if (playerPoints > 21) {
    dealerWins();
    // console.log("Dealer Wins - Hit Button Section");
  } else if (playerPoints === 21) {
    playerWins();
    // console.log("Player Wins - Hit Button Section");
  } else {
    return;
  }
});

// Esta función me permite al player plantarse
btnStand.addEventListener("click", () => {
  replaceCardBack(`assets/cards/${playedCards[3]}.png`);
  setTimeout(() => {
    dealerScoreContainer.classList.add("active");
  }, 200);
  audioClick.play();

  if (playerPoints < dealerPoints) {
    dealerWins();
    // console.log("Dealer Wins - Stand Section");
  } else {
    dealerTurn();
  }
});

// Esta funcion permite doblar la apuesta
btnDouble.addEventListener("click", () => {
  audioClick.play();
  doubleBet();
  createPlayerCard();
  if (playerPoints > 21) {
    dealerWins();
    // console.log("Dealer Wins - Double Button Section");
  } else if (playerPoints === 21) {
    playerWins();
    // console.log("Player Wins - Double Button Section");
  } else {
    replaceCardBack(`assets/cards/${playedCards[3]}.png`);
    setTimeout(() => {
      dealerScoreContainer.classList.add("active");
    }, 200);
    dealerTurn();
  }
});

export { createDeck, createPlayerCard, createDealerCard, restartGame };
