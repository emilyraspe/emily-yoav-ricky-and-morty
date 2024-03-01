export function buttonEvent(
  cardContainer,
  page,
  maxPage,
  pagination,
  searchQuery,
  searchQueryValue,
  fetchCharacters
) {
  cardContainer.innerHTML = "";
  pagination.textContent = `${page} / ${maxPage}`;

  let urlExtension = `page=${page}`;

  if (searchQuery.value.trim() !== "") {
    urlExtension = `name=${searchQuery.value}&page=${page}`;
  } else {
    urlExtension += `&name=${searchQueryValue}`;
  }

  fetchCharacters(urlExtension);
}
