import { ImageCardProps } from "@/types/index.type";
import { Download, Share2, Copy, Heart } from "lucide-react";



const ImageCard = ({ image }: ImageCardProps) => {
  return (
    <div key={image.id} className="bg-white p-4 rounded-lg shadow-lg">
      <img
        src={image.url}
        alt="Generated"
        className="w-full h-48 object-cover rounded-lg"
      />
      <div className="mt-3 flex items-center justify-between">
        <p className="text-sm text-gray-600">Created by: {image.creator}</p>
        <p className="text-sm text-gray-500">{image.createdAt}</p>
      </div>
      <div className="flex items-center gap-4 mt-3">
        <Download className="w-5 h-5 cursor-pointer text-gray-600 hover:text-black" />
        <Share2 className="w-5 h-5 cursor-pointer text-gray-600 hover:text-black" />
        <Copy className="w-5 h-5 cursor-pointer text-gray-600 hover:text-black" />
        <Heart className="w-5 h-5 cursor-pointer text-gray-600 hover:text-red-500" />
      </div>
    </div>
  );
};

export default ImageCard;
