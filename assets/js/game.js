import "./home.js";
import * as underscore from "./underscore-min.js";
import { alertMessage, alertLose } from "./alerts.js";
import { statisticsCounter, saveStatistics } from "./game-statistics.js";
import { btnsEnabled, btnsDisabled } from "./game-buttons-actions.js";
import { saveMaxAmountPlayerScoreCounter } from "./local-storage-items.js";
import {
  drawEqualGame,
  finishGame,
  playerWinGame,
  moneyTotalWon,
  moneyTotalLost,
  validatePlayerMoney,
} from "./home.js";

const dealerScoreContainer = document.querySelector(".dealer__score");
const playerScore = document.getElementById("player-score");
const dealerScore = document.getElementById("dealer-score");
const playerCardsContainer = document.querySelector(".player__cards");
const dealerCardsContainer = document.querySelector(".dealer__cards");
const betAmountCenter = document.querySelector(".bet-amount-center");

// Audios del juego
const audioCard = new Audio("assets/audio/Card_Deal.mp3");
const audioWin = new Audio("assets/audio/Win_Sound.mp3");
const audioLose = new Audio("assets/audio/Lose_Sound.mp3");

// llamamos la funcion para crear las cartas iniciales al recargar la pagina
window.addEventListener("load", () => {
  createCardsInitial();
});

// Creamos un deck vacío
let deck = [];

// Arreglo para guardar las cartas que se han jugado, esto nos sive para luego identificar la carta boca abajo del dealer,
// y luego reemplazarla por la carta boca arriba, ya que las cartas se eliminan del deck principal al ser jugadas y no se puede identificar
let playedCards = [];

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
  // console.log(deck);
  return deck; // Retornamos el deck
};

// Creamos la funcion para crear 2 cartas del jugador y 2 del dealer al recargar la pagina o al momento en que el juego se reinicia
// la idea es que las primeras 4 cartas se creen en el momento en que se recarga la pagina o se reinicia el juego
// las cartas siempre estan ocultas, solo se muestran cuando se inicia el juego, esto lo hacemos con la funcion activeCards
// en principio no lo habia implementado asi, pero me di cuenta que las cartas se demoraban en renderizar y se perdian un poco las animaciones
// por eso lo implemente de esta manera
const createCardsInitial = () => {
  createDeck();
  for (let i = 0; i < 2; i++) {
    createCard("player");
    createCard("dealer");
  }
  dealerCardsContainer.children[1].src = "./assets/cards/red_back-alt.png";
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

// Esta función me permite obtener el valor de la carta
const valueCard = (card) => {
  const value = card.substring(0, card.length - 1); // Obtenemos el valor de la carta
  return isNaN(value) ? (value === "A" ? 11 : 10) : value * 1; // Si el valor no es un número, entonces es una letra y le asignamos un valor, si es un número lo convertimos a un número
};

// Esta funcion me permite terminar y reiniciar el juego cuando el player gana o pierde o empata
// evaluando los diferentes casos se pueden ejecutar diferentes funciones
const finishGameCase = (winner = "player") => {
  switch (
    winner // switch para evaluar el ganador y ejecutar la funcion correspondiente
  ) {
    case "player": // si el ganador es el player
      playerWinGame();
      saveMaxAmountPlayerScoreCounter();
      moneyTotalWon();
      statisticsCounter("win");
      audioWin.play();
      setTimeout(() => {
        finishGame();
      }, 800);
      break;
    case "dealer": // si el ganador es el dealer
      audioLose.play();
      moneyTotalLost();
      statisticsCounter("lost");
      setTimeout(() => {
        finishGame();
        alertLose("You Lost");
      }, 800);
      break;
    case "draw":
      audioLose.play();
      drawEqualGame();
      statisticsCounter("draw");
      setTimeout(() => {
        finishGame();
        alertLose("Draw");
      }, 800);
      break;
  }
  dealerScoreContainer.classList.add("active"); // mostramos el puntaje del dealer
  btnsDisabled();
  saveStatistics();
  setTimeout(() => {
    flipCardBack();
  }, 300);
};

// Esta función me permite crear una carta tanto para el jugador como para el dealer dependiendo del parámetro que le pase
// Si el parámetro es player, entonces sumamos los puntos al jugador, si no, los sumamos al dealer
const createCard = (whoPlay) => {
  const card = takeCard();
  const cardValue = valueCard(card);
  whoPlay === "player"
    ? (playerPoints += cardValue)
    : (dealerPoints += cardValue);
  whoPlay === "player"
    ? (playerScore.innerText = playerPoints)
    : (dealerScore.innerText = dealerPoints);
  const cardImg = document.createElement("img");
  cardImg.src = `assets/cards/${card}.png`;
  whoPlay === "player"
    ? playerCardsContainer.append(cardImg)
    : dealerCardsContainer.append(cardImg);
  setTimeout(() => {
    cardImg.classList.add("hidden");
  }, 50);
};

// Esta función me permite Activar las cartas del jugador y del dealer de acuerdo al parametro que le pase
const activeCards = (cardPosition, container) => {
  audioCard.play();
  const cards = container.children;
  cards[cardPosition].classList.add("active");
};

// Esta función me permite controlar cuando el jugador gana o pierde solo con las 4 cartas iniciales
// que se acivan automaticamente al iniciar el juego
const gameEndConditionIntialCards = () => {
  if (playerPoints === 21) {
    setTimeout(() => {
      alertLose("♠️ Blackjack ♠️");
      finishGameCase("player");
    }, 2600);
    // console.log("Player Wins - Game End Condition Section");
  } else if (playerPoints > 21) {
    setTimeout(() => {
      finishGameCase("dealer");
    }, 1200);
    // console.log("Dealer Wins - Game End Condition Section");
  } else if (dealerPoints === 21) {
    setTimeout(() => {
      flipCardBack();
    }, 2200);
    setTimeout(() => {
      finishGameCase("dealer");
    }, 2800);
  } else {
    return;
  }
};

// Esta funcion me permite reemplazar la carta del dealer por la carta oculta al iniciar el juego
const flipCardBack = () => {
  audioCard.play();
  dealerCardsContainer.children[1].src = `assets/cards/${playedCards[3]}.png`;
  dealerCardsContainer.children[1].classList.add("flip-vertical-left");
  dealerCardsContainer.children[1].classList.add("active");
};

// Esta funcion permite que el dealer tome su turno
const dealerTurn = () => {
  if (dealerPoints === 21) {
    finishGameCase("dealer");
  }
  // creamos una funcion que se ejecute cada 1 segundo hasta que el dealer tenga 17 puntos o mas
  const interval = setInterval(() => {
    if (dealerPoints >= playerPoints && dealerPoints >= 17) {
      clearInterval(interval);
      flipCardBack();
      if (dealerPoints > 21) {
        finishGameCase("player");
      } else if (playerPoints < dealerPoints) {
        finishGameCase("dealer");
      } else if (dealerPoints < playerPoints) {
        finishGameCase("player");
      } else {
        finishGameCase("draw");
      }
    } else {
      createCard("dealer");
      setTimeout(() => {
        for (let i = 0; i < dealerCardsContainer.children.length; i++) {
          activeCards(i, dealerCardsContainer);
        }
      }, 200);
    }
  }, 800);
};

// Esta funcion permite reiniciar el juego y volver a empezar con las cartas iniciales
//y los puntajes en 0 y los botones habilitados de nuevo
const restartGame = () => {
  playedCards = [];
  playerPoints = 0;
  dealerPoints = 0;
  playerScore.innerText = 0;
  dealerScore.innerText = 0;
  playerCardsContainer.classList.add("game-over");
  dealerCardsContainer.classList.add("game-over");
  betAmountCenter.classList.remove("pulse");
  console.clear();
  setTimeout(() => {
    validatePlayerMoney();
    btnsEnabled();
    playerCardsContainer.innerHTML = "";
    dealerCardsContainer.innerHTML = "";
    playerCardsContainer.classList.remove("game-over");
    dealerCardsContainer.classList.remove("game-over");
    createCardsInitial();
  }, 500);
};

export {
  createDeck,
  restartGame,
  activeCards,
  gameEndConditionIntialCards,
  playerPoints,
  dealerPoints,
  flipCardBack,
  finishGameCase,
  dealerTurn,
  createCard,
};
