import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../page/index.css";
import Section from "../page/Section.js";
import PopupWithImage from "../page/PopupWithImage.js";
import PopupWithForm from "../page/PopupWithForm.js";
import UserInfo from "../page/UserInfo.js";
import {
  initialCards,
  validationSettings,
  addNewCardButton,
  nameInput,
  descriptionInput,
} from "../utils/constants.js";

const editFormElement = document.querySelector("#edit-profile-modal");
const addFormElement = document.querySelector("#add-card-form");
const profileEditBtn = document.querySelector("#profile-edit-button");

// Popups

const imagePopup = new PopupWithImage({
  popupSelector: "#preview-modal",
});


const userInfo = new UserInfo({
  nameSelector: "#profile-title",
  jobSelector: "#profile-description",
});

const editProfilePopup = new PopupWithForm({
  popupSelector: "#edit-profile-modal",
  handleFormSubmit: (data) => {
    userInfo.setUserInfo({name: data.name , description: data.description});
    editProfilePopup.close();
    editProfilePopup.resetForm();
    editFormValidator.disableSubmitButton();
  },
});


const addCardPopup = new PopupWithForm({
  popupSelector: "#add-card-form",
  handleFormSubmit: ({ name, url }) => {
    const cardElement = createCard({ name, link: url });
    cardList.addItem(cardElement);
    addCardPopup.close();
    addCardPopup.resetForm();
    addFormValidator.disableSubmitButton();
  },
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

// Card create function

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", (data) => {
    imagePopup.open(data);
  });
  return card.getView();
}

//

// Event Listeners

addNewCardButton.addEventListener("click", () => addCardPopup.open());
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
imagePopup.setEventListeners();

profileEditBtn.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  nameInput.value = currentUserInfo.name;
  descriptionInput.value = currentUserInfo.description;
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