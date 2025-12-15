import type { TPhoneInputs } from "../types.ts";
import { active, formInputs, phoneInputs, searchInput } from "./index.ts";

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
