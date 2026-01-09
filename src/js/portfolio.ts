import { CSS_STYLES, portfolioCards } from "./index.ts";
import type { TPortfolioCard, TPortfolioCards } from "../types";
import { removeActive, setActive } from "./helper-functions";
import { PortfolioCards } from "./PortfolioCards";

const searchId = "search";
const dataFilter = "[data-filter]";
const dataMode = "[data-mode]";

const MODES = {
  CAROUSEL: "carousel",
  GALLERY: "gallery",
};

const portfolioSectionClass = "portfolio-section";
const portfolioClass = "portfolio-grid";
const portfolioCardClass = "portfolio-card";
const portfolioNavClass = "portfolio-nav";

const portfolioSection = document.querySelector(`.${portfolioSectionClass}`)!;
const searchInput = document.getElementById(searchId) as HTMLInputElement;
const portfolioNav = document.querySelector(`.${portfolioNavClass}`)!;
const portfolioGrid = document.querySelector(`.${portfolioClass}`)!;

const createPortfolioCard = ({
  img,
  altText,
  headerText,
  popupText,
  filter,
}: TPortfolioCard) => {
  // <div class="portfolio-card">
  const card = document.createElement("div");
  card.className = "portfolio-card";
  card.setAttribute("data-filter", filter);
  //         <div class="card-body">
  const cardBody = document.createElement("div");
  cardBody.className = "card-body";
  //           <img src="./assets/week 8 image assets/portfolio-1.jpg" alt="" />
  const imgElement = document.createElement("img");
  imgElement.src = img;
  imgElement.alt = altText;
  //           <div class="popup-box">
  const popupBox = document.createElement("div");
  popupBox.className = "popup-box";
  //             <h3 class="popup-header">Web Development</h3>
  const h3 = document.createElement("h3");
  h3.className = "popup-header";
  h3.innerText = headerText;
  //             <div class="popup-content">Skate Website</div>
  const popupContent = document.createElement("div");
  popupContent.className = "popup-content";
  popupContent.innerHTML = popupText;
  //           </div>
  popupBox.append(h3, popupContent);
  //         </div>
  cardBody.append(imgElement, popupBox);

  //       </div>
  card.appendChild(cardBody);
  return card;
};

export const populatePortfolioCards = async () => {
  PortfolioCards.forEach((card) => {
    const cardElement = createPortfolioCard(card);
    portfolioGrid.appendChild(cardElement);
  });
  return portfolioGrid.querySelectorAll(
    `.${portfolioCardClass}`
  ) as TPortfolioCards;
};

const handlePortfolioNavFilter = (value: string) => {
  portfolioCards.forEach((card) => {
    if (value === "all" || value.length === 0)
      card.style.display = CSS_STYLES.DISPLAY.BLOCK;
    else if (value.includes(card.dataset.filter!))
      card.style.display = CSS_STYLES.DISPLAY.BLOCK;
    else card.style.display = CSS_STYLES.DISPLAY.NONE;
  });
};

export const clearSearchInput = () => {
  searchInput.value = "";
};

const displayAllCards = () =>
  portfolioCards.forEach(
    (card) => (card.style.display = CSS_STYLES.DISPLAY.BLOCK)
  );

const handlePortfolioNavClick = (e: Event) => {
  const navElement = e.target as HTMLElement;
  const isDataFilter = navElement.matches(`${dataFilter}`);
  const isDataMode = navElement.matches(`${dataMode}`);

  const handleDataFilterClick = () => {
    clearSearchInput();
    setActive(dataFilter, navElement);
    const dataset = navElement.dataset.filter!;
    handlePortfolioNavFilter(dataset);
  };

  const handleDataModeClick = () => {
    displayAllCards();
    switch (navElement.dataset.mode) {
      case MODES.GALLERY:
        portfolioSection.classList.remove(MODES.CAROUSEL);
        break;
      case MODES.CAROUSEL:
        portfolioSection.classList.add(MODES.CAROUSEL);
        break;
    }
  };

  if (isDataFilter) handleDataFilterClick();

  if (isDataMode) {
    handleDataModeClick();
  }
};

const searchOnKeyUp = (e: KeyboardEvent) => {
  const searchElement = e.target as HTMLInputElement;
  removeActive(dataFilter);
  handlePortfolioNavFilter(searchElement.value);
};

searchInput.addEventListener("keyup", searchOnKeyUp);

portfolioNav.addEventListener("click", handlePortfolioNavClick);
