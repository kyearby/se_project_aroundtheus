export default class Card {
  constructor(
    cardData,
    cardTemplate,
    userId,
    handleImagePreviewClick,
    handleDeleteRequest,
    handleLikeRequest,
    openDeleteConfirm
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._id = cardData._id;
    this._userId = userId;
    this._isLiked = cardData.isLiked || false;
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
    });

    this._likeButton.addEventListener("click", () => {
      this._handleLikeRequest(this._id, this._isLiked)
        .then((updatedCard) => {
          this._isLiked = updatedCard.isLiked;

          this._likeButton.classList.toggle(
            "card__like-button_active",
            this._isLiked
          );
        })
        .catch((err) => {
          console.error("LIKE ERROR:", err);
        });
    });
  }

  removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
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

    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    }

    this._setEventListeners();
    return this._cardElement;
  }
}
