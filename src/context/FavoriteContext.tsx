import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "sonner";

interface FavContextType {
  handleFavList: (imageId: string) => Promise<void>;
  handleRemoveFavList: (imageId: string) => Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  favorites: any;
  existsInFavorite: (imageId: string) => boolean;
}

const FavContext = createContext<FavContextType | undefined>(undefined);

interface FavProviderProps {
  children: ReactNode;
}

export const FavProvider = ({ children }: FavProviderProps) => {
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      return;
    }

    const result = await axiosInstance.get("favorite/my-list", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (result.data?.data) {
      setFavorites(result.data?.data?.favorites);
    } else {
      setFavorites([]);
    }
  };

  const handleFavList = async (imageId: string) => {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        toast.error("Authentication token is missing");
        return;
      }

      await axiosInstance.post(
        "favorite/create-favorite",
        { imageId },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );

      toast.success("Favlist added successfully");
      loadFavorites();
    } catch (error) {
      console.error("Error adding to favorite:", error);
      toast.error("Failed to add to Favlist");
    }
  };

  const handleRemoveFavList = async (imageId: string) => {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        toast.error("Authentication token is missing");
        return;
      }

      await axiosInstance.delete(`/favorite/remove-favorite/${imageId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          imageId,
        },
      });

      toast.success("Favorite item removed successfully");
      loadFavorites();
    } catch (error) {
      console.error("Error removing from favorite:", error);
      toast.error("Failed to remove from Favlist");
    }
  };

  const existsInFavorite = (imageId: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fav = favorites.find((img: any) => {
      return img.image._id === imageId;
    });

    return !!fav;
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <FavContext.Provider
      value={{
        handleFavList,
        handleRemoveFavList,
        favorites,
        existsInFavorite,
      }}
    >
      {children}
    </FavContext.Provider>
  );
};

export const useFav = (): FavContextType => {
  const context = useContext(FavContext);
  if (!context) {
    throw new Error("useFav must be used within a FavProvider");
  }
  return context;
};
