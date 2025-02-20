import Popup from "./Popup";
export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
  }
  setSubmitFunction(submitFunc) {
    this._submitFunction = submitFunc;
  }

  setEventListeners() {
    super.setEventListeners();
    console.log(this._popup, this._popupForm);
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitFunction();
    });
  }
}
