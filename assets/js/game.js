import "./home.js";
import * as underscore from "./underscore-min.js";
import { alertMessage } from "./alerts.js";

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

btnHit.addEventListener("click", () => {
  const audioCard = new Audio("assets/audio/Card_Deal.mp3");
  audioCard.play();
  // Al hacer click en el botón de HIT se ejecuta esta función que toma una carta
  createPlayerCard();
  if (playerPoints > 21) {
    setTimeout(() => {
      swal.fire({
        icon: "error",
        title: "You lost",
      });
    }, 500);
    playerScoreContainer.classList.add("bg-danger");
    // gameBoardbtns.classList.remove("visible");
  } else if (playerPoints === 21) {
    setTimeout(() => {
      swal.fire({
        icon: "success",
        title: "You win",
      });
      disableButtons();
    }, 500);
    playerScoreContainer.classList.add("bg-success");
  } else {
    return;
  }
});

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

  // playerCardsContainer.children[0].classList.add("active"); // Agregamos la clase active a la primera carta
  // playerCardsContainer.children[1].classList.add("active"); // Agregamos la clase active a la segunda carta
  console.log({ card });
};

// Esta función me permite crear una carta para el dealer
const createDealerCard = () => {
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
  console.log({ card });
};




export {
  createDeck,
  createPlayerCard,
  createDealerCard,
};
