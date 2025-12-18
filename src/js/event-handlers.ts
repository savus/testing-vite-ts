import {
  active,
  carousel,
  cityInput,
  dataClose,
  dataDropdown,
  dataDropdownButton,
  dataFilter,
  dataMode,
  doBadInputsExist,
  emailInput,
  firstNameInput,
  formInputs,
  hasSubmitted,
  isVisible,
  lastNameInput,
  maxInputLengths,
  modalOverlayClass,
  navLink,
  phoneInputs,
  portfolioCards,
  portfolioSection,
  setDoBadInputsExist,
  setHasSubmitted,
  setPhoneInputs,
  setUserInformation,
} from "./index.ts";
import {
  clearFormValues,
  clearSearchInput,
  createUser,
  getJoinedPhoneInput,
  setActive,
} from "./helper-functions.ts";
import { toggleErrorMessage, validateField } from "./utils/validations.ts";
import { populateUsers } from "./initialization.ts";

/* ClICK */
export const navBarClickHandler = (e: Event) => {
  const linkElement = e.target as HTMLLIElement;
  const isLink = linkElement.matches(navLink);
  if (isLink) {
    const elementToOpen = document.getElementById(linkElement.dataset.open!);
    elementToOpen?.classList.add(isVisible);
    setActive(navLink, linkElement);
  }
};

export const closeButtonOnClick = (e: Event) => {
  const element = e.target as HTMLDivElement;
  const parentToClose = element.closest(dataClose)!;
  parentToClose.classList.remove(isVisible);
};

export const handlePortfolioNavFilter = (value: string) => {
  portfolioCards.forEach((card) => {
    if (value === "all") card.style.display = "block";
    else if (value.includes(card.dataset.filter!)) card.style.display = "block";
    else card.style.display = "none";
  });
};

export const handlePortfolioNavClick = (e: Event) => {
  const navElement = e.target as HTMLElement;
  const isDataFilter = navElement.matches(`${dataFilter}`);
  const isDataMode = navElement.matches(`${dataMode}`);
  if (isDataFilter) {
    clearSearchInput();
    setActive(dataFilter, navElement);
    const dataset = navElement.dataset.filter!;
    handlePortfolioNavFilter(dataset);
  }

  if (isDataMode) {
    switch (navElement.dataset.mode) {
      case "gallery":
        portfolioSection.classList.remove(carousel);
        break;
      case "carousel":
        portfolioSection.classList.add(carousel);
        break;
    }
  }
};

export const documentClickHandler = (e: Event) => {
  const document = e.target as HTMLElement;

  const isDropdownButton = document.matches(dataDropdownButton);
  const dropDownParent = document.closest(dataDropdown)!;

  const isModalOverlay = document.matches(`.${modalOverlayClass}`);

  /* DROPDOWN MENUS */
  if (!isDropdownButton && dropDownParent != null) return;

  if (isDropdownButton) {
    dropDownParent.classList.toggle(active);
  }

  document.querySelectorAll(`${dataDropdown}.${active}`).forEach((dropdown) => {
    if (dropdown === dropDownParent) return;
    dropdown.classList.remove(active);
  });

  /* MODALS */
  if (isModalOverlay) {
    document.classList.remove(isVisible);
  }
};

/* KEYUP */

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

export const inputKeyUpHandler = (inputField: HTMLInputElement) => {
  if (hasSubmitted) handleInputValidation(inputField);
};

export const phoneOnChangeEventHandler =
  (index: number) => (e: KeyboardEvent) => {
    const inputElement = e.target as HTMLInputElement;
    const value = inputElement.value;
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

/* SUBMIT */
export const formSubmitHandler = (e: SubmitEvent) => {
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
