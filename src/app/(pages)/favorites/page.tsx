"use client";

import React, { useEffect, useState } from "react";
import ImageCard from "@/components/shared/ImageCard";
import Container from "@/components/shared/Container";
import axiosInstance from "@/utils/axiosInstance";
import { ImageCardProps } from "@/types/index.type";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const response = await axiosInstance.get("favorite/my-list", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFavorites(response?.data?.data?.favorites);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <Container>
      <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3">
        {loading ? (
          Array(9)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="h-64 w-full animate-pulse rounded-md bg-gray-200"
              />
            ))
        ) : favorites && favorites.length > 0 ? (
          favorites.map((image: ImageCardProps) => {
            const imageData = image?.image;
            return <ImageCard key={imageData?._id} image={imageData} />;
          })
        ) : (
          <p className="col-span-full text-center text-gray-500 dark:text-white">
            No favorites added yet.
          </p>
        )}
      </div>
    </Container>
  );
};

export default FavoritesPage;
