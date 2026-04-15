import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../page/index.css";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, validationSettings } from "../utils/constants.js";
import Api from "../utils/Api.js";

const editFormElement = document.querySelector("#edit-profile-form");
const addFormElement = document.querySelector("#add-card-form");
const profileEditButton = document.querySelector("#profile-edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");
const nameInput = document.querySelector("#name-input");
const descriptionInput = document.querySelector("#description-input");
const avatarEditButton = document.querySelector("#avatar-edit-button");

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "98ce1804-c9d2-424a-a33c-626ad6a51d7c",
    "Content-Type": "application/json",
  },
});

export default api;

// Popups

const imagePopup = new PopupWithImage({
  popupSelector: "#preview-modal",
});

const userInfo = new UserInfo({
  nameSelector: "#profile-title",
  jobSelector: "#profile-description",
  avatarSelector: ".profile__image",
});

const editProfilePopup = new PopupWithForm({
  popupSelector: "#edit-modal",
  handleFormSubmit: ({ name, description }) => {
    editProfilePopup.renderLoading(true);

    api
      .updateUserInfo({ name, about: description })
      .then((user) => {
        userInfo.setUserInfo(user);
        editProfilePopup.close();
      })
      .catch(console.error)
      .finally(() => editProfilePopup.renderLoading(false));
  },
});

const addCardPopup = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: ({ name, url }) => {
    addCardPopup.renderLoading(true);

    api
      .createCard({ name, link: url })
      .then((cardData) => {
        const newCard = createCard(cardData);
        cardList.addItem(newCard);
        addCardPopup.close();
      })
      .catch(console.error)
      .finally(() => addCardPopup.renderLoading(false));
  },
});

const avatarPopup = new PopupWithForm({
  popupSelector: "#avatar-modal",
  handleFormSubmit: ({ avatar }) => {
    avatarPopup.renderLoading(true);
    api
      .updateAvatar({ avatar })
      .then((user) => {
        userInfo.setUserAvatar(user.avatar);
        avatarPopup.close();
      })
      .catch(console.error)
      .finally(() => avatarPopup.renderLoading(false));
  },
});

const deleteConfirmPopup = new PopupWithConfirmation({
  popupSelector: "#delete-confirm-modal",
});

// Card Rendering

const cardList = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardList.addItem(cardElement);
    },
  },
  ".cards__list"
);

addNewCardButton.addEventListener("click", () => addCardPopup.open());
avatarEditButton.addEventListener("click", () => avatarPopup.open());
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
imagePopup.setEventListeners();
avatarPopup.setEventListeners();
deleteConfirmPopup.setEventListeners();

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData.avatar);

    cardList.renderItems(cards.reverse());
  })
  .catch((err) => {
    console.error(err);
    cardList.renderItems(initialCards);
  });

// Card create function

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    (data) => imagePopup.open(data),
    (cardId) => api.deleteCard(cardId),
    (cardId, isLiked) =>
      isLiked ? api.dislikeCard(cardId) : api.likeCard(cardId),
    openDeleteConfirm
  );
  return card.getView();
}

function openDeleteConfirm(cardId, handleRemoveCard) {
  deleteConfirmPopup.open();

  deleteConfirmPopup.setSubmitAction(() => {
    deleteConfirmPopup.renderLoading(true);

    if (!cardId) {
      handleRemoveCard(); // local-only card
      deleteConfirmPopup.close();
      return;
    }

    api
      .deleteCard(cardId)
      .then(() => {
        handleRemoveCard();
        deleteConfirmPopup.close();
      })
      .catch(console.error)
      .finally(() => deleteConfirmPopup.renderLoading(false));
  });
}

// Event Listeners

profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  nameInput.value = currentUserInfo.name;
  descriptionInput.value = currentUserInfo.about;
  editProfilePopup.open();
});

// Validation //

const editFormValidator = new FormValidator(
  validationSettings,
  editFormElement
);

const addFormValidator = new FormValidator(validationSettings, addFormElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

cardList.renderItems();
