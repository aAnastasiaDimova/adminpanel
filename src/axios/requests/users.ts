import type { UserDto } from "../../types/user";
import { apiClient } from "../axios";
import { GET_ALL_USERS, GET_USER_BY_ID } from "../endpoints";

export const getAllUsers = async (): Promise<UserDto[]> => {
  const response = await apiClient.get(GET_ALL_USERS);
  return response.data;
};

export const getUserById = async (userId: string): Promise<UserDto> => {
  const url = GET_USER_BY_ID.replace("{userId}", userId);
  console.log("getUserById url:", url);

  const response = await apiClient.get(url);
  return response.data;
};