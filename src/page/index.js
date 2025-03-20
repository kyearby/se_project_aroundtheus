import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../page/index.css";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  validationSettings,
  addNewCardButton,
  nameInput,
  descriptionInput,
} from "../utils/constants.js";
import Api from "../components/Api.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import { reject, resolve } from "core-js/fn/promise";
import { data } from "autoprefixer";

const editFormElement = document.querySelector("#edit-profile-form");

const profileEditBtn = document.querySelector("#profile-edit-button");
const addCardModal = document.querySelector("#add-card-modal");
const cardSelector = "#card-template";
const addCardForm = addCardModal.querySelector(".modal__form", ".modal__input");
// Popups

const handleImagePopup = new PopupWithImage("#preview-modal");
handleImagePopup.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: "#profile-title",
  jobSelector: "#profile-description",
  avatarSelector: ".profile__image",
});

const handlePopupWithForm = new PopupWithForm("#edit-modal", (data) => {
  api
    .editProfile({
      name: data.name,
      about: data.aout,
    })
    .then((updatedUserInfo) => {
      userInfo.setUserInfo(updatedUserInfo);
      handlePopupWithForm.close();
    })
    .catch((err) => console.error(err));
});
handlePopupWithForm.close();
handlePopupWithForm.setEventListeners();

const addCardPopup = new PopupWithForm("#add-card-modal", (data) => {
  api
    .addNewCard({
      name: data.title,
      link: data.url,
    })
    .then((newCard) => {
      cardSection.addItem(createCard({ newCard }));
      addCardWithPopupForm.close();
      addCardForm.reset();
      formValidators["Add-a-New-Card"].disableButton();
    })
    .catch((err) => console.error(err));
});

addCardPopup.setEventListeners();

// Card Rendering

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardList.addItem(cardElement);
    },
  },
  ".cards__list"
);

function handleImagePreviewClick(data) {
  imagePopup.open({ name: data.name, link: data.link });
}

function createCard(data) {
  console.log(data);
  const card = new Card(
    data,
    "#card-template",
    handleImagePreviewClick,
    handleConfirmModal,
    handleCardLike
  );
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

const addFormValidator = new FormValidator(validationSettings, addCardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

//Api
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "1aa088ef-da11-4fda-a5d3-4724ce53b405",
    "Content-Type": "application/json",
  },
});

function handleLikeCard(card, cardId, isLiked) {
  api.updateLikeStatus(cardId, isLiked).then((updatedCard) => {
    handleLikeCard(yourCardObject, yourCardId, true);
  });
}

function renderCardsUserInfo() {
  return Promise.all([api.getInitialCards(), api.getUserInfo()]).then(
    ([cards, userInfoData]) => {
      cardList.renderItems(cards);
      userInfo.setUserInfo({
        name: userInfoData.name,
        job: userInfoData.about,
      });
      userInfo.setUserAvatar({
        avatar: userInfoData.avatar,
      });
    }
  );
}
renderCardsUserInfo();

const deleteModal = new PopupWithConfirm("#remove-card-modal");
deleteModal.setEventListeners();

function handleConfirmModal(userInfo) {
  deleteModal.setSubmitFunction(() => {
    api
      .handleDeleteCard(userInfo._id)
      .then(() => {
        userInfo.element.remove();
      })
      .catch((err) => console.error(err));
  });
  deleteModal.open();
}

const handleAvatarModal = new PopupWithForm("avatar-modal", (data) => {
  api
    .editAvatar({
      avatar: data.avatarUrl,
    })
    .then((updatedAvatarInfo) => {
      userInfo.setAvatar(updatedAvatarInfo);
      handleAvatarModal.close();
    })
    .catch((err) => console.error(err));
});

// const handleAvatarModal = new PopupWithForm({
//   popupSelector: "#avatar-modal",
//   handleFormSubmit: (data) => {},
// });
const avatarEditButton = document.querySelector(".avatar__edit-icon");
avatarEditButton.addEventListener("click", () => {
  handleAvatarModal.open();
  handleAvatarModal.setEventListeners();
});

// const popupWithForm = new PopupWithForm(handleFormSubmit.bind(this));
// popupWithForm.setEventListeners();

// const renderModalFormLoading = new PopupWithForm((data) => {});

function handleFormSubmit(inputValues) {
  return userInfo(inputValues)
    .then((response) => {
      console.log("Form submission successful");
      this.close();
      return response;
    })
    .catch((error) => {
      console.error("Error:", error);
    })
    .finally(() => {
      this.renderModalFormLoading(false);
    });
}
