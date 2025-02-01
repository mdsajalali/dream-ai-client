"use client";
import { useEffect, useState } from "react";
import Container from "@/components/shared/Container";
import ImageCard from "@/components/shared/ImageCard";
import axiosInstance from "@/utils/axiosInstance";
import { SingleImageCardProps } from "@/types/index.type";

const ImagesPage = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/discover-image")
      .then((res) => {
        setImages(res?.data?.images);
      })
      .catch(() => {});
  }, []);

  return (
    <Container>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images?.map((image: SingleImageCardProps) => (
          <ImageCard key={image?._id} image={image} />
        ))}
      </div>
    </Container>
  );
};

export default ImagesPage;
