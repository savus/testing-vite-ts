export type TUser = {
    id: number;
    firstName: string;
    lastName: string;;
    city: string;
    email: string;
    phone: string;
}

export type TUserInformation = TUser | null;

export type TSetUserInformation = (user: TUserInformation) => void;