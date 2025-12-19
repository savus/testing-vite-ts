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
  handlePortfolioNavClick,
  handlePortfolioNavFilter,
  inputKeyUpHandler,
  navBarClickHandler,
  phoneOnChangeEventHandler,
} from "./event-handlers.ts";
import {
  clearFormValues,
  clearSearchInput,
  refetchData,
  removeActive,
} from "./helper-functions.ts";
import {
  populateCities,
  populatePortfolioCards,
  populateUsers,
} from "./initialization.ts";
import type {
  TPhoneInputs,
  TSetAllUsers,
  TUser,
  TUserInformation,
} from "../types.ts";
import { goToNext, goToPrev, initCurrentIndex } from "./portfolio-grid.ts";

export const active = "active";
export const isVisible = "is-visible";
export const dataClose = "[data-close]";
export const dataDropdownButton = `[data-dropdown-button]`;
export const dataDropdown = "[data-dropdown]";
export const dataFilter = "[data-filter]";
const dataSlide = "[data-slide]";
export const dataMode = "[data-mode]";
const nav = ".nav-js";
export const navLink = ".nav-link";
const dataPhone = "data-phone";
const firstNameId = "first-name-input";
const lastNameId = "last-name-input";
const emailId = "email-input";
const cityId = "city-input";
const cities = "cities";
const portfolioSectionClass = "portfolio-section";
const portfolioClass = "portfolio-grid";
export const portfolioCardClass = "portfolio-card";
const sliderClass = ".carousel-btns";
const searchId = "search";
const portfolioNavClass = "portfolio-nav";
export const carousel = "carousel";
export const modalOverlayClass = "modal-overlay";
const modalFormId = "modal-form-js";

const navBar = document.querySelector(nav)!;

export let hasSubmitted = false;
export const setHasSubmitted = (state: boolean) => (hasSubmitted = state);

const userForm = document.getElementById(modalFormId)!;

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

export const portfolioSection = document.querySelector(
  `.${portfolioSectionClass}`
)!;
console.log(portfolioSection);
export const searchInput = document.getElementById(
  searchId
) as HTMLInputElement;
const portfolioNav = document.querySelector(`.${portfolioNavClass}`)!;
export const portfolioGrid = document.querySelector(`.${portfolioClass}`)!;
export const portfolioCards = populatePortfolioCards();
const carouselSlider = document.querySelector(sliderClass)!;

export let allUsers: TUser[];
export const setAllUsers: TSetAllUsers = (users) => (allUsers = [...users]);
export const usersList = document.querySelector(".users")!;

// =========================

/* INITIALIZATION */

clearSearchInput();
clearFormValues();
populateCities();
refetchData().then(populateUsers);
initCurrentIndex();

/* EVENT LISTENERS */
document.addEventListener("click", documentClickHandler);

navBar.addEventListener("click", navBarClickHandler);

closeButtons.forEach((button) => {
  button.addEventListener("click", closeButtonOnClick);
});

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

portfolioNav.addEventListener("click", handlePortfolioNavClick);

carouselSlider.addEventListener("click", (e: Event) => {
  const button = e.target as HTMLButtonElement;
  const isSliderBtn = button.matches(dataSlide);
  if (isSliderBtn) button.dataset.slide === "prev" ? goToPrev() : goToNext();
});
/* TESTING */

// const wait = new Promise((resolve) => {
//   return setTimeout(resolve, 100);
// });

/** */
