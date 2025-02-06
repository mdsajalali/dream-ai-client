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
      className={`fixed bottom-5 right-5 z-[999] rounded-full bg-[#ccff02] p-2 text-black shadow-lg transition-opacity duration-300 hover:bg-[#02bccc] hover:text-white sm:p-3 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <FaHandPointUp className="text-[18px] sm:text-2xl" />
    </button>
  );
};

export default TopToScroll;
