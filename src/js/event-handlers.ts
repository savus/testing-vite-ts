import { setActive } from "./helper-functions.ts";
import {
  active,
  dataClose,
  dataDropdown,
  dataDropdownButton,
  isVisible,
  modalOverlayClass,
  navLink,
} from "./index.ts";

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

export const documentClickHandler = (e: Event) => {
  const documentElement = e.target as HTMLElement;
  const isDropdownButton = documentElement.matches(dataDropdownButton);
  const dropDownParent = documentElement.closest(dataDropdown)!;
  const isModalOverlay = documentElement.matches(`.${modalOverlayClass}`);

  if (!isDropdownButton && dropDownParent !== null) return;

  if (isDropdownButton) {
    dropDownParent.classList.toggle(active);
  }

  document.querySelectorAll(`${dataDropdown}.${active}`).forEach((dropdown) => {
    if (dropdown === dropDownParent) return;
    dropdown.classList.remove(active);
  });

  if (isModalOverlay) {
    documentElement.classList.remove(isVisible);
  }
};

/* KEYUP */
