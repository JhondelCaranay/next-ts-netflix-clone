import fetcher from "@/lib/fetcher";
import useSwr from "swr";

export type CurrentUser = {
  id: string;
  name: string;
  email: string;
  image: string;
  createdAt: string;
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
