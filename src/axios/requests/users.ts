import type { UserDto } from "../../types/user";
import { apiClient } from "../axios";
import { GET_ALL_USERS } from "../endpoints";

export const getAllUsers = async (): Promise<UserDto[]> => {
  const response = await apiClient.get(GET_ALL_USERS);
  return response.data;
};