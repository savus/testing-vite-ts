import {
  active,
  cityInput,
  dataClose,
  dataDropdown,
  dataDropdownButton,
  doBadInputsExist,
  emailInput,
  firstNameInput,
  formInputs,
  hasSubmitted,
  isVisible,
  lastNameInput,
  maxInputLengths,
  navLink,
  phoneInputs,
  portfolioCards,
  setDoBadInputsExist,
  setHasSubmitted,
  setPhoneInputs,
  setUserInformation,
  userInformation,
} from "./index.ts";
import {
  clearFormValues,
  getJoinedPhoneInput,
  setActive,
} from "./helper-functions.ts";
import { toggleErrorMessage, validateField } from "./utils/validations.ts";

/* ClICK */
export const navBarClickHandler = (e: MouseEvent) => {
  const linkElement = e.target as HTMLLIElement;
  const isLink = linkElement.matches(navLink);
  if (isLink) {
    const elementToOpen = document.getElementById(
      linkElement.dataset.open || ""
    );
    elementToOpen?.classList.add(isVisible);
    setActive(navLink, linkElement);
    console.log(linkElement);
  }
};

export const closeButtonOnClick = ({ target }) => {
  const parentToClose = target.closest(dataClose);
  parentToClose.classList.remove(isVisible);
};

export const handlePortfolioNavFilter = (value: string) => {
  portfolioCards.forEach((card) => {
    if (value === "all") card.style.display = "block";
    else if (value.includes(card.dataset.filter)) card.style.display = "block";
    else card.style.display = "none";
  });
};

export const documentClickHandler = ({ target }) => {
  const isDropdownButton = target.matches(dataDropdownButton);
  const dropDownParent = target.closest(dataDropdown);
  if (!isDropdownButton && dropDownParent != null) return;

  if (isDropdownButton) {
    dropDownParent.classList.toggle(active);
  }

  document.querySelectorAll(`${dataDropdown}.${active}`).forEach((dropdown) => {
    if (dropdown === dropDownParent) return;
    dropdown.classList.remove(active);
  });
};

/* KEYUP */

const handleInputValidation = (inputField) => {
  const {
    value,
    attributes: { name },
  } = inputField;
  const regex = name.value;
  const inputValue =
    regex === "phone" ? getJoinedPhoneInput(phoneInputs) : value;
  const isValidField = validateField(inputValue, regex);
  toggleErrorMessage(inputField, isValidField);
  if (!isValidField) setDoBadInputsExist(true);
  else setDoBadInputsExist(false);
  return isValidField;
};

export const inputKeyUpHandler = (inputField) => {
  if (hasSubmitted) handleInputValidation(inputField);
};

export const phoneOnChangeEventHandler = (index) => (e) => {
  const value = e.target.value;
  const keyPressed = e.code;
  const restrictedKeys = [
    "ArrowRight",
    "ArrowLeft",
    "ArrowDown",
    "ArrowUp",
    "Space",
    "Tab",
  ];
  const restrictedKeyPressed = restrictedKeys.includes(keyPressed);
  const currentMaxLength = maxInputLengths[index];
  const nextInput =
    index < phoneInputs.length - 1
      ? phoneInputs[index + 1]
      : phoneInputs[index];
  const prevInput = index > 0 ? phoneInputs[index - 1] : phoneInputs[index];
  const shouldGoToNextInput = value.length === currentMaxLength;
  const shoudlGoToPrevInput = value.length === 0;

  const newState = phoneInputs.map((phoneInputField, phoneInputIndex) =>
    index === phoneInputIndex ? value : phoneInputField.value
  );

  if (shouldGoToNextInput && !restrictedKeyPressed) {
    nextInput.focus();
  }

  if (shoudlGoToPrevInput && !restrictedKeyPressed) {
    prevInput.focus();
  }

  setPhoneInputs(newState);

  if (hasSubmitted) handleInputValidation(phoneInputs[0]);
};

/* SUBMIT */
export const formSubmitHandler = (e) => {
  e.preventDefault();
  setHasSubmitted(true);

  formInputs.forEach((input) => {
    handleInputValidation(input);
  });

  handleInputValidation(phoneInputs[0]);

  if (!doBadInputsExist) {
    setUserInformation({
      firstNameInput: firstNameInput.value.trim(),
      lastNameInput: lastNameInput.value.trim(),
      cityInput: cityInput.value.trim(),
      emailInput: emailInput.value.trim(),
      phoneInput: phoneInputs.map((input) => input.value).join(""),
    });
    clearFormValues();
    console.log(userInformation);
  }
};
