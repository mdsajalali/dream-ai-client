import React from "react";
import { Download, Share2, Copy, Heart } from "lucide-react";
import Container from "@/components/shared/Container";

const images = [
  {
    id: 1,
    url: "https://i.pinimg.com/736x/be/1b/75/be1b75b50475a53d3bb802a3e64c15e6.jpg",
    creator: "Sajal",
    createdAt: "2025-01-30 10:00 AM",
  },
  {
    id: 2,
    url: "https://i.pinimg.com/736x/be/1b/75/be1b75b50475a53d3bb802a3e64c15e6.jpg",
    creator: "Alex",
    createdAt: "2025-01-30 11:15 AM",
  },
  {
    id: 3,
    url: "https://i.pinimg.com/736x/be/1b/75/be1b75b50475a53d3bb802a3e64c15e6.jpg",
    creator: "Emma",
    createdAt: "2025-01-30 12:30 PM",
  },
  {
    id: 4,
    url: "https://i.pinimg.com/736x/be/1b/75/be1b75b50475a53d3bb802a3e64c15e6.jpg",
    creator: "Noah",
    createdAt: "2025-01-30 01:45 PM",
  },
  {
    id: 5,
    url: "https://i.pinimg.com/736x/be/1b/75/be1b75b50475a53d3bb802a3e64c15e6.jpg",
    creator: "Liam",
    createdAt: "2025-01-30 03:00 PM",
  },
];

const ImagesPage = () => {
  return (
    <Container>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((image) => (
          <div key={image.id} className="bg-white p-4 rounded-lg shadow-lg">
            <img
              src={image.url}
              alt="Generated"
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="mt-3 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Created by: {image.creator}
              </p>
              <p className="text-sm text-gray-500">{image.createdAt}</p>
            </div>
            <div className="flex items-center gap-4 mt-3">
              <Download className="w-5 h-5 cursor-pointer text-gray-600 hover:text-black" />
              <Share2 className="w-5 h-5 cursor-pointer text-gray-600 hover:text-black" />
              <Copy className="w-5 h-5 cursor-pointer text-gray-600 hover:text-black" />
              <Heart className="w-5 h-5 cursor-pointer text-gray-600 hover:text-red-500" />
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default ImagesPage;
