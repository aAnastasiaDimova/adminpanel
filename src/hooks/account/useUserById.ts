import { useQuery } from "@tanstack/react-query";
import { API } from "../../axios";

export const useUserById = (
  userId: string | null,
  enabled: boolean
) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => API.users.getUserById(userId as string),
    enabled: enabled && Boolean(userId),
  });
};