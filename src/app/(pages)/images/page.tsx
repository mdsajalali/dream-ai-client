"use client";
import { useEffect, useState } from "react";
import Container from "@/components/shared/Container";
import ImageCard from "@/components/shared/ImageCard";
import axiosInstance from "@/utils/axiosInstance";

import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import lgThumbnail from "lightgallery/plugins/thumbnail";

// Import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
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
      <LightGallery
        plugins={[lgZoom, lgThumbnail]}
        speed={500}
        elementClassNames="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        // mode="lg-fade"
      >
        {images?.map((image: SingleImageCardProps) => (
          <a key={image?._id} href={image?.imageUrl} data-src={image?.imageUrl}>
            <ImageCard image={image} />
          </a>
        ))}
      </LightGallery>
    </Container>
  );
};

export default ImagesPage;
