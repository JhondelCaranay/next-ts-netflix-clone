import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import axios from "axios";
import { useCallback, useMemo } from "react";
import { BsCheck, BsPlus } from "react-icons/bs";

type FavoriteButtonProps = {
  movieId: string;
};
const FavoriteButton = ({ movieId }: FavoriteButtonProps) => {
  const { mutate: mutateFavorites } = useFavorites();

  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorites = useCallback(async () => {
    let response: any;

    if (!currentUser) return;

    if (isFavorite) {
      response = await axios.delete(`/api/favorites/${movieId}`, {
        data: { movieId },
      });
    } else {
      response = await axios.post(`/api/favorites/${movieId}`, {
        movieId,
      });
    }

    const updatedFavoriteIds = response?.data?.favoriteIds;

    // mutate({
    //   ...currentUser,
    //   favoriteIds: updatedFavoriteIds,
    // });
    mutate();
    mutateFavorites();
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

  const Icon = isFavorite ? BsCheck : BsPlus;

  return (
    <div
      onClick={toggleFavorites}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
    >
      <Icon className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
    </div>
  );
};
export default FavoriteButton;
