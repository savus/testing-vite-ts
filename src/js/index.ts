import "../css/base.css";
import "../css/index.css";
import "../css/header.css";
import "../css/navbar.css";
import "../css/portfolio-section.css";
import "../css/modal-form.css";

import {
  closeButtonOnClick,
  documentClickHandler,
  handlePortfolioNavClick,
  handlePortfolioNavFilter,
  navBarClickHandler,
} from "./event-handlers.ts";
import {
  clearSearchInput,
  refetchData,
  removeActive,
} from "./helper-functions.ts";
import {
  populateCities,
  populatePortfolioCards,
  populateUsers,
} from "./initialization.ts";
import type { TSetAllUsers, TUser, TUserInformation } from "../types.ts";
import { goToNext, goToPrev, initCurrentIndex } from "./portfolio-grid.ts";
import { clearFormValues } from "./form.ts";

export const active = "active";
export const isVisible = "is-visible";
export const carousel = "carousel";
const cities = "cities";

export const dataDropdownButton = `[data-dropdown-button]`;
export const dataClose = "[data-close]";
export const dataDropdown = "[data-dropdown]";
export const dataFilter = "[data-filter]";
const dataSlide = "[data-slide]";
export const dataMode = "[data-mode]";

const searchId = "search";

const nav = ".nav-js";
export const navLink = ".nav-link";
const closeButton = "close-button";
const portfolioSectionClass = "portfolio-section";
const portfolioClass = "portfolio-grid";
export const portfolioCardClass = "portfolio-card";
const sliderClass = "carousel-btns";
const portfolioNavClass = "portfolio-nav";
export const modalOverlayClass = "modal-overlay";

export let userInformation: TUserInformation = null;
export let allUsers: TUser[];

const navBar = document.querySelector(nav)!;
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
export const cityDatalist = document.getElementById(cities)!;

export const setUserInformation = (data: TUserInformation) =>
  (userInformation = data);

export const setAllUsers: TSetAllUsers = (users) => (allUsers = [...users]);
// =========================

/* INITIALIZATION */

clearSearchInput();
clearFormValues();
populateCities();
refetchData().then(populateUsers);
initCurrentIndex(portfolioCards);

document.addEventListener("click", documentClickHandler);

navBar.addEventListener("click", navBarClickHandler);

closeButtons.forEach((button) => {
  button.addEventListener("click", closeButtonOnClick);
});

searchInput.addEventListener("keyup", ({ target }) => {
  const searchElement = target as HTMLInputElement;
  removeActive(dataFilter);
  handlePortfolioNavFilter(searchElement.value);
});

portfolioNav.addEventListener("click", handlePortfolioNavClick);

carouselSlider.addEventListener("click", (e: Event) => {
  const button = e.target as HTMLButtonElement;
  const isSliderBtn = button.matches(dataSlide);
  if (isSliderBtn)
    button.dataset.slide === "prev"
      ? goToPrev(portfolioCards)
      : goToNext(portfolioCards);
});
/* TESTING */

/** */
