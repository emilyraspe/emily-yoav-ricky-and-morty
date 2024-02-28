import { createCharacterCard } from "./components/card/card.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
const maxPage = 1;
const page = 1;
const searchQuery = "";

async function fetchCharacters(pageNumber) {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${pageNumber}`
    );
    if (!response.ok) {
      console.error("no data was fetched");
      return;
    }
    const data = await response.json();
    const characterArray = data.results;

    characterArray.forEach((character) => {
      createCharacterCard(cardContainer, character);
    });
  } catch (error) {
    console.error(error);
  }
}

let currentPageNumber = 1;

nextButton.addEventListener("click", () => {
  while (currentPageNumber <= 42) {
    currentPageNumber++;
    buttonEvent();
    return;
  }
});
prevButton.addEventListener("click", () => {
  while (currentPageNumber > 1) {
    currentPageNumber--;
    buttonEvent();
    return;
  }
});

function buttonEvent() {
  cardContainer.innerHTML = "";
  pagination.textContent = `${currentPageNumber} / 42`;
  console.log("insisde the function: ", currentPageNumber);
  fetchCharacters(currentPageNumber);
}

fetchCharacters(0);
