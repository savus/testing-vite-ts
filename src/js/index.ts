import "../css/base.css";
import "../css/index.css";
import "../css/header.css";
import "../css/navbar.css";
import "../css/portfolio-section.css";
import "../css/modal-form.css";

import {
  closeButtonOnClick,
  documentClickHandler,
  navBarClickHandler,
} from "./event-handlers.ts";
import { refetchData } from "./helper-functions.ts";
import { populateCities, populateUsers } from "./initialization.ts";
import type { TSetAllUsers, TUser, TUserInformation } from "../types.ts";
import { initCurrentIndex } from "./carousel.ts";
import { clearFormValues } from "./form.ts";
import { clearSearchInput, populatePortfolioCards } from "./portfolio.ts";

export const active = "active";
export const isVisible = "is-visible";
const cities = "cities";

export const dataDropdownButton = `[data-dropdown-button]`;
export const dataClose = "[data-close]";
export const dataDropdown = "[data-dropdown]";

const nav = ".nav-js";
export const navLink = ".nav-link";
const closeButton = "close-button";

export const modalOverlayClass = "modal-overlay";

export let userInformation: TUserInformation = null;
export let allUsers: TUser[];

const navBar = document.querySelector(nav)!;

export const portfolioCards = await populatePortfolioCards();

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
initCurrentIndex();

document.addEventListener("click", documentClickHandler);

navBar.addEventListener("click", navBarClickHandler);

closeButtons.forEach((button) => {
  button.addEventListener("click", closeButtonOnClick);
});

/* TESTING */

/** */
