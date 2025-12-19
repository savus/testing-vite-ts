import {
  active,
  carousel,
  dataClose,
  dataDropdown,
  dataDropdownButton,
  dataFilter,
  dataMode,
  isVisible,
  modalOverlayClass,
  navLink,
  portfolioCards,
  portfolioSection,
} from "./index.ts";
import { clearSearchInput, setActive } from "./helper-functions.ts";

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

  if (!isDropdownButton && dropDownParent != null) return;

  if (isDropdownButton) {
    dropDownParent.classList.toggle(active);
  }

  document.querySelectorAll(`${dataDropdown}.${active}`).forEach((dropdown) => {
    if (dropdown === dropDownParent) return;
    dropdown.classList.remove(active);
  });

  if (isModalOverlay) {
    document.classList.remove(isVisible);
  }
};

/* KEYUP */
