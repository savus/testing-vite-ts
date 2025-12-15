import type { TPhoneInputs, TUser } from "../types.ts";
import { Requests } from "./api.ts";
import {
  active,
  allUsers,
  formInputs,
  phoneInputs,
  searchInput,
  setAllUsers,
} from "./index.ts";
import { populateUsers } from "./initialization.ts";

export const setActive = (selector: string, element: HTMLElement) => {
  const activeElement = document.querySelector(`${selector}.${active}`);
  if (activeElement !== null) activeElement.classList.remove(active);
  element.classList.add(active);
};

export const removeActive = (selector: string) => {
  const activeElement = document.querySelector(`${selector}.${active}`);
  if (activeElement !== null) activeElement.classList.remove(active);
};

export const clearPhoneInputs = () => {
  phoneInputs.forEach((input) => (input.value = ""));
};

export const clearFormValues = () => {
  formInputs.forEach((inputField) => (inputField.value = ""));
  clearPhoneInputs();
};

export const getJoinedPhoneInput = (inputs: TPhoneInputs) =>
  inputs.map((input) => input.value).join("");

export const clearSearchInput = () => {
  searchInput.value = "";
};

export const getAllUsers = () => Requests.getAllUsers().then(setAllUsers);

export const postUser = (body: Omit<TUser, "id">) =>
  Requests.postUser(body).then(() => {
    Requests.getAllUsers()
      .then((users) => {
        setAllUsers(users);
      })
      .then(() => {
        populateUsers();
      });
  });

export const createUserElement = (user: TUser) => {
  const { firstName, lastName } = user;
  const userElement = `<li>
    <span class="first-name">${firstName}</span>
    :
    <span class="last-name">${lastName}</span> 
  </li>`;
  return userElement;
};
