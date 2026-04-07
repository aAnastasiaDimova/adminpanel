import type { UserProfile } from "../../types/user";
import { apiClient } from "../axios";
import { GET_USER, SIGN_IN, SIGN_OUT } from "../endpoints";
import type { ISignIn } from "../types/user";

////////// Взаимодействие по информации о пользователе //////////

// Вход
export const signIn = async (credentials: ISignIn): Promise<void> => {
  await apiClient.post(SIGN_IN, credentials);
};
// Выход
export const signOut = async (): Promise<void> => {
  await apiClient.get(SIGN_OUT);
};
// Получить текущего опльзователя
export const getCurrentUser = async (): Promise<UserProfile> => {
  const response = await apiClient.get(GET_USER);
  return response.data;
};
