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
const cities = "cities";
const portfolioClass = "portfolio-grid";
const portfolioCardClass = "portfolio-card";
const searchId = "search";
const portfolioNavClass = "portfolio-nav";

const navBar = document.querySelector(nav);

/*MODAL FORM*/
export let hasSubmitted = false;
export const setHasSubmitted = (state) => (hasSubmitted = state);
const userForm = document.getElementById("modal-form-js");
export let userInformation = null;
export const setUserInformation = (data) => (userInformation = data);
export const firstNameInput = document.getElementById(firstNameId);
export const lastNameInput = document.getElementById(lastNameId);
export const emailInput = document.getElementById("email-input");
export const cityInput = document.getElementById("city-input");
export const formInputs = [
  firstNameInput,
  lastNameInput,
  emailInput,
  cityInput,
];
export const phone1 = document.querySelector(`[${dataPhone}='1']`);
export const phone2 = document.querySelector(`[${dataPhone}='2']`);
export const phone3 = document.querySelector(`[${dataPhone}='3']`);
export const phoneInputs = [phone1, phone2, phone3];
export const setPhoneInputs = (array) =>
  array.forEach((value, index) => (phoneInputs[index].value = value));
export const maxInputLengths = [3, 3, 4];
export let doBadInputsExist = false;
export const setDoBadInputsExist = (boolean) => (doBadInputsExist = boolean);
const closeButton = "close-button";
const closeButtons = document.querySelectorAll(`.${closeButton}`);
export const cityDatalist = document.getElementById(cities);

/* PORTFOLIO */
export const searchInput = document.getElementById(searchId);
const portfolioNav = document.querySelector(`.${portfolioNavClass}`);
console.log(portfolioNav);

export const portfolioGrid = document.querySelector(`.${portfolioClass}`);
populatePortfolioCards();
export const portfolioCards = document.querySelectorAll(
  `.${portfolioCardClass}`
);

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

phoneInputs.forEach((input, index) => {
  input.addEventListener("keyup", phoneOnChangeEventHandler(index));
});

userForm.addEventListener("submit", formSubmitHandler);

searchInput.addEventListener("keyup", ({ target: { value } }) => {
  removeActive(dataFilter);
  handlePortfolioNavFilter(value);
});

portfolioNav.addEventListener("click", ({ target }) => {
  const isDataFilter = target.matches(`${dataFilter}`);
  if (isDataFilter) {
    clearSearchInput();
    setActive(dataFilter, target);
    const dataset = target.dataset.filter;
    handlePortfolioNavFilter(dataset);
  }
});

/* GLOBAL */
document.addEventListener("click", documentClickHandler);

/* TESTING */
clearSearchInput();
clearFormValues();

/** */
