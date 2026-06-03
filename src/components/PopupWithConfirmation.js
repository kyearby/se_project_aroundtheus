import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });

    this._confirmButton = this._popupElement.querySelector(".modal__button");
  }

  setSubmitAction(action) {
    this._handleSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();

    this._confirmButton.addEventListener("click", () => {
      if (this._handleSubmit) {
        this._handleSubmit();
      }
    });
  }

  renderLoading(isLoading, loadingText = "Deleting...") {
    this._confirmButton.textContent = isLoading ? loadingText : "Yes";
  }
}
