export function createCharacterCard(cardContainer, character) {
  let imgSrc = character.image;
  let characterName = character.name;
  let characterStatus = character.status;
  let characterType = character.type;
  let characterOccurrences = character.episode.length;

  cardContainer.innerHTML += `<li class="card">
    <div class="card__image-container">
      <img
        class="card__image"
        src= "${imgSrc}"
        alt= "${characterName}"
      />
      <div class="card__image-gradient"></div>
    </div>
    <div class="card__content" aria-label="character card for ${characterName}">
      <h2 class="card__title">${characterName}</h2>
      <dl class="card__info">
        <dt class="card__info-title" aria-label="status of ${characterName}">Status</dt>
        <dd class="card__info-description" aria-label="status is ${characterStatus}">${characterStatus}</dd>
        <dt class="card__info-title" aria-label="character type">Type</dt>
        <dd class="card__info-description" aria-label="type of character is ${characterType}">${characterType}</dd>
        <dt class="card__info-title" aria-label="number of occurrences in the show">Occurrences</dt>
        <dd class="card__info-description" aria-label="number of occurrences on the show is ${characterOccurrences}">${characterOccurrences}</dd>
      </dl>
    </div>
  </li>`;
}
