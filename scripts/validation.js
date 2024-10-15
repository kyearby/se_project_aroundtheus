// function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
//   const errorMsg = formEl.querySelector(`#${inputEl.id}-error`);
//   inputEl.classList.add(inputErrorClass);
//   errorMsg.textContent = inputEl.validationMessage;
//   errorMsg.classList.add(errorClass);
// }

// function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
//   const errorMsg = formEl.querySelector(`#${inputEl.id}-error`);
//   inputEl.classList.remove(inputErrorClass);
//   errorMsg.textContent = "";
//   errorMsg.classList.remove(errorClass);
// }

// function checkInputValidity(formEl, inputEl, settings) {
//   if (!inputEl.validity.valid) {
//     showInputError(formEl, inputEl, settings);
//   } else {
//     hideInputError(formEl, inputEl, settings);
//   }
// }

// function toggleButton(inputEls, submitButton, { inactiveButtonClass }) {
//   let invalidInput = false;
//   inputEls.forEach((inputEl) => {
//     if (!inputEl.validity.valid){
//         invalidInput = true;
//     }
//   });

//   if (invalidInput) {
//     submitButton.classList.add(inactiveButtonClass);
//     submitButton.disabled = true;
//   } else {
//     submitButton.classList.remove(inactiveButtonClass);
//     submitButton.disabled = false;
//   }
// }

// function setEventListeners(formEl, settings) {
//   const { inputSelector } = settings;
//   const inputEls = [...formEl.querySelectorAll(inputSelector)];
//   const submitButton = formEl.querySelector(settings.submitButtonSelector);

//   inputEls.forEach((inputEl) => {
//     inputEl.addEventListener("input", (e) => {
//       checkInputValidity(formEl, inputEl, settings);
//       toggleButton(inputEls, submitButton, settings);
//     });
//   });
// }

// function enableValidation(settings) {
//   const formEls = [...document.querySelectorAll(settings.formSelector)];

//   formEls.forEach((formEl) => {
//     formEl.addEventListener("submit", (e) => {
//       e.preventDefault();
//     });   

//     setEventListeners(formEl, settings);
//   });
// }

// const config = {
//   formSelector: ".modal__form",
//   inputSelector: ".modal__input",
//   submitButtonSelector: ".modal__button",
//   inactiveButtonClass: "modal__button_disabled",
//   inputErrorClass: "modal__input_type_error",
//   errorClass: "modal__error_visible",
// };

// enableValidation(config);