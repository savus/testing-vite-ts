export type TUser = {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  email: string;
  phone: string;
};

export type TUserInformation = Omit<TUser, "id"> | null;

export type TSetUserInformation = (user: TUserInformation) => void;

export type TSetAllUsers = (users: TUser[]) => void;

export type TPortfolioCard = {
  img: string;
  altText: string;
  headerText: string;
  popupText: string;
  filter: string;
};

export type TPhoneInputs = [
  HTMLInputElement,
  HTMLInputElement,
  HTMLInputElement
];

export type TRegexPatterns = {
  [key: string]: RegExp;
};

export type TPortfolioCards = NodeListOf<HTMLDivElement>;
