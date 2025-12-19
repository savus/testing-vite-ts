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
const dataPhone = "data-phone";
const cities = "cities";
export const carousel = "carousel";

export const navLink = ".nav-link";
const nav = ".nav-js";

export const dataDropdownButton = `[data-dropdown-button]`;
export const dataClose = "[data-close]";
export const dataDropdown = "[data-dropdown]";
export const dataFilter = "[data-filter]";
const dataSlide = "[data-slide]";
export const dataMode = "[data-mode]";

const firstNameId = "first-name-input";
const lastNameId = "last-name-input";
const emailId = "email-input";
const cityId = "city-input";
const searchId = "search";
const modalFormId = "modal-form-js";
const closeButton = "close-button";

const portfolioSectionClass = "portfolio-section";
const portfolioClass = "portfolio-grid";
export const portfolioCardClass = "portfolio-card";
const sliderClass = "carousel-btns";
const portfolioNavClass = "portfolio-nav";
export const modalOverlayClass = "modal-overlay";

export let hasSubmitted = false;
export let userInformation: TUserInformation = null;
export let doBadInputsExist = false;

const navBar = document.querySelector(nav)!;
const userForm = document.getElementById(modalFormId)!;
export const firstNameInput = document.getElementById(
  firstNameId
) as HTMLInputElement;
export const lastNameInput = document.getElementById(
  lastNameId
) as HTMLInputElement;
export const emailInput = document.getElementById(emailId) as HTMLInputElement;
export const cityInput = document.getElementById(cityId) as HTMLInputElement;
export const phone1 = document.querySelector(
  `[${dataPhone}='1']`
) as HTMLInputElement;
export const phone2 = document.querySelector(
  `[${dataPhone}='2']`
) as HTMLInputElement;
export const phone3 = document.querySelector(
  `[${dataPhone}='3']`
) as HTMLInputElement;

export const formInputs = [
  firstNameInput,
  lastNameInput,
  emailInput,
  cityInput,
];
export const phoneInputs: TPhoneInputs = [phone1, phone2, phone3];
export const maxInputLengths = [3, 3, 4];
export let allUsers: TUser[];

export const cityDatalist = document.getElementById(cities)!;
export const portfolioSection = document.querySelector(
  `.${portfolioSectionClass}`
)!;
export const searchInput = document.getElementById(
  searchId
) as HTMLInputElement;
const portfolioNav = document.querySelector(`.${portfolioNavClass}`)!;
export const portfolioGrid = document.querySelector(`.${portfolioClass}`)!;
export const portfolioCards = populatePortfolioCards();
const carouselSlider = document.querySelector(`.${sliderClass}`)!;
const closeButtons = document.querySelectorAll(`.${closeButton}`);
export const usersList = document.querySelector(".users")!;

export const setHasSubmitted = (state: boolean) => (hasSubmitted = state);
export const setUserInformation = (data: TUserInformation) =>
  (userInformation = data);
export const setPhoneInputs = (array: string[]) => {
  array.forEach((val, index) => {
    phoneInputs[index].value = val;
  });
};
export const setDoBadInputsExist = (boolean: boolean) =>
  (doBadInputsExist = boolean);
export const setAllUsers: TSetAllUsers = (users) => (allUsers = [...users]);
// =========================

/* INITIALIZATION */

clearSearchInput();
clearFormValues();
populateCities();
refetchData().then(populateUsers);
initCurrentIndex();

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
