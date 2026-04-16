import type { UserDto } from "../../types/user";
import { apiClient } from "../axios";
import { GET_USER, SIGN_IN, SIGN_OUT } from "../endpoints";
import type { ISignIn } from "../types/user";

export const signIn = async (credentials: ISignIn): Promise<void> => {
  await apiClient.post(SIGN_IN, credentials);
};
export const signOut = async (): Promise<void> => {
  await apiClient.get(SIGN_OUT);
};
export const getCurrentUser = async (): Promise<UserDto> => {
  const response = await apiClient.get(GET_USER);
  return response.data;
};
