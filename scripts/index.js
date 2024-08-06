const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];


const cardTemplate = document.querySelector("#card-template").content.firstElementChild;

//Wrappers
const cardListEl = document.querySelector(".cards__list");
const editProfielModal = document.querySelector("#edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const previewModal = document.querySelector("#preview-modal");
const profileEditForm = editProfielModal.querySelector(".modal__form");
const addCardForm = addCardModal.querySelector(".modal__form");

const previewImageModal = document.querySelector(".modal__image");
const previewCaptionModal = document.querySelector(".modal__caption");


//Buttons and Nodes
const profileEditButton = document.querySelector(".profile__edit-button");
const profileModalCloseButton = editProfielModal.querySelector(".modal__close");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
const previewModalCloseButton = previewModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const addNewCardButton = document.querySelector(".profile__add-button");


//Form Data
const nameInput = profileEditForm.querySelector(".modal__input_type_name");
const jobInput = profileEditForm.querySelector(".modal__input_type_description");

const cardTitleInput = addCardForm.querySelector('.modal__input_type_title');
const cardUrlInput = addCardForm.querySelector('.modal__input_type_url');


function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function openModal(modal){
  modal.classList.add("modal_opened");
 
}

function renderCard(cardData){
const cardElement = getCard(cardData);
cardListEl.prepend(cardElement);

}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editProfielModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard ({name,link}, cardListEl);
  closeModal(addCardModal);
}

function getCard(data) {
  
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button"); 
  const cardDelete = cardElement.querySelector(".card__delete-button");
// find delete button

//add event listener to the delete button
//cardElement.remove(). when button is clicked

// add click listener to the cardImage element
// openModal with previewImageModal

   likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("card__like-button_active");
      });

cardDelete.addEventListener("click", () => {
  cardElement.remove("disabled");
});

cardImage.addEventListener("click", () => {
  openModal(previewModal);
  previewImageModal.src = data.link;
  previewImageModal.alt = data.alt;
  previewCaptionModal.textContent = data.name;
});

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  return cardElement;
}


profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);
profileEditButton.addEventListener("click", () => {
    nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editProfielModal);
});

profileModalCloseButton.addEventListener("click", () => closeModal(editProfielModal));
addNewCardButton.addEventListener("click", () => openModal(addCardModal));
addCardModalCloseButton.addEventListener("click", () => closeModal(addCardModal));
previewModalCloseButton.addEventListener("click",() => closeModal(previewModal));

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));


