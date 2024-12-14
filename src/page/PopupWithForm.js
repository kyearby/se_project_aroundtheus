import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({popupSelector, handleFormSubmit}) {
        super({ popupSelector });
        this._popupForm = this._popupElement.querySelector(".modal__form");
        this._inputList = this._popupForm.querySelectorAll(".modal__input");
        this._handleFormSubmit = handleFormSubmit;
        this._submitButton = this._popupElement.querySelector(".modal__button");


    }

    _getInputValues() {
        const inputValues = {};
        this._inputList.forEach((input) => {
          inputValues[input.name] = input.value;
        });
        return inputValues;
      }


       resetForm(){
        this._popupForm.reset();
      }
    
      setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener("submit", (e) => {
          e.preventDefault();
          this._handleFormSubmit(this._getInputValues());

        });
      }
  
  }
