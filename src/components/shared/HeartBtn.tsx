import { useFav } from "@/context/FavoriteContext";
import { Heart } from "lucide-react";
import React, { useEffect, useState } from "react";

const HeartBtn = ({ imageId }: { imageId: string }) => {
  const [inFavorite, setInFavorite] = useState(false);

  const { handleFavList, handleRemoveFavList, existsInFavorite } = useFav();

  const alreadyFavorited = existsInFavorite(imageId);

  const addToFav = () => {
    setInFavorite(true);
    handleFavList(imageId);
  };

  const removeFromFav = () => {
    handleRemoveFavList(imageId);
    setInFavorite(false);
  };

  useEffect(() => {
    setInFavorite(alreadyFavorited);
  }, [alreadyFavorited]);

  return (
    <Heart
      onClick={alreadyFavorited ? removeFromFav : addToFav}
      className="h-5 w-5 cursor-pointer text-gray-600 hover:text-black dark:text-white"
      fill={inFavorite ? "#ff0000" : "none"}
      stroke={inFavorite ? "#ff0000" : "#fff"}
    />
  );
};

export default HeartBtn;
