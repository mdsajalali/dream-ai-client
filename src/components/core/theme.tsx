"use client";

import { useEffect, useState } from "react";

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check the user's system preference on initial load
    const isDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDark(isDarkMode);
  }, []);

  useEffect(() => {
    // Toggle dark mode class on <html> element
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div>
      <button
        onClick={() => setIsDark((prev) => !prev)}
        className="p-2 bg-gray-800 text-white rounded"
      >
        Toggle Dark Mode
      </button>
      <p className="text-black dark:text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut impedit quasi illum sequi adipisci? Fugiat porro dolores architecto officia illo.</p>
    </div>
  );
};

export default DarkModeToggle;
