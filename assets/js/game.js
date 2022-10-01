import "./home.js";
import * as underscore from "./underscore-min.js";
import { alertMessage } from "./alerts.js";

let deck = [];

const typesofCards = ["C", "D", "H", "S"];
const letterSpecials = ["A", "J", "Q", "K"];

let pointsPlayer = 0,
  pointsDealer = 0;

// Referencias del HTML
const btnHit = document.getElementById("btn-hit");

const divCartasJugadores = document.querySelectorAll("divCartasJugadores"),
  puntosHTML = document.querySelectorAll("small");

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
  console.log(deck); // Imprimimos el deck
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
  console.log(card);
  console.log(deck);
  return card;
};

btnHit.addEventListener("click", () => {
    const card = takeCard();
    console.log(card);
    console.log(deck);
    });
    






export { createDeck, takeCard };
