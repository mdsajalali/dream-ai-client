"use client";
import Container from "@/components/shared/Container";
import ImageCard from "@/components/shared/ImageCard"; 
import { FavoriteProps } from "@/types/index.type";
import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useState } from "react";

const ImagesPage = () => {
  const [favorites, setFavorites] = useState<FavoriteProps[]>([]);

  console.log("favorites", favorites);

  useEffect(() => {
    axiosInstance
      .get("/favorite/mine")
      .then((res) => {
        setFavorites(res?.data?.data?.favorites || []);
      })
      .catch(() => {});
  }, []);

  return (
    <Container>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {favorites.map((fav) => (
          <ImageCard key={fav._id} image={fav.image} />
        ))}
      </div>
    </Container>
  );
};

export default ImagesPage;
