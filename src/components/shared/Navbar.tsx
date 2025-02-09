// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, Home, Image as ImageIcon, LogIn, Heart } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "../core/ThemeToggle";
import Registration from "../core/Registration";
import { UserProps } from "@/types/index.type";
import { signOut } from "next-auth/react";
import JwtDecode from "@/utils/jwtDecode";

const Navbar = ({ session }: { session: UserProps | null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const sidebarRef = useRef(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const user = JwtDecode();

  const handleRemove = () => {
    localStorage.removeItem("accessToken");
  };

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
          ? "fixed left-0 top-0 z-50 w-full bg-[#212121]"
          : "border-b bg-white dark:bg-[#212121]"
      } ${scrolling ? "py-4" : "py-4"}`}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 lg:px-0">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span
            className={`text-2xl font-semibold ${
              scrolling ? "text-white" : "text-gray-900 dark:text-white"
            }`}
          >
            DreamAI
          </span>
        </Link>

        {/* Desktop Navbar */}
        <nav className="hidden items-center justify-center space-x-6 lg:flex">
          <Link
            href="/discover"
            className={`flex items-center text-gray-900 dark:text-white ${
              scrolling ? "text-white" : ""
            }`}
          >
            <Home size={18} className="mr-2 inline" />
            Discover
          </Link>
          <Link
            href="/my-list"
            className={`flex items-center text-gray-900 dark:text-white ${
              scrolling ? "text-white" : ""
            }`}
          >
            <Heart size={18} className="mr-2 inline" />
            My List
          </Link>
          <Link
            href="/favorites"
            className={`flex items-center text-gray-900 dark:text-white ${
              scrolling ? "text-white" : ""
            }`}
          >
            <Heart size={18} className="mr-2 inline" />
            Favorites
          </Link>

          <Link
            href="/images"
            className={`flex items-center text-gray-900 dark:text-white ${
              scrolling ? "text-white" : ""
            }`}
          >
            <ImageIcon size={18} className="mr-2 inline" />
            Images
          </Link>

          {session?.user || user?.email ? (
            <div
              onClick={() => {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                signOut() && handleRemove();
              }}
              className="flex cursor-pointer items-center text-black dark:text-white"
            >
              <LogIn size={18} className="mr-2 inline" />
              Logout
            </div>
          ) : (
            <div
              onClick={() => setIsFormOpen(true)}
              className="flex cursor-pointer items-center text-black dark:text-white"
            >
              <LogIn size={18} className="mr-2 inline" />
              Login
            </div>
          )}
          {/* Theme */}
          <ThemeToggle />
        </nav>

        {/* Mobile Menu Icon */}
        <div className="flex items-center lg:hidden">
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
        className={`fixed inset-0 z-50 transform bg-black bg-opacity-50 transition-all lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          ref={sidebarRef}
          className="ml-auto h-full w-3/4 transform bg-white p-6 transition-all dark:bg-[#212121]"
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
          <nav className="mt-4 space-y-4">
            <Link
              href="/"
              className="flex items-center text-gray-900 dark:text-white"
              onClick={toggleSidebar}
            >
              <Home size={20} className="mr-2 inline" />
              Discover
            </Link>

            <Link
              href="/my-list"
              className="flex items-center text-gray-900 dark:text-white"
            >
              <Heart size={18} className="mr-2 inline" />
              My List
            </Link>

            <Link
              href="/favorites"
              className="flex items-center text-gray-900 dark:text-white"
            >
              <Heart size={18} className="mr-2 inline" />
              Favorites
            </Link>

            <Link
              href="/images"
              className="flex items-center text-gray-900 dark:text-white"
              onClick={toggleSidebar}
            >
              <ImageIcon size={20} className="mr-2 inline" />
              Images
            </Link>
            {session?.user || user?.email ? (
              <div
                onClick={() => {
                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                  signOut() && handleRemove();
                }}
                className="flex cursor-pointer items-center text-black dark:text-white"
              >
                <LogIn size={18} className="mr-2 inline" />
                Logout
              </div>
            ) : (
              <div
                onClick={() => {
                  setIsFormOpen(true);
                  setIsOpen(false);
                }}
                className="flex cursor-pointer items-center text-black dark:text-white"
              >
                <LogIn size={18} className="mr-2 inline" />
                Login
              </div>
            )}
            <ThemeToggle />
          </nav>
        </div>
      </div>
      {/* Registration modal */}
      <Registration isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} />
    </header>
  );
};

export default Navbar;
