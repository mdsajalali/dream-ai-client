"use client";
import { useEffect, useRef, useState } from "react";
import { Download, Copy, ArrowUp, X, Check, Share2, Heart } from "lucide-react";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Discover: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [generatedImage, setGeneratedImage] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showImageBox, setShowImageBox] = useState<boolean>(false);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

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

  // Download Copy Share Functionality
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedImage);
      setCopied(true);
      toast.success("Copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `dreamai-${Date.now()}-${Math.floor(Math.random() * 100000)}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("Download started!");
    } catch (error) {
      console.log(error);
    }
  };

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      generatedImage,
    )}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      generatedImage,
    )}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      generatedImage,
    )}`,
    instagram: `https://www.instagram.com/`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(
      generatedImage,
    )}`,
  };

  return (
    <div className="flex min-h-[calc(100vh-309px)] flex-col items-center justify-center p-4">
      {!showImageBox ? (
        <p className="max-w-[400px] text-center text-sm text-black dark:text-white">
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
                  <Download
                    onClick={handleDownload}
                    className="h-6 w-6 text-white"
                  />
                </button>
                <button className="rounded-md bg-gray-900/60 p-2 transition hover:bg-gray-700">
                  <Share2
                    className="h-6 w-6 text-white"
                    onClick={() => setIsOpen(true)}
                  />
                </button>
                <button
                  onClick={handleCopy}
                  className="rounded-md bg-gray-900/60 p-2 transition hover:bg-gray-700"
                >
                  {copied ? (
                    <Check className="h-6 w-6 text-green-500" />
                  ) : (
                    <Copy className="h-6 w-6 text-white" />
                  )}
                </button>
                <button className="rounded-md bg-gray-900/60 p-2 transition hover:bg-gray-700">
                  <Heart className="h-6 w-6 text-white" />
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

      {/* Share Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Share this link</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <Input
              value={generatedImage}
              readOnly
              className="cursor-pointer"
              onClick={handleCopy}
            />
            <Button className="w-full" onClick={handleCopy}>
              {copied ? "Copied!" : "Copy Link"}
            </Button>
            <div className="mt-2 flex justify-between">
              <a
                href={shareLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#1877F2"
                    d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.989 4.388 10.954 10.125 11.854V15.47H7.078v-3.397h3.047V9.847c0-3.02 1.792-4.688 4.533-4.688 1.314 0 2.687.235 2.687.235v2.953h-1.513c-1.49 0-1.953.928-1.953 1.877v2.244h3.328l-.531 3.397h-2.797v8.457C19.612 23.026 24 18.061 24 12.073z"
                  />
                </svg>
              </a>
              <a
                href={shareLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#25D366"
                    d="M20.52 3.48A11.93 11.93 0 0012 0a11.93 11.93 0 00-9.07 19.64L.12 24l4.47-1.18A11.93 11.93 0 0012 24c6.63 0 12-5.37 12-12a11.93 11.93 0 00-3.48-8.52zM12 21.46a9.44 9.44 0 01-5.12-1.5l-.37-.23-2.65.7.7-2.65-.23-.37A9.44 9.44 0 1121.46 12c0 5.21-4.25 9.46-9.46 9.46zm4.88-7.13c-.26-.13-1.52-.75-1.75-.84-.23-.08-.4-.13-.57.14-.17.26-.65.84-.8 1.01-.14.17-.29.19-.55.06-.26-.13-1.1-.4-2.1-1.25a7.94 7.94 0 01-1.48-1.8c-.14-.26 0-.4.1-.54.12-.13.26-.29.4-.43.13-.14.17-.23.26-.4.08-.17.04-.3-.02-.43-.07-.13-.57-1.37-.79-1.88-.21-.5-.42-.43-.57-.43-.15 0-.3 0-.45.02a.87.87 0 00-.64.3c-.22.23-.86.84-.86 2.03s.88 2.36 1 2.53c.13.17 1.73 2.64 4.18 3.67 1.46.63 2.03.69 2.75.58.42-.07 1.52-.62 1.74-1.23.22-.6.22-1.12.15-1.23-.07-.1-.23-.18-.49-.31z"
                  />
                </svg>
              </a>
              <a
                href={shareLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#0077B5"
                    d="M21.5 0h-19C1.12 0 0 1.12 0 2.5v19C0 22.88 1.12 24 2.5 24h19c1.38 0 2.5-1.12 2.5-2.5v-19C24 1.12 22.88 0 21.5 0zM7.48 20.46H3.56V9.14h3.92v11.32zM5.52 7.88c-1.26 0-2.28-1.02-2.28-2.28s1.02-2.28 2.28-2.28 2.28 1.02 2.28 2.28-1.02 2.28-2.28 2.28zm14.94 12.58h-3.92v-5.5c0-1.3-.02-2.98-1.82-2.98s-2.1 1.42-2.1 2.9v5.58h-3.92V9.14h3.77v1.55h.05c.53-.99 1.83-2.03 3.78-2.03 4.04 0 4.78 2.65 4.78 6.1v5.7z"
                  />
                </svg>
              </a>
              <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#1DA1F2"
                    d="M23.444 4.834c-.843.37-1.75.62-2.7.732a4.72 4.72 0 002.088-2.606 9.55 9.55 0 01-3.017 1.141A4.732 4.732 0 0016.42 3c-2.621 0-4.747 2.126-4.747 4.747 0 .372.043.736.125 1.086A13.44 13.44 0 012.392 4.162a4.724 4.724 0 001.464 6.325 4.704 4.704 0 01-2.148-.593v.06c0 2.283 1.622 4.188 3.778 4.624a4.728 4.728 0 01-2.142.081 4.74 4.74 0 004.426 3.29 9.5 9.5 0 01-5.889 2.03c-.382 0-.757-.023-1.128-.065a13.432 13.432 0 007.285 2.136c8.736 0 13.52-7.234 13.52-13.52 0-.206-.005-.41-.014-.613a9.668 9.668 0 002.373-2.465z"
                  />
                </svg>
              </a>

              <a
                href={shareLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 448 512"
                  className="text-pink-600"
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                </svg>
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Discover;
