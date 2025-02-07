"use client";
import { useEffect, useRef, useState } from "react";
import { Download, Share, Copy, ArrowUp, X } from "lucide-react";
import axiosInstance from "@/utils/axiosInstance";

const Discover: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showImageBox, setShowImageBox] = useState<boolean>(false);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [prompt]);

  const handleGenerate = async () => {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    setShowImageBox(true);

    try {
      const response = await axiosInstance.post<{ imageUrl: string }>(
        "/generate-image",
        { prompt },
      );

      setGeneratedImage(response.data.imageUrl);
      setPrompt("");
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-309px)] flex-col items-center justify-center p-4">
      {!showImageBox ? (
        <p className="w-[400px] text-center text-sm text-black dark:text-white">
          Enter a prompt and press <b>Enter</b> or click &quot;Generate&quot; to
          see your AI-generated image.
        </p>
      ) : (
        <div className="w-full max-w-md rounded-lg bg-gray-800 p-6 shadow-xl">
          <div className="relative flex h-64 w-full items-center justify-center overflow-hidden rounded-md bg-gray-700 shadow-md">
            {loading ? (
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
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

      <div className="relative mt-4 flex w-full items-center gap-2 sm:w-[450px]">
        <textarea
          ref={textareaRef}
          placeholder="Type your prompt here..."
          value={prompt}
          onKeyDown={handleKeyPress}
          onChange={(e) => setPrompt(e.target.value)}
          className="custom-scrollbar max-h-[300px] min-h-[80px] w-full flex-1 resize-none overflow-y-auto rounded-md border border-gray-600 bg-[#212121] p-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
          disabled={loading}
        />
        {prompt.length > 0 && (
          <>
            <button
              onClick={() => setPrompt("")}
              className="absolute right-3 top-2 flex size-6 items-center justify-center rounded-full bg-black text-white transition hover:bg-gray-500"
            >
              <X size={16} />
            </button>
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="absolute bottom-2 right-3 flex size-6 items-center justify-center rounded-full bg-black text-white transition hover:bg-gray-500"
            >
              {loading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <ArrowUp size={16} />
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Discover;
