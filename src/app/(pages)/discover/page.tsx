"use client";
import { useState } from "react";
import { Download, Share, Copy } from "lucide-react";
import axiosInstance from "@/utils/axiosInstance";

const Discover = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showImageBox, setShowImageBox] = useState(false);

  const handleGenerate = async () => {
    if (!imageUrl) return;

    setLoading(true);
    setShowImageBox(true);
    try {
      const response = await axiosInstance.post("/generate-image", {
        prompt: imageUrl,
      });
      setGeneratedImage(response?.data?.imageUrl);
      setImageUrl("");
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-309px)] flex flex-col items-center justify-center p-4">
      {!showImageBox ? (
        <p className="text-center w-[400px] text-gray-400 text-sm">
          Enter a prompt in the field below and click &quot;Generate&quot; to
          see your AI-generated image.
        </p>
      ) : (
        <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-xl">
          <div className="relative w-full h-64 bg-gray-700 flex items-center justify-center rounded-md overflow-hidden shadow-md">
            {loading ? (
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : generatedImage ? (
              <img
                src={generatedImage}
                alt="Generated"
                className="w-full h-full object-cover"
              />
            ) : (
              <p className="text-gray-400 text-sm">
                Enter a prompt and click Generate
              </p>
            )}

            {generatedImage && (
              <div className="absolute bottom-3 right-3 flex gap-3">
                <button className="p-2 bg-gray-900/60 rounded-md hover:bg-gray-700 transition">
                  <Download className="w-6 h-6 text-white" />
                </button>
                <button className="p-2 bg-gray-900/60 rounded-md hover:bg-gray-700 transition">
                  <Share className="w-6 h-6 text-white" />
                </button>
                <button className="p-2 bg-gray-900/60 rounded-md hover:bg-gray-700 transition">
                  <Copy className="w-6 h-6 text-white" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 mt-4">
        <input
          type="text"
          placeholder="Type your prompt here"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="flex-1 p-2 w-[320px] text-sm rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition disabled:bg-gray-500"
        >
          {loading ? (
            <div className="flex flex-col items-center px-6 ">
              <div className="w-5 h-5  border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            "Generate"
          )}
        </button>
      </div>
    </div>
  );
};

export default Discover;
