import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(handleFormSubmit, popupSelector) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._inputList = this._popupForm.querySelectorAll(".modal__input");
    this._handleFormSubmit = handleFormSubmit;
    // this._submitButton = this._popupElement.querySelector(".modal__button");
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.renderModalFormLoading(true);
      this._handleFormSubmit(this._getInputValues());
    });
  }

  resetForm() {
    this._popupForm.reset();
  }

  handleAvatarModal() {
    this._handleAvatarModal;
    this._popupForm.addEventListener.open();
  }

  renderModalFormLoading(isloading) {
    this._submitButton = this._popupForm.querySelector(".modal__button");
    if (isloading) {
      this._submitButton.textContent = "Saving...";
    } else {
      this._submitButton.textContent = "Save";
    }
  }
}
