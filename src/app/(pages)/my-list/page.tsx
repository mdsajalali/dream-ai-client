// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

"use client";

import React, { useEffect, useState } from "react";
import ImageCard from "@/components/shared/ImageCard";
import Container from "@/components/shared/Container";
import axiosInstance from "@/utils/axiosInstance";
import { SingleImageCardProps } from "@/types/index.type";
import JwtDecode from "@/utils/jwtDecode";

const MyListPage = () => {
  const [myImages, setMyImages] = useState<SingleImageCardProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const user = JwtDecode();

  useEffect(() => {
    const fetchMyImages = async () => {
      try {
        const response = await axiosInstance.get(`/images/${user?.id}`);
        setMyImages(response?.data);
      } catch (error) {
        console.error("Error fetching myImages:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchMyImages();
    }
  }, [user?.id]);

  return (
    <Container>
      <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3">
        {loading ? (
          [...Array(9)].map((_, index) => (
            <div
              key={index}
              className="h-64 w-full animate-pulse rounded-md bg-gray-200"
            />
          ))
        ) : myImages.length > 0 ? (
          myImages.map((image) => <ImageCard key={image._id} image={image} />)
        ) : (
          <p className="col-span-full text-center text-gray-500 dark:text-white">
            No posts created yet.
          </p>
        )}
      </div>
    </Container>
  );
};

export default MyListPage;
