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
    <div className="flex min-h-[calc(100vh-309px)] flex-col items-center justify-center p-4">
      {!showImageBox ? (
        <p className="w-[400px] text-center text-sm text-gray-400">
          Enter a prompt in the field below and click &quot;Generate&quot; to
          see your AI-generated image.
        </p>
      ) : (
        <div className="w-full max-w-md rounded-lg bg-gray-800 p-6 shadow-xl">
          <div className="relative flex h-64 w-full items-center justify-center overflow-hidden rounded-md bg-gray-700 shadow-md">
            {loading ? (
              <div className="flex flex-col items-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
              </div>
            ) : generatedImage ? (
              <img
                src={generatedImage}
                alt="Generated"
                className="h-full w-full object-cover"
              />
            ) : (
              <p className="text-sm text-gray-400">
                Enter a prompt and click Generate
              </p>
            )}

            {generatedImage && (
              <div className="absolute bottom-3 right-3 flex gap-3">
                <button className="rounded-md bg-gray-900/60 p-2 transition hover:bg-gray-700">
                  <Download className="h-6 w-6 text-white" />
                </button>
                <button className="rounded-md bg-gray-900/60 p-2 transition hover:bg-gray-700">
                  <Share className="h-6 w-6 text-white" />
                </button>
                <button className="rounded-md bg-gray-900/60 p-2 transition hover:bg-gray-700">
                  <Copy className="h-6 w-6 text-white" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-4 flex items-center gap-2">
        <input
          type="text"
          placeholder="Type your prompt here"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-[320px] flex-1 rounded-md border border-gray-600 bg-gray-700 p-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="rounded-md bg-blue-500 px-6 py-2 text-white transition hover:bg-blue-600 disabled:bg-gray-500"
        >
          {loading ? (
            <div className="flex flex-col items-center px-6">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
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
