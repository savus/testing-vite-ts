import type { TUser } from "../types";

const BASE_URL = "http://localhost:3000";
const usersEndpoint = "users";

export const Requests = {
  getAllUsers: (): Promise<TUser[]> =>
    fetch(`${BASE_URL}/${usersEndpoint}`).then((response) => response.json()),

  postUser: (body: Omit<TUser, "id">) =>
    fetch(`${BASE_URL}/${usersEndpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((response) => response.json()),
};
