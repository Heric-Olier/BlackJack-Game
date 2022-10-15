const btnSpanish = document.getElementById("btn-spanish");
const btnEnglish = document.getElementById("btn-english");
const titleBetHome = document.getElementById("title-bet-home");
const textBtnClear = document.querySelector(".btn-clear-container span");
const textBtnPlay = document.querySelector(".btn-start-game-container span");
const textScore = document.querySelector(".player__score-counter span");
const btnHit = document.querySelector(".btn-hit-container span");
const btnStand = document.querySelector(".btn-stand-container span");
const btnDouble = document.querySelector(".btn-double-container span");
const settingsModalTitle = document.querySelector(".modal-title");
const SettingstextStatistics = document.querySelector(".statistics h5");
const modalBodyItems = document.querySelectorAll(".statistics p");
const btnRestartGame = document.getElementById("btn-restart-game");
const modalHelpTitles = document.querySelectorAll(".modal-help h5");
const modalHelpBody = document.querySelectorAll(".modal-help p");

const saveLanguage = (language) => {
  localStorage.setItem("language", language);
};

const restoreLanguage = () => {
  if (localStorage.getItem("language")) {
    if (localStorage.getItem("language") === "spanish") {
      btnSpanish.classList.add("hidden");
      btnEnglish.classList.remove("hidden");
      titleBetHome.innerHTML = "Haz tu apuesta";
      textBtnClear.innerHTML = "Cancelar";
      textBtnPlay.innerHTML = "Jugar";
      textScore.innerHTML = "Puntos";
      btnHit.innerHTML = "Pedir";
      btnStand.innerHTML = "Plantarse";
      btnDouble.innerHTML = "Doblar";
      settingsModalTitle.innerHTML = "Ajustes";
      SettingstextStatistics.innerHTML = "Estadísticas";
      modalBodyItems[0].innerHTML = "Partidas jugadas: ";
      modalBodyItems[1].innerHTML = "Partidas ganadas: ";
      modalBodyItems[2].innerHTML = "Partidas perdidas: ";
      modalBodyItems[3].innerHTML = "Partidas empatadas: ";
      modalBodyItems[4].innerHTML = "Partidas reiniciadas: ";
      modalBodyItems[5].innerHTML = "Puntuación más alta: ";
      modalBodyItems[6].innerHTML = "Dinero ganado: $ ";
      modalBodyItems[7].innerHTML = "Dinero perdido: $ ";
      modalBodyItems[8].innerHTML = "Eres el visitante número: ";
      btnRestartGame.innerHTML = "Reiniciar Juego";
      modalHelpTitles[0].innerHTML = "Ayuda";
      modalHelpTitles[1].innerHTML = "Cómo jugar";
      modalHelpBody[0].innerHTML =
        "El objetivo del juego es conseguir una puntuación mayor que la del crupier, pero sin pasarse de 21.";
      modalHelpBody[1].innerHTML =
        "Las cartas de valor numérico valen su número. Las cartas de figura valen 10. El As vale 11.";
      modalHelpBody[2].innerHTML =
        "Cada jugador comienza con dos cartas, una de las cartas del crupier está oculta hasta el final.";
      modalHelpBody[3].innerHTML =
        "El boton 'Pedir' es pedir otra carta. El boton 'Plantarse' es quedarse con tu total de cartas y terminar tu turno.";
      modalHelpBody[4].innerHTML =
        "El boton 'Doblar' es doblar tu apuesta, y recibir una y solo una carta más.";
      modalHelpBody[5].innerHTML =
        "Si te pasas de 21 pierdes, y el crupier gana sin importar la mano del crupier.";
      modalHelpBody[6].innerHTML =
        "Si te quedas sin fichas siempre puedes reiniciar el juego con el boton 'Reiniciar Juego' en la sección de ajustes.";
    } else if (localStorage.getItem("language") === "english") {
      btnEnglish.classList.add("hidden");
      btnSpanish.classList.remove("hidden");
      titleBetHome.innerHTML = "Place your bet";
      textBtnClear.innerHTML = "Clear";
      textBtnPlay.innerHTML = "Deal";
      textScore.innerHTML = "Score";
      btnHit.innerHTML = "Hit";
      btnStand.innerHTML = "Stand";
      btnDouble.innerHTML = "Double";
      settingsModalTitle.innerHTML = "Settings";
      SettingstextStatistics.innerHTML = "Statistics";
      modalBodyItems[0].innerHTML = "Games played: ";
      modalBodyItems[1].innerHTML = "Games won: ";
      modalBodyItems[2].innerHTML = "Games lost: ";
      modalBodyItems[3].innerHTML = "Games draw: ";
      modalBodyItems[4].innerHTML = "Games restarted: ";
      modalBodyItems[5].innerHTML = "Highest score: ";
      modalBodyItems[6].innerHTML = "Money won: $ ";
      modalBodyItems[7].innerHTML = "Money lost: $ ";
      modalBodyItems[8].innerHTML = "You are visitor number: ";
      btnRestartGame.innerHTML = "Restart Game";
      modalHelpTitles[0].innerHTML = "Help";
      modalHelpTitles[1].innerHTML = "How to play";
      modalHelpBody[0].innerHTML =
        "The goal of Blackjack is to beat the dealer's hand without going over 21.";
      modalHelpBody[1].innerHTML =
        "Face cards are worth 10. Aces are worth 1 or 11, whichever makes a better hand.";
      modalHelpBody[2].innerHTML =
        "Each player starts with two cards, one of the dealer's cards is hidden until the end.";
      modalHelpBody[3].innerHTML =
        "To 'Hit' is to ask for another card. To 'Stand' is to hold your total and end your turn.";
      modalHelpBody[4].innerHTML =
        "To 'Double Down' is to double your bet, and receive one and only one more card.";
      modalHelpBody[5].innerHTML =
        "If you go over 21 you bust, and the dealer wins regardless of the dealer's hand.";
      modalHelpBody[6].innerHTML =
        "If you run out of chips you can always restart the game with the 'Restart Game' button in the settings section.";
    }
  }
};

const changeLanguage = (language) => {
  if (language === "spanish") {
    btnSpanish.classList.add("hidden");
    btnEnglish.classList.remove("hidden");
    titleBetHome.innerHTML = "Haz tu apuesta";
    textBtnClear.innerHTML = "Cancelar";
    textBtnPlay.innerHTML = "Jugar";
    textScore.innerHTML = "Puntos";
    btnHit.innerHTML = "Pedir";
    btnStand.innerHTML = "Plantarse";
    btnDouble.innerHTML = "Doblar";
    settingsModalTitle.innerHTML = "Ajustes";
    SettingstextStatistics.innerHTML = "Estadísticas";
    modalBodyItems[0].innerHTML = "Partidas jugadas: ";
    modalBodyItems[1].innerHTML = "Partidas ganadas: ";
    modalBodyItems[2].innerHTML = "Partidas perdidas: ";
    modalBodyItems[3].innerHTML = "Partidas empatadas: ";
    modalBodyItems[4].innerHTML = "Partidas reiniciadas: ";
    modalBodyItems[5].innerHTML = "Puntuación más alta: ";
    modalBodyItems[6].innerHTML = "Dinero ganado: $ ";
    modalBodyItems[7].innerHTML = "Dinero perdido: $ ";
    modalBodyItems[8].innerHTML = "Eres el visitante número: ";
    btnRestartGame.innerHTML = "Reiniciar Juego";
    modalHelpTitles[0].innerHTML = "Ayuda";
    modalHelpTitles[1].innerHTML = "Cómo jugar";
    modalHelpBody[0].innerHTML =
      "El objetivo del juego es conseguir una puntuación mayor que la del crupier, pero sin pasarse de 21.";
    modalHelpBody[1].innerHTML =
      "Las cartas de valor numérico valen su número. Las cartas de figura valen 10. El As vale 11.";
    modalHelpBody[2].innerHTML =
      "Cada jugador comienza con dos cartas, una de las cartas del crupier está oculta hasta el final.";
    modalHelpBody[3].innerHTML =
      "El boton 'Pedir' es pedir otra carta. El boton 'Plantarse' es quedarse con tu total de cartas y terminar tu turno.";
    modalHelpBody[4].innerHTML =
      "El boton 'Doblar' es doblar tu apuesta, y recibir una y solo una carta más.";
    modalHelpBody[5].innerHTML =
      "Si te pasas de 21 pierdes, y el crupier gana sin importar la mano del crupier.";
    modalHelpBody[6].innerHTML =
      "Si te quedas sin fichas siempre puedes reiniciar el juego con el boton 'Reiniciar Juego' en la sección de ajustes.";

    saveLanguage(language);
  } else if (language === "english") {
    btnEnglish.classList.add("hidden");
    btnSpanish.classList.remove("hidden");
    titleBetHome.innerHTML = "Place your bet";
    textBtnClear.innerHTML = "Clear";
    textBtnPlay.innerHTML = "Deal";
    textScore.innerHTML = "Score";
    btnHit.innerHTML = "Hit";
    btnStand.innerHTML = "Stand";
    btnDouble.innerHTML = "Double";
    settingsModalTitle.innerHTML = "Settings";
    SettingstextStatistics.innerHTML = "Statistics";
    modalBodyItems[0].innerHTML = "Games played: ";
    modalBodyItems[1].innerHTML = "Games won: ";
    modalBodyItems[2].innerHTML = "Games lost: ";
    modalBodyItems[3].innerHTML = "Games draw: ";
    modalBodyItems[4].innerHTML = "Games restarted: ";
    modalBodyItems[5].innerHTML = "Highest score: ";
    modalBodyItems[6].innerHTML = "Money won: $ ";
    modalBodyItems[7].innerHTML = "Money lost: $ ";
    modalBodyItems[8].innerHTML = "You are visitor number: ";
    btnRestartGame.innerHTML = "Restart Game";
    modalHelpTitles[0].innerHTML = "Help";
    modalHelpTitles[1].innerHTML = "How to play";
    modalHelpBody[0].innerHTML =
      "The goal of Blackjack is to beat the dealer's hand without going over 21.";
    modalHelpBody[1].innerHTML =
      "Face cards are worth 10. Aces are worth 1 or 11, whichever makes a better hand.";
    modalHelpBody[2].innerHTML =
      "Each player starts with two cards, one of the dealer's cards is hidden until the end.";
    modalHelpBody[3].innerHTML =
      "To 'Hit' is to ask for another card. To 'Stand' is to hold your total and end your turn.";
    modalHelpBody[4].innerHTML =
      "To 'Double Down' is to double your bet, and receive one and only one more card.";
    modalHelpBody[5].innerHTML =
      "If you go over 21 you bust, and the dealer wins regardless of the dealer's hand.";
    modalHelpBody[6].innerHTML =
      "If you run out of chips you can always restart the game with the 'Restart Game' button in the settings section.";

    saveLanguage(language);
  }
};

btnEnglish.addEventListener("click", () => {
  changeLanguage("english");
});

btnSpanish.addEventListener("click", () => {
  changeLanguage("spanish");
});

restoreLanguage();
