export default class Card {
  constructor(cardData, cardSelector, handleImagePreviewClick, handleConfirmModal) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._id = cardData._id;
    this._handleImagePreviewClick = handleImagePreviewClick;
    this._handleConfirmModal = handleConfirmModal;
    
    this._element = this._getTemplate();
    this._setEventListeners();
  }

  _setEventListeners() {
    this._element.querySelector('.card__image').addEventListener("click", () => {
      this._handleImagePreviewClick({ link: this._link, name: this._name });
    });

    this.deleteButton = this._element.querySelector(".card__delete-button");
    this.deleteButton.addEventListener("click", () => {
      this._handleConfirmModal(this);
    });

    this.likeButton = this._element.querySelector(".card__like-button");

    this.likeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });

  }
  
  _handleDeleteCard() {
    this._element.remove();
  }

  _handleLikeButton() {
    this.likeButton.classList.toggle("card__like-button_active");
  }

  getId(){
    return this._id;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._cardSelector).content.cloneNode(true);
    return cardTemplate.querySelector('.card');
  }

  getView(){
    this._cardElement = this._element.querySelector(".card__image");
    this._cardElement.src = this._link;
    this._cardElement.alt = this._name;

    this._titleElement = this._element.querySelector(".card__title");
    this._titleElement.textContent = this._name;

    return this._element;
  }
  
  // getView() {
  //   this._cardElement = this.getTemplate();
  //   this._likeButton = this._cardElement.querySelector(".card__like-button");
  //   this._cardImage = this._cardElement.querySelector(".card__image");
  //   this._deleteButton = this._cardElement.querySelector(".card__delete-button");
  //   this._cardTitle = this._cardElement.querySelector(".card__title");
  //   this._cardImage.src = this._link;
  //   this._cardImage.alt = this._name;
  //   this._cardTitle.textContent = this._name;

  //   return this._cardElement;
  // }
}
