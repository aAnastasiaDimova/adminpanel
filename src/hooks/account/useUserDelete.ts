import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../../axios";
import { usersKeys } from "../keys";

export const useUserDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      await API.users.deleteUserById(userId);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: usersKeys.all,
      });
    },
  });
};