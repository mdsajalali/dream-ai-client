"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, Home, Image as ImageIcon, Heart, LogIn } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

  return (
    <header className="bg-white shadow-md dark:bg-gray-800">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-0 flex items-center justify-between py-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-semibold text-gray-900 dark:text-white">
            DreamAI
          </span>
        </div>

        {/* Desktop Navbar */}
        <nav className="hidden lg:flex space-x-6">
          <Link href="/discover" className="text-gray-900 dark:text-white">
            <Home size={20} className="inline mr-2" />
            Discover
          </Link>
          <Link href="/images" className="text-gray-900 dark:text-white">
            <ImageIcon size={20} className="inline mr-2" />
            Images
          </Link>
          <Link href="/favorites" className="text-gray-900 dark:text-white">
            <Heart size={20} className="inline mr-2" />
            Favorites
          </Link>
          <Link
            href="/login"
            className="text-gray-900 dark:text-white flex items-center"
          >
            <LogIn size={20} className="inline mr-2" />
            Login
          </Link>
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
            <Link
              href="/favorites"
              className="text-gray-900 dark:text-white flex items-center"
              onClick={toggleSidebar}
            >
              <Heart size={20} className="inline mr-2" />
              Favorites
            </Link>
            <Link
              href="/login"
              className="text-gray-900 dark:text-white flex items-center"
              onClick={toggleSidebar}
            >
              <LogIn size={20} className="inline mr-2" />
              Login
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
