// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, Home, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import DarkModeToggle from "../core/theme";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);  
  const sidebarRef = useRef(null);

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    // Handle clicks outside the sidebar
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Handle scroll event to change navbar background and fix position
    const handleScroll = () => {
      if (window.scrollY >= 200) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`transition-all ${
        scrolling
          ? "bg-black fixed top-0 left-0 w-full z-50 shadow-md"
          : "bg-white  shadow-md dark:bg-gray-800"
      } ${scrolling ? "py-2" : "py-4"}`}
    >
      <div className="max-w-[1200px] mx-auto px-4 lg:px-0 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span
            className={`text-2xl font-semibold ${
              scrolling ? "text-white" : "text-gray-900"
            }`}
          >
            DreamAI
          </span>
        </Link>

        {/* Desktop Navbar */}
        <nav className="hidden lg:flex justify-center items-center space-x-6">
          <Link
            href="/discover"
            className={`text-gray-900 dark:text-white flex items-center ${
              scrolling ? "text-white" : ""
            }`}
          >
            <Home size={18} className="inline mr-2" />
            Discover
          </Link>
          <Link
            href="/images"
            className={`text-gray-900 flex items-center dark:text-white ${
              scrolling ? "text-white" : ""
            }`}
          >
            <ImageIcon size={18} className="inline mr-2" />
            Images
          </Link>
          {/* Theme */}
          <DarkModeToggle />
        </nav>

        {/* Mobile Menu Icon */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={toggleSidebar}
            className="text-gray-900 dark:text-white"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden transform transition-all ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          ref={sidebarRef}
          className="w-3/4 bg-white p-6 h-full transform transition-all ml-auto"
        >
          <div className="flex justify-between">
            {/* Close icon inside the sidebar */}
            <button
              onClick={toggleSidebar}
              className="text-gray-900 dark:text-white"
            >
              <X size={24} />
            </button>
          </div>
          <nav className="space-y-4 mt-4">
            <Link
              href="/"
              className="text-gray-900 dark:text-white flex items-center"
              onClick={toggleSidebar}
            >
              <Home size={20} className="inline mr-2" />
              Discover
            </Link>
            <Link
              href="/images"
              className="text-gray-900 dark:text-white flex items-center"
              onClick={toggleSidebar}
            >
              <ImageIcon size={20} className="inline mr-2" />
              Images
            </Link>
            <DarkModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
