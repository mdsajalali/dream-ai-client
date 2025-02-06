"use client";
import { useState, useEffect } from "react";
import { FaHandPointUp } from "react-icons/fa";

const TopToScroll = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-5 z-[999] right-5 p-2 sm:p-3 bg-[#ccff02] text-black hover:text-white hover:bg-[#02bccc] rounded-full shadow-lg transition-opacity duration-300 ${
        visible ? "opacity-100 " : "opacity-0 pointer-events-none"
      }`}
    >
      <FaHandPointUp className="sm:text-2xl text-[18px]" />
    </button>
  );
};

export default TopToScroll;
