import { createCharacterCard } from "./components/card/card.js";
import { buttonEvent } from "./components/nav-button/nav-button.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');
const searchQuery = document.querySelector('[data-js="search-bar__input"]');
// const searchBar__input = document.querySelector(
//   '[data-js="search-bar__input"]'
// );

let maxPage = 1;
let page = 1;
let searchQueryValue = "";

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
    buttonEvent(
      cardContainer,
      page,
      maxPage,
      pagination,
      searchQuery,
      searchQueryValue,
      fetchCharacters
    );
  }
});
prevButton.addEventListener("click", () => {
  if (page > 1) {
    page--;
    buttonEvent(
      cardContainer,
      page,
      maxPage,
      pagination,
      searchQuery,
      searchQueryValue,
      fetchCharacters
    );
  }
});

searchBar.addEventListener("submit", async (event) => {
  event.preventDefault();
  cardContainer.innerHTML = "";
  maxPage = 1;
  page = 1;
  searchQueryValue = searchQuery.value;
  let urlExtension = `name=${searchQueryValue}`;

  await fetchCharacters(urlExtension);

  pagination.textContent = `${page} / ${maxPage}`;

  event.target.reset();
});

fetchCharacters();
