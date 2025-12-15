import "../css/base.css";
import "../css/index.css";
import "../css/header.css";
import "../css/navbar.css";
import "../css/portfolio-section.css";
import "../css/modal-form.css";

import {
  closeButtonOnClick,
  documentClickHandler,
  formSubmitHandler,
  handlePortfolioNavFilter,
  inputKeyUpHandler,
  navBarClickHandler,
  phoneOnChangeEventHandler,
} from "./event-handlers.ts";
import {
  clearFormValues,
  clearSearchInput,
  removeActive,
  setActive,
} from "./helper-functions.ts";
import { populateCities, populatePortfolioCards } from "./initialization.ts";
import type { TPhoneInputs, TUserInformation } from "../types.ts";

/* SELECTORS */
export const active = "active";
export const isVisible = "is-visible";
export const dataClose = "[data-close]";
export const dataDropdownButton = `[data-dropdown-button]`;
export const dataDropdown = "[data-dropdown]";
const dataFilter = "[data-filter]";
const nav = ".nav-js";
export const navLink = ".nav-link";
const dataPhone = "data-phone";
const firstNameId = "first-name-input";
const lastNameId = "last-name-input";
const emailId = "email-input";
const cityId = "city-input";
const cities = "cities";
const portfolioClass = "portfolio-grid";
const portfolioCardClass = "portfolio-card";
const searchId = "search";
const portfolioNavClass = "portfolio-nav";
export const modalOverlayClass = "modal-overlay";

const navBar = document.querySelector(nav)!;

/*MODAL FORM*/
export let hasSubmitted = false;
export const setHasSubmitted = (state: boolean) => (hasSubmitted = state);

const userForm = document.getElementById("modal-form-js")!;

export let userInformation: TUserInformation = null;
export const setUserInformation = (data: TUserInformation) =>
  (userInformation = data);

export const firstNameInput = document.getElementById(
  firstNameId
) as HTMLInputElement;
export const lastNameInput = document.getElementById(
  lastNameId
) as HTMLInputElement;
export const emailInput = document.getElementById(emailId) as HTMLInputElement;
export const cityInput = document.getElementById(cityId) as HTMLInputElement;
export const formInputs = [
  firstNameInput,
  lastNameInput,
  emailInput,
  cityInput,
];

export const phone1 = document.querySelector(
  `[${dataPhone}='1']`
) as HTMLInputElement;
export const phone2 = document.querySelector(
  `[${dataPhone}='2']`
) as HTMLInputElement;
export const phone3 = document.querySelector(
  `[${dataPhone}='3']`
) as HTMLInputElement;

export const phoneInputs: TPhoneInputs = [phone1, phone2, phone3];
export const setPhoneInputs = (array: string[]) => {
  array.forEach((val, index) => {
    phoneInputs[index].value = val;
  });
};

export const maxInputLengths = [3, 3, 4];
export let doBadInputsExist = false;
export const setDoBadInputsExist = (boolean: true | false) =>
  (doBadInputsExist = boolean);

const closeButton = "close-button";
const closeButtons = document.querySelectorAll(`.${closeButton}`);

export const cityDatalist = document.getElementById(cities)!;

/* PORTFOLIO */
export const searchInput = document.getElementById(
  searchId
) as HTMLInputElement;
const portfolioNav = document.querySelector(`.${portfolioNavClass}`)!;

export const portfolioGrid = document.querySelector(`.${portfolioClass}`)!;
populatePortfolioCards();
export const portfolioCards = document.querySelectorAll(
  `.${portfolioCardClass}`
) as NodeListOf<HTMLDivElement>;

navBar.addEventListener("click", navBarClickHandler);

/* MODAL FORM */
closeButtons.forEach((button) => {
  button.addEventListener("click", closeButtonOnClick);
});

/* INITIALIZATION */
populateCities();

formInputs.forEach((input) => {
  input.addEventListener("keyup", () => {
    inputKeyUpHandler(input);
  });
});

phoneInputs.forEach((input, index: number) => {
  input.addEventListener("keyup", phoneOnChangeEventHandler(index));
});

userForm.addEventListener("submit", formSubmitHandler);

searchInput.addEventListener("keyup", ({ target }) => {
  const searchElement = target as HTMLInputElement;
  removeActive(dataFilter);
  handlePortfolioNavFilter(searchElement.value);
});

portfolioNav.addEventListener("click", (e: Event) => {
  const navElement = e.target as HTMLElement;
  const isDataFilter = navElement.matches(`${dataFilter}`);
  if (isDataFilter) {
    clearSearchInput();
    setActive(dataFilter, navElement);
    const dataset = navElement.dataset.filter!;
    handlePortfolioNavFilter(dataset);
  }
});

/* GLOBAL */
document.addEventListener("click", documentClickHandler);

/* TESTING */
clearSearchInput();
clearFormValues();

/** */
