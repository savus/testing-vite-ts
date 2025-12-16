import type { TRegexPatterns } from "../../types";

export const patterns: TRegexPatterns = {
  username: /^[a-zA-Z]{2,20}([\s]*)?$/,
  email: /^([a-zA-Z\d.-]+)@([a-z.-]+)(\.[a-z]{2,8})(\.[a-z]{2,8})?([\s]*)?$/,
  city: /^([a-zA-Z]+)([\s]*)?$/,
  phone: /^\d{10}$/,
};

export const validateField = (inputValue: string, regex: string) =>
  patterns[regex].test(inputValue);

export const toggleErrorMessage = (
  inputField: HTMLInputElement,
  isValid: boolean
) => {
  const parentContainer = inputField.closest(".text-input")!;
  if (isValid) parentContainer.classList.remove("invalid");
  else parentContainer.classList.add("invalid");
};
