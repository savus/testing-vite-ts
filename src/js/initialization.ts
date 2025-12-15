import type { TPortfolioCard, TUser } from "../types.ts";
import { createUserElement } from "./helper-functions.ts";
import { allUsers, cityDatalist, portfolioGrid, usersList } from "./index.ts";
import { PortfolioCards } from "./PortfolioCards.ts";
import { cities } from "./utils/allCities.ts";

export const populateCities = () =>
  cities.forEach((city) => {
    const option = document.createElement("option");
    option.innerHTML = city;
    cityDatalist.appendChild(option);
  });

export const createPortfolioCard = ({
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

export const populatePortfolioCards = () => {
  PortfolioCards.forEach((card) => {
    const cardElement = createPortfolioCard(card);
    portfolioGrid.appendChild(cardElement);
  });
};

export const populateUsers = () => {
  usersList.innerHTML = "";
  allUsers.forEach((user) => {
    usersList.innerHTML += createUserElement(user);
  });
};
