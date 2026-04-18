import type { RegisterUserDto, UserDto } from "../../types/user";
import { apiClient } from "../axios";
import {
  DELETE_USER_BY_ID,
  GET_ALL_USERS,
  GET_USER_BY_ID,
  REGISTER,
  UPDATE_USER,
} from "../endpoints";

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

export const updateUser = async (
  userId: string,
  data: UserDto,
): Promise<void> => {
  const url = UPDATE_USER.replace("{userId}", userId);

  await apiClient.put(url, data);
};

export const registerUser = async (payload: RegisterUserDto): Promise<void> => {
  await apiClient.post(REGISTER, payload);
};
export const deleteUserById = async (userId: string): Promise<void> => {
  const url = DELETE_USER_BY_ID.replace("{userId}", userId);

  await apiClient.delete(url);
};
