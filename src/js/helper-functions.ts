import type { TPhoneInputs, TUser } from "../types.ts";
import { Requests } from "./api.ts";
import {
  active,
  formInputs,
  phoneInputs,
  searchInput,
  setAllUsers,
} from "./index.ts";

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

export const refetchData = () => Requests.getAllUsers().then(setAllUsers);

export const createUser = (body: Omit<TUser, "id">) =>
  Requests.postUser(body).then(refetchData);

export const createUserElement = (user: TUser) => {
  const { firstName, lastName, city, email, phone } = user;
  const userElement = document.createElement("li");
  const firstNameElement = document.createElement("div");
  const lastNameElement = document.createElement("div");
  const cityElement = document.createElement("div");
  const emailElement = document.createElement("div");
  const phoneElement = document.createElement("div");

  firstNameElement.innerText = firstName;
  lastNameElement.innerText = lastName;
  cityElement.innerText = city;
  emailElement.innerText = email;
  phoneElement.innerText = phone;

  userElement.append(
    firstNameElement,
    lastNameElement,
    cityElement,
    emailElement,
    phoneElement
  );

  return userElement;
};
