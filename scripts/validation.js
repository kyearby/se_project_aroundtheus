const showInputError = (input, formEl, {errorClass}) => {
const errorSpan = formEl.querySelector('#' + input.id + '-error');
// add error message/class
console.log(input.validationMessage);
errorSpan.textContent = input.validationMessage;
errorSpan.classList.add(errorClass);
};

const hideInputError = (input, formEl, {errorClass}) => {
    const errorSpan = formEl.querySelector('#' + input.id + '-error');
    // add error message/class
    errorSpan.textContent = "";
    errorSpan.classList.remove(errorClass);
    };

const checkInputValidity = (formEl ,input, settings) => {
    console.log(input.validity.valid);
    if(input.validity.valid) {
    console.log("valid");
    hideInputError(); 
}else{
    showInputError(input, formEl);
}
}

const setEventListeners = (formEl, settings) => {
    const inputs = [...formEl.querySelectorAll(settings.inputSelector)];
    inputs.forEach((input) => {
        input.addEventListener("input", (e) => {
            //check validity
            checkInputValidity(formEl, input, settings);
            //toggle the button
        });
    })
};

const enableValidation = (settings) => {
    const formElements = [...document.querySelectorAll(settings.formSelector)];
    formElements.forEach((formEl) =>{
        formEl.addEventListener("submit", (e) => e.preventDefault());
        setEventListeners(formEl,settings);
    });
};

enableValidation({
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
});


// // enabling validation by calling enableValidation()
// // pass all the settings on call

// function setEventListeners (formEl, options){
//     const { inputSelector } = options;
//     const inputElements = [...formEl.querySelectorAll(inputSelector)];
//     console.log(inputElements);
// }

// function enableValidation(options){
//     const formElements = [...document.querySelectorAll(options.formSelector)];
//     formElements.forEach((formEl) => {
//         formEl.addEventListener("sumit",(e) => {
//             e.preventDefault();
//         });

//         setEventListeners(formEl,options);
//         //look for all inputs inside form
//         //loop through all the inputs to see if all are valid
//         // if input is not valid
//             //get validation message
//             //add error class to input
//             //display error message
//             //disable button
//         //if all inputs are valid
//             //enable button
//             //reset error message

//     });
// }

// const config = {
//     formSelector: ".modal__form",
//     inputSelector: ".modal__input",
//     submitButtonSelector: ".modal__button",
//     inactiveButtonClass: "popup__button_disabled",
//     inputErrorClass: "popup__input_type_error",
//     errorClass: "popup__error_visible"
// };

// enableValidation(config);