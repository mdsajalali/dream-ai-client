"use client";
import { useEffect, useState } from "react";
import Container from "@/components/shared/Container";
import ImageCard from "@/components/shared/ImageCard";
import axiosInstance from "@/utils/axiosInstance";
import { SingleImageCardProps } from "@/types/index.type";

const Page = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [images, setImages] = useState<SingleImageCardProps[]>([]);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/discover-image`)
      .then((res) => {
        setImages(res?.data?.images);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container>
      <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3">
        {loading
          ? Array(9)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="h-64 w-full animate-pulse rounded-md bg-gray-200"
                />
              ))
          : images?.map((image) => (
              <ImageCard key={image?._id} image={image} />
            ))}
      </div>
    </Container>
  );
};

export default Page;
