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

const searchBar__input = document.querySelector(
  '[data-js="search-bar__input"]'
);

// States
let maxPage = 1;
let page = 1;
const searchQuery = document.querySelector('[data-js="search-bar__input"]');
let urlExtensionString = "page=";

async function fetchCharacters(urlExtension) {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?${urlExtension}`
    );
    if (!response.ok) {
      console.error("no data was fetched");
      return;
    }
    const data = await response.json();
    const characterArray = data.results;
    maxPage = data.info.pages;

    characterArray.forEach((character) => {
      createCharacterCard(cardContainer, character);
    });
  } catch (error) {
    console.error(error);
  }
}

nextButton.addEventListener("click", () => {
  if (page < maxPage) {
    page++;
    buttonEvent();
  }
});
prevButton.addEventListener("click", () => {
  if (page > 1) {
    page--;
    buttonEvent();
  }
});

function buttonEvent() {
  cardContainer.innerHTML = "";
  pagination.textContent = `${page} / ${maxPage}`;

  let urlExtension = "";

  if (searchBar__input.value.trim() !== "") {
    urlExtension = `name=${searchQuery.value}&page=${page}`;
  } else {
    urlExtension = `page=${page}`;
  }

  fetchCharacters(urlExtension);
}

searchBar.addEventListener("submit", async (event) => {
  event.preventDefault();
  cardContainer.innerHTML = "";
  maxPage = 1;
  page = 1;
  let urlExtension;
  urlExtension = `name=${searchQuery.value}`;

  await fetchCharacters(urlExtension);

  pagination.textContent = `${page} / ${maxPage}`;

  searchQuery.value = "";
});

fetchCharacters();
