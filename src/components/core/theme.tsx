"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDark(savedTheme === "dark");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      setIsDark(prefersDark);
    }
  }, []);

  useEffect(() => {
    if (isDark !== null) {
      if (isDark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    }
  }, [isDark]);

  if (isDark === null) return null;

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="rounded-full bg-gray-200 p-2 transition-all dark:bg-gray-800"
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-yellow-500 md:h-5 md:w-5" />
      ) : (
        <Moon className="h-4 w-4 text-gray-900 md:h-5 md:w-5" />
      )}
    </button>
  );
};

export default ThemeToggle;
