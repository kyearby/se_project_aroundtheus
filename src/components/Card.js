export default class Card {
  constructor(
    cardData,
    cardTemplate,
    handleImagePreviewClick,
    handleDeleteRequest,
    handleLikeRequest,
    openDeleteConfirm
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._id = cardData._id;
    this._cardTemplate = cardTemplate;
    this._handleImagePreviewClick = handleImagePreviewClick;
    this._handleDeleteRequest = handleDeleteRequest;
    this._handleLikeRequest = handleLikeRequest;
    this._openDeleteConfirm = openDeleteConfirm;
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleImagePreviewClick({ link: this._link, name: this._name });
    });

    this._deleteButton.addEventListener("click", () => {
      this._openDeleteConfirm(this._id, () => this.removeCard());
      console.log("CARD ID:", this._id);
    });

    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });
  }

  removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  handleLikeClick(cardId, isLiked) {
    const request = isLiked ? api.dislikeCard(cardId) : api.likeCard(cardId);

    request
      .then((updatedCard) => {
        this.updateLikes(updatedCard.likes);
      })
      .catch(console.error);
  }

  getTemplate() {
    return document
      .querySelector(this._cardTemplate)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._cardElement = this.getTemplate();
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();
    return this._cardElement;
  }
}
