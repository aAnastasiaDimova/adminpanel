import { useQuery } from "@tanstack/react-query";
import { API } from "../../axios";
import { usersKeys } from "../keys";
import type { UserDto } from "../../types/user";

export const useUsers = () => {
  return useQuery<UserDto[]>({
    queryKey: usersKeys.all,
    queryFn: async () => {
      const users = await API.users.getAllUsers();
      return users;
    },
    // staleTime: 0,
    // refetchOnMount: true,
    // refetchOnWindowFocus: true,
    // retry: false,
  });
};