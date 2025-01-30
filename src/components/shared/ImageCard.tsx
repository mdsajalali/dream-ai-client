import { useState } from "react";
import { toast } from "sonner";
import { ImageCardProps } from "@/types/index.type";
import { Download, Share2, Copy, Check, Heart } from "lucide-react";

const ImageCard = ({ image }: ImageCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(image.imageUrl);
      setCopied(true);
      toast.success("Copied!");
      setTimeout(() => setCopied(false), 2000); // Revert icon after 2 seconds
    } catch (error) {}
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(image.imageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `dreamai-${image._id}.jpg`; // Custom filename
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("Download started!");
    } catch (error) {}
  };

  return (
    <div key={image._id} className="bg-white p-4 rounded-lg shadow-lg">
      <img
        src={image?.imageUrl}
        alt="Generated"
        className="w-full h-48 object-cover rounded-lg"
      />
      <div className="mt-3 flex items-center justify-between">
        <p className="text-sm text-gray-600">Created by: {image.creator}</p>
        <p className="text-sm text-gray-500">{image.createdAt}</p>
      </div>
      <div>
        <p className="text-sm text-gray-600"> {image.prompt}</p>
      </div>
      <div className="flex items-center gap-4 mt-3">
        <Download
          className="w-5 h-5 cursor-pointer text-gray-600 hover:text-black"
          onClick={handleDownload}
        />
        <Share2 className="w-5 h-5 cursor-pointer text-gray-600 hover:text-black" />
        <div onClick={handleCopy} className="cursor-pointer">
          {copied ? (
            <Check className="w-5 h-5 text-green-500" />
          ) : (
            <Copy className="w-5 h-5 text-gray-600 hover:text-black" />
          )}
        </div>
        <Heart className="w-5 h-5 cursor-pointer text-gray-600 hover:text-red-500" />
      </div>
    </div>
  );
};

export default ImageCard;
