import "./home.js";
import * as underscore from "./underscore-min.js";
import { alertMessage } from "./alerts.js";

// Referencias del HTML
const btnHit = document.getElementById("btn-hit");
const btnStand = document.getElementById("btn-stand");
const btnDouble = document.getElementById("btn-double");
const playerScoreContainer = document.querySelector('.player__score');
const dealerScoreContainer = document.querySelector('.dealer__score');
const playerScore = document.getElementById("player-score");
const dealerScore = document.getElementById("dealer-score");
const gameBoardbtns = document.querySelector(".game-board__actions");

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
  return deck; // Retornamos el deck
};

createDeck();

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
  // Al hacer click en el botón de HIT se ejecuta esta función que toma una carta
  const card = valueCard(takeCard());
  playerPoints += card;
  playerScore.innerText = playerPoints; // Mostramos el puntaje del jugador
    if (playerPoints > 21) {
        setTimeout(() => {
        swal.fire({
            icon: 'error',
            title: 'You lost',
        });
        }, 500);
        playerScoreContainer.classList.add('bg-danger');
        gameBoardbtns.classList.remove("visible");
    } else if (playerPoints === 21) {
        setTimeout(() => {
        swal.fire({
            icon: 'success',
            title: 'You win',
        });
        disableButtons();
        }, 500);
        playerScoreContainer.classList.add('bg-success');
    } else {
        return; 
    }
    
});


// Esta función me permite valorar una carta
const valueCard = (card) => {
  const value = card.substring(0, card.length - 1); // Obtenemos el valor de la carta
  console.log({ value });
  return isNaN(value) ? (value === "A" ? 11 : 10) : value * 1; // Si el valor no es un número, entonces es una letra y le asignamos un valor, si es un número lo convertimos a un número
};

const showPlayerPoints = () => {
    const points = valueCard(takeCard());
    playerPoints += points;
    playerScore.innerText = playerPoints;
  };
  
  const showDealerPoints = () => {
    const points = valueCard(takeCard());
    dealerPoints += points;
    dealerScore.innerText = dealerPoints;
  };

  const disableButtons = () => {
    btnHit.classList.add('disabled');
    btnStand.classList.add('disabled');
    btnDouble.classList.add('disabled');
    };
  
  

// Esta función me permite determinar el ganador
const determineWinner = () => {
    const [playerPoints, dealerPoints] = [playerScore, dealerScore].map((score) =>
        Number(score.innerText)
        );
    setTimeout(() => {
        if (playerPoints === dealerPoints) {
            alertMessage.fire({
                icon: 'success',
                title: 'Draw'
            });
        } else if (playerPoints > 21) {
            alertMessage.fire({
                icon: 'error',
                title: 'You lose'
            });
        } else if (dealerPoints > 21) {
            alertMessage.fire({
                icon: 'success',
                title: 'You win'
            });
        } else if (playerPoints > dealerPoints) {
            alertMessage.fire({
                icon: 'success',
                title: 'You win'
            });
        } else {
            alertMessage.fire({
                icon: 'error',
                title: 'You lose'
            });
        }
    }, 100);
}

btnStand.addEventListener('click', () => {
    btnHit.disabled = true;
    btnStand.disabled = true;
    btnDouble.disabled = true;

    while (dealerPoints < playerPoints && playerPoints <= 21 && dealerPoints <= 21) {
        const card = valueCard(takeCard());
        dealerPoints += card;
        dealerScore.innerText = dealerPoints;
    }

    determineWinner();
});









export { createDeck, takeCard, valueCard, showPlayerPoints, showDealerPoints };
