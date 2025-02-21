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

const editFormElement = document.querySelector("#edit-profile-form");
const addFormElement = document.querySelector("#add-card-form");
const profileEditBtn = document.querySelector("#profile-edit-button");
const cardSelector = "#card-template";

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
  handleFormSubmit: (data) => {
    userInfo.setUserInfo({ name: data.name, job: data.description });
    editProfilePopup.close();
    editProfilePopup.resetForm();
    editFormValidator.disableSubmitButton();
  },
});

const addCardPopup = new PopupWithForm({
  popupSelector: "#add-card-modal",
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
    renderer: (item) => {
      const cardElement = createCard(item);
      cardList.addItem(cardElement);
    },
  },
  ".cards__list"
);

function handleImagePreviewClick(cardData) {
  imagePopup.open({ name: cardData.name, link: cardData.link });
}

function createCard(cardData) {
  console.log(cardData);
  const card = new Card(
    cardData,
    "#card-template",
    handleImagePreviewClick,
    handleConfirmModal
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

const addFormValidator = new FormValidator(validationSettings, addFormElement);

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

api
  .getInitialCards()
  .then((cards) => {
    console.log(cards.length);
  })
  .catch((err) => {
    console.error(err);
  });

function renderCardsUserInfo() {
  return Promise.all([api.getInitialCards(), api.getUserInfo()]).then(
    ([cards, userInfo]) => {
      cardList.renderItems(cards);
      userInfo.setUserInfo({
        name: userInfo.name,
        job: userInfo.about,
      });
      userInfo.setUserAvatar({
        avatar: userData.avatar,
      });
    }
  );
}
renderCardsUserInfo();

const deleteModal = new PopupWithConfirm("#remove-card-modal");
deleteModal.setEventListeners();
function handleConfirmModal(cardData) {
  deleteModal.setSubmitFunction(() => {
    api
      .handleDeleteCard(cardData._id)
      .then(() => {
        cardData.element.remove();
      })
      .catch((err) => console.error(err));
  });
  deleteModal.open();
}

const handleAvatarModal = new PopupWithForm("#avatar-modal", (data) => {});
const avatarEditButton = document.querySelector(".avatar__edit-icon");
avatarEditButton.addEventListener("click", () => {
  handleAvatarModal.open();
  handleAvatarModal.setEventListeners();
});

const renderModalFormLoading = new PopupWithForm(
  ".modal__button",
  (data) => {}
);

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

const popupWithForm = new PopupWithForm(".popup-selector", handleFormSubmit);
popupWithForm.setEventListeners();
