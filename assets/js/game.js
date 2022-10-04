import "./home.js";
import * as underscore from "./underscore-min.js";
import { alertMessage } from "./alerts.js";
import { doubleBet, drawEqualGame, finishGame, playerWinGame } from "./home.js";

// Referencias del HTML
const btnHit = document.getElementById("btn-hit");
const btnStand = document.getElementById("btn-stand");
const btnDouble = document.getElementById("btn-double");
const btnDeal = document.getElementById("btn-start-game");
const playerScoreContainer = document.querySelector(".player__score");
const dealerScoreContainer = document.querySelector(".dealer__score");
const playerScore = document.getElementById("player-score");
const dealerScore = document.getElementById("dealer-score");
const gameBoardbtns = document.querySelector(".game-board__actions");
const playerCardsContainer = document.querySelector(".player__cards");
const dealerCardsContainer = document.querySelector(".dealer__cards");

let deck = []; // Creamos un deck vacío
let playedCards = []; // Arreglo para guardar las cartas que se han jugado

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
  const card = deck.pop(); // Obtenemos la última carta del deck
  playedCards.push(card); // Agregamos la carta al arreglo de cartas jugadas
  if (deck.length === 0) {
    alertMessage.fire({
      icon: "error",
      title: "No cards left in the deck.",
    });
  }
  // console.log({ playedCards });
  return card;
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
  audioWin.play();
  btnsDisabled();
  playerWinGame();
  replaceDealerFrontCard();
  setTimeout(() => {
    finishGame();
    swal.fire({
      icon: "success",
      title: "You win",
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 2200,
    });
  }, 600);
};

// Esta funcion termina el juego dealer gana
const dealerWins = () => {
  dealerScoreContainer.classList.add("active");
  audioLose.play();
  btnsDisabled();
  replaceDealerFrontCard();
  setTimeout(() => {
    finishGame();
    swal.fire({
      icon: "error",
      title: "You lost",
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 2200,
    });
  }, 600);
};

// Esta función termina el juego si ambos jugadores empatan
const drawGame = () => {
  dealerScoreContainer.classList.add("active");
  audioLose.play();
  btnsDisabled();
  replaceDealerFrontCard();
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
  }, 600);
};

// Esta función me permite valorar una carta
const valueCard = (card) => {
  const value = card.substring(0, card.length - 1); // Obtenemos el valor de la carta
  return isNaN(value) ? (value === "A" ? 11 : 10) : value * 1; // Si el valor no es un número, entonces es una letra y le asignamos un valor, si es un número lo convertimos a un número
};

// Esta funcion permite que el dealer tome su turno
const dealerTurn = () => {
  dealerScoreContainer.classList.add("active");
// repetir hasta que el dealer tenga 17 o más puntos
  do {
createDealerCard();
replaceDealerFrontCard();
  } while (dealerPoints < 21 && playerPoints <= 21);

  setTimeout(() => {
    if (dealerPoints === playerPoints) {
      drawGame();
      console.log("Draw - Dealer Turn Section");
    } else if (dealerPoints > 21) {
      playerWins();
      console.log("Player Wins - Dealer Turn Section");
    } else if (playerPoints > dealerPoints ) {
      playerWins();
      console.log("Player Wins - Dealer Turn Section");
    // } else {
    //   dealerWins();
    //   console.log("Dealer Wins - Dealer Turn Section");
    }
  }, 100);


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
  }, 50);
  if (playerPoints === 21 && dealerPoints !== 21) {
    replaceDealerFrontCard();
    playerWins();
    console.log("Player Wins - Player Create Card Section");
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
  }, 50);
  replaceDealerBackCard();
  if (dealerPoints === 21) {
    dealerWins();
    replaceDealerFrontCard();
    console.log("Dealer Wins - Dealer Create Card Section");
  // } else if (dealerPoints > 21) {
  //   playerWins();
  //   console.log("Player Wins - Dealer Create Card Section");
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

const replaceDealerFrontCard = () => {
  const cardImg = dealerCardsContainer.children[1];
  const cardImgBack = document.createElement("img");
  cardImgBack.src = `assets/cards/${playedCards[3]}.png`; // Esta es la carta que se reemplaza por la que estaba boca abajo
  cardImg.parentNode.replaceChild(cardImgBack, cardImg);
  setTimeout(() => {
    cardImgBack.classList.add("flip");
  }, 100);
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
  // console.clear();
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
  } else if (playerPoints === 21) {
    playerWins();
  } else {
    return;
  }
});

// Esta función me permite al player plantarse
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
  createPlayerCard();
  setTimeout(() => {
    dealerTurn();
  }, 1000);
  if (playerPoints === 21) {
    playerWins();
  } else if (playerPoints > dealerPoints && playerPoints <= 21) {
    playerWins();
  }
});


export { createDeck, createPlayerCard, createDealerCard, restartGame };
