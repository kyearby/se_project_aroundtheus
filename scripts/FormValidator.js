class FormValidator {
    constructor (sets, formElement ) {
        this._inputSelector = sets.inputSelector;
        this._submitButtonSelector = sets.submitButtonSelector;
        this._inactiveButtonClass = sets.inactiveButtonClass;
        this._inputErrorClass = sets.inputErrorClass;
        this._errorClass = sets.errorClass;
        this._form = formElement;
    }


    _showInputError(){
        const errorMsg = this._form.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMsg.textContent = inputEl.validationMessage;
  errorMsg.classList.add(errorClass);
    }

    _toggleButton(){

    }

    _checkInputValidity(){

    }

    _setEventListeners(){
        const { inputSelector } = settings;
   this._inputEls = [...this._form.querySelectorAll(this._inputSelector)];
   this._submitButton = this._form.querySelector(this._submitButtonSelector);

  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(this._form, inputEl, settings);
      toggleButton(inputEls, submitButton, settings);
    });
  });
    }

    enableValidation(){
        this._form.addEventListener("submit", (e) => {
            e.preventDefault();
          });   
      
          setEventListeners(formEl, settings);
    }
}

const editFormValidator = new FormValidator();
editFormValidator.enableValidation();