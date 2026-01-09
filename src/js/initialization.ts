import { createUserElement } from "./helper-functions.ts";
import { allUsers, cityDatalist, usersList } from "./index.ts";
import { cities } from "./utils/allCities.ts";

export const populateCities = () =>
  cities.forEach((city) => {
    const option = document.createElement("option");
    option.innerHTML = city;
    cityDatalist.appendChild(option);
  });

export const populateUsers = (shouldPopulateUsers: boolean) => {
  if (shouldPopulateUsers) {
    usersList.innerHTML = "<div>Users: </div>";
    allUsers.forEach((user) => {
      usersList.appendChild(createUserElement(user));
    });
  }
};
