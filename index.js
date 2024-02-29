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
let maxPage = 1;
let page = 1;
const searchQuery = document.querySelector('[data-js="search-bar__input"]');

async function fetchCharacters(urlExtensionString, urlExtention) {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?${urlExtensionString}${urlExtention}`
    );
    if (!response.ok) {
      console.error("no data was fetched");
      return;
    }
    const data = await response.json();
    const characterArray = data.results;
    maxPage = data.info.pages;
    console.log(maxPage);

    characterArray.forEach((character) => {
      createCharacterCard(cardContainer, character);
    });
  } catch (error) {
    console.error(error);
  }
}

// let currentPageNumber = 1;

nextButton.addEventListener("click", () => {
  while (page <= maxPage) {
    page++;
    buttonEvent();
    return;
  }
});
prevButton.addEventListener("click", () => {
  while (page > 1) {
    page--;
    buttonEvent();
    return;
  }
});

function buttonEvent() {
  cardContainer.innerHTML = "";
  pagination.textContent = `${page} / ${maxPage}`;
  fetchCharacters("page=", page);
}

searchBar.addEventListener("submit", async (event) => {
  event.preventDefault();
  cardContainer.innerHTML = "";
  maxPage = 1;

  // console.log(searchQuery.value);
  await fetchCharacters("name=", searchQuery.value);

  pagination.textContent = `${page} / ${maxPage}`;
  console.log(maxPage);

  // createCharacterCard(cardContainer, character);
});

fetchCharacters();
