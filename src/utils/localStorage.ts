// src/utils/localStorage.ts
import { User } from "../types/user";

export const getUsersFromLocalStorage = (): User[] => {
  if (typeof window !== "undefined") {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : [];
  }
  return [];
};

export const saveUsersToLocalStorage = (users: User[]): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("users", JSON.stringify(users));
  }
};
