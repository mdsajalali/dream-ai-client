"use client";
import { useEffect, useState } from "react";
import Container from "@/components/shared/Container";
import ImageCard from "@/components/shared/ImageCard";
import axiosInstance from "@/utils/axiosInstance";
import { SingleImageCardProps } from "@/types/index.type";

const ImagesPage = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/discover-image")
      .then((res) => {
        setImages(res?.data?.images);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading
          ? Array(6)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-200 w-full h-64 rounded-md animate-pulse"
                >
                  <div className="w-full h-full bg-gray-600 rounded-md"></div>
                </div>
              ))
          : images?.map((image: SingleImageCardProps) => (
              <ImageCard key={image?._id} image={image} />
            ))}
      </div>
    </Container>
  );
};

export default ImagesPage;
