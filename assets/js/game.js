import "./home.js";
import * as underscore from "./underscore-min.js";
import { alertMessage } from "./alerts.js";
import { doubleBet } from "./home.js";

// Referencias del HTML
const btnHit = document.getElementById("btn-hit");
const btnStand = document.getElementById("btn-stand");
const btnDouble = document.getElementById("btn-double");
const playerScoreContainer = document.querySelector(".player__score");
const dealerScoreContainer = document.querySelector(".dealer__score");
const playerScore = document.getElementById("player-score");
const dealerScore = document.getElementById("dealer-score");
const gameBoardbtns = document.querySelector(".game-board__actions");
const playerCardsContainer = document.querySelector(".player__cards");
const dealerCardsContainer = document.querySelector(".dealer__cards");

let deck = [];

const typesofCards = ["C", "D", "H", "S"];
const letterSpecials = ["A", "J", "Q", "K"];

let playerPoints = 0;
let dealerPoints = 0;

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
  console.log(deck);
  return deck; // Retornamos el deck
};

// Esta función me permite tomar una carta
const takeCard = () => {
  const card = deck.pop();
  if (deck.length === 0) {
    alertMessage.fire({
      icon: "error",
      title: "No cards left in the deck.",
    });
  }
  //   console.log({card});
  return card;
};

const audioCard = new Audio("assets/audio/Card_Deal.mp3");
const audioClick = new Audio("assets/audio/Switch_Click.mp3");

btnHit.addEventListener("click", () => {
  audioClick.play();
  // Al hacer click en el botón de HIT se ejecuta esta función que toma una carta
  createPlayerCard();
  if (playerPoints > 21) {
    setTimeout(() => {
      swal.fire({
        icon: "error",
        title: "You lost",
      });
    }, 700);
    playerScoreContainer.classList.add("bg-danger");
    // gameBoardbtns.classList.remove("visible");
  } else if (playerPoints === 21) {
    setTimeout(() => {
      swal.fire({
        icon: "success",
        title: "You win",
      });
      disableButtons();
    }, 700);
    playerScoreContainer.classList.add("bg-success");
  } else {
    return;
  }
});

const playerWins = () => {
  const audioWin = new Audio("assets/audio/Win_Sound.mp3");
  audioWin.play();
  setTimeout(() => {
    swal.fire({
      icon: "success",
      title: "You win",
    });
    disableButtons();
  }, 700);
  playerScoreContainer.classList.add("bg-success");
};

const dealerWins = () => {
  const audioLose = new Audio("assets/audio/Lose_Sound.mp3");
  audioLose.play();
  setTimeout(() => {
    swal.fire({
      icon: "error",
      title: "You lost",
    });
    disableButtons();
  }, 700);
  playerScoreContainer.classList.add("bg-danger");
};

// Esta función me permite valorar una carta
const valueCard = (card) => {
  const value = card.substring(0, card.length - 1); // Obtenemos el valor de la carta
  return isNaN(value) ? (value === "A" ? 11 : 10) : value * 1; // Si el valor no es un número, entonces es una letra y le asignamos un valor, si es un número lo convertimos a un número
};

const disableButtons = () => {
  btnHit.classList.add("disabled");
  btnStand.classList.add("disabled");
  btnDouble.classList.add("disabled");
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
    cardImg.classList.add("active");
  }, 100);

  if (playerPoints > 21) {
    dealerWins();
  } else if (playerPoints === 21) {
    setTimeout(() => {
      swal.fire({
        icon: "success",
        title: "Blackjack",
      });
      disableButtons();
    }, 700);
    playerScoreContainer.classList.add("bg-success");
  } else {
    return;
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
    cardImg.classList.add("active");
  }, 100);

  if (dealerPoints === 21) {
    setTimeout(() => {
      swal.fire({
        icon: "error",
        title: "Dealer wins",
      });
      disableButtons();
    }, 700);
    dealerScoreContainer.classList.add("bg-success");
  } else {
    return;
  }
};

// esta funcion permite reemplazar la segundar carta del dealer por la carta boca abajo
const replaceDealerBackCard = () => {
  const cardImg = dealerCardsContainer.children[1];
  const cardImgBack = document.createElement("img");
  cardImgBack.src = `assets/cards/red_back-alt.png`;
  cardImg.parentNode.replaceChild(cardImgBack, cardImg);
  setTimeout(() => {
    cardImgBack.classList.add("active");
  }, 100);
};

const dealerTurn = () => {
  if (dealerPoints < 21 && dealerPoints < playerPoints) {
    createDealerCard();
    setTimeout(() => {
      dealerTurn();
    }, 1000);
  } else if (playerPoints > 21) {
    dealerWins();
    return;
  } else if (dealerPoints > 21) {
    playerWins();
    return;
  } else if (dealerPoints === 21) {
    dealerWins();
    return;
  } else if (dealerPoints > playerPoints) {
    dealerWins();
    return;
  } else if (dealerPoints < playerPoints) {
    playerWins();
    return;
  } else {
    setTimeout(() => {
      swal.fire({
        icon: "info",
        title: "Draw",
      });
      disableButtons();
    }, 700);
  }
};

// Esta funcion permite que el dealer tome su turno
btnStand.addEventListener("click", () => {
  audioClick.play();
  dealerTurn();
});

// Esta funcion permite doblar la apuesta
btnDouble.addEventListener("click", () => {
  audioClick.play();
  setTimeout(() => {
    doubleBet();
  }, 300);
  if (playerPoints < 21) {
    createPlayerCard();
    setTimeout(() => {
      dealerTurn();
    }, 1000);
    return;
  } else if (playerPoints > 21) {
    dealerWins();
    return;
  } else if (playerPoints == 21) {
    playerWins();
    return;
  } else if (playerPoints !== 21 && playerPoints < dealerPoints) {
    dealerWins();
    return;
  } else {
    return;
  }
});

export { createDeck, createPlayerCard, createDealerCard };
