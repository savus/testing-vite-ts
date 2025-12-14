export type TUser = {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  email: string;
  phone: string;
};

export type TUserInformation = Omit<TUser, "id"> | null;
export type TSetUserInformation = (data: TUserInformation) => void;

export type TSetPhoneInputs = (array: string[]) => void;
