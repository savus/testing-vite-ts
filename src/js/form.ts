import { setUserInformation } from ".";
import type { TPhoneInputs } from "../types";
import { createUser } from "./helper-functions";
import { populateUsers } from "./initialization";
import { toggleErrorMessage, validateField } from "./utils/validations";

const firstNameId = "first-name-input";
const lastNameId = "last-name-input";
const emailId = "email-input";
const cityId = "city-input";
const modalFormId = "modal-form-js";
const dataPhone = "data-phone";

const maxInputLengths = [3, 3, 4];
let hasSubmitted = false;
let doBadInputsExist = false;

const userForm = document.getElementById(modalFormId)!;
const firstNameInput = document.getElementById(firstNameId) as HTMLInputElement;
const lastNameInput = document.getElementById(lastNameId) as HTMLInputElement;
const emailInput = document.getElementById(emailId) as HTMLInputElement;
const cityInput = document.getElementById(cityId) as HTMLInputElement;
const phone1 = document.querySelector(`[${dataPhone}='1']`) as HTMLInputElement;
const phone2 = document.querySelector(`[${dataPhone}='2']`) as HTMLInputElement;
const phone3 = document.querySelector(`[${dataPhone}='3']`) as HTMLInputElement;

const formInputs = [firstNameInput, lastNameInput, emailInput, cityInput];

export const phoneInputs: TPhoneInputs = [phone1, phone2, phone3];

export const setHasSubmitted = (state: boolean) => (hasSubmitted = state);
export const setPhoneInputs = (array: string[]) => {
  array.forEach((val, index) => {
    phoneInputs[index].value = val;
  });
};

const restrictedKeys = [
  "ArrowRight",
  "ArrowLeft",
  "ArrowDown",
  "ArrowUp",
  "Space",
  "Tab",
];

const permittedInput = {
  regex: /\d/,
  allowedKeys: ["Tab", "Backspace", "Enter"],
};

const setDoBadInputsExist = (boolean: boolean) => (doBadInputsExist = boolean);

export const clearPhoneInputs = () => {
  phoneInputs.forEach((input) => (input.value = ""));
};

export const clearFormValues = () => {
  formInputs.forEach((inputField) => (inputField.value = ""));
  clearPhoneInputs();
};

const getJoinedPhoneInput = (inputs: TPhoneInputs) =>
  inputs.map((input) => input.value).join("");

const handleInputValidation = (inputField: HTMLInputElement) => {
  const regex = inputField.name.valueOf();
  const inputValue =
    regex === "phone" ? getJoinedPhoneInput(phoneInputs) : inputField.value;
  const isValidField = validateField(inputValue, regex);
  toggleErrorMessage(inputField, isValidField);
  if (!isValidField) setDoBadInputsExist(true);
  else setDoBadInputsExist(false);
  return isValidField;
};

const inputKeyUpHandler = (inputField: HTMLInputElement) => {
  if (hasSubmitted) handleInputValidation(inputField);
};

const phoneOnChangeEventHandler = (index: number) => (e: KeyboardEvent) => {
  const inputElement = e.target as HTMLInputElement;
  const value = inputElement.value;
  const keyPressed = e.code;
  const restrictedKeyPressed = restrictedKeys.includes(keyPressed);
  const currentMaxLength = maxInputLengths[index];
  const nextInput =
    index < phoneInputs.length - 1
      ? phoneInputs[index + 1]
      : phoneInputs[index];
  const prevInput = index > 0 ? phoneInputs[index - 1] : phoneInputs[index];
  const shouldGoToNextInput = value.length === currentMaxLength;
  const shouldGoToPrevInput = value.length === 0;

  const newState = phoneInputs.map((phoneInputField, phoneInputIndex) =>
    index === phoneInputIndex ? value : phoneInputField.value
  );

  if (shouldGoToNextInput && !restrictedKeyPressed) {
    nextInput.focus();
  }

  if (shouldGoToPrevInput && !restrictedKeyPressed) {
    prevInput.focus();
  }

  setPhoneInputs(newState);

  if (hasSubmitted) handleInputValidation(phoneInputs[0]);
};

const formSubmitHandler = (e: SubmitEvent) => {
  e.preventDefault();
  setHasSubmitted(true);

  formInputs.forEach((input) => {
    handleInputValidation(input);
  });

  handleInputValidation(phoneInputs[0]);

  if (!doBadInputsExist) {
    setUserInformation({
      firstName: firstNameInput.value.trim(),
      lastName: lastNameInput.value.trim(),
      city: cityInput.value.trim(),
      email: emailInput.value.trim(),
      phone: phoneInputs.map((input) => input.value).join(""),
    });

    createUser({
      firstName: firstNameInput.value.trim(),
      lastName: lastNameInput.value.trim(),
      city: cityInput.value.trim(),
      email: emailInput.value.trim(),
      phone: phoneInputs.map((input) => input.value).join(""),
    }).then(populateUsers);

    clearFormValues();
  }
};

formInputs.forEach((input) => {
  input.addEventListener("keyup", () => {
    inputKeyUpHandler(input);
  });
});

phoneInputs.forEach((input) => {
  input.addEventListener("keydown", (e) => {
    const keyPressed = e.code;
    if (
      !permittedInput.regex.test(keyPressed) &&
      !permittedInput.allowedKeys.includes(keyPressed)
    )
      e.preventDefault();
  });
});

phoneInputs.forEach((input, index: number) => {
  input.addEventListener("keyup", phoneOnChangeEventHandler(index));
});

userForm.addEventListener("submit", formSubmitHandler);
