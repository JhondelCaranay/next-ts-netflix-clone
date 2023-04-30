import fetcher from "@/lib/fetcher";
import { Role } from "@prisma/client";
import useSwr from "swr";

export type CurrentUser = {
  image: string | null;
  favoriteIds: string[];
  id: string;
  name: string;
  email: string | null;
  createdAt: Date;
  role: Role;
};

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSwr<CurrentUser, Error>("/api/current", fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCurrentUser;
