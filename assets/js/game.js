const chip10 = document.getElementById("chip-10");
const chip25 = document.getElementById("chip-25");
const chip50 = document.getElementById("chip-50");
const chip100 = document.getElementById("chip-100");
const betamount = document.querySelector("[data-bet-amount]");

const bet10 = () => {
  betamount.innerHTML = chip10.dataset.value;
};

const bet25 = () => {
  betamount.innerHTML = chip25.dataset.value;
};

const bet50 = () => {
  betamount.innerHTML = chip50.dataset.value;
};

const bet100 = () => {
  betamount.innerHTML = chip100.dataset.value;
};

chip10.addEventListener("click", bet10);
chip25.addEventListener("click", bet25);
chip50.addEventListener("click", bet50);
chip100.addEventListener("click", bet100);

