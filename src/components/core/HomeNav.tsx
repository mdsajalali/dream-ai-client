// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";

import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Image as ImageIcon,
  LogIn,
  Heart,
  Sparkles,
  List,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import ShowCase from "./Showcase";
import ThemeToggle from "./ThemeToggle";
import Hero from "./Hero";
import Registration from "./Registration";
import { UserProps } from "@/types/index.type";
import { signOut } from "next-auth/react";
import JwtDecode from "@/utils/jwtDecode";

const HomeNav = ({ session }: { session: UserProps | null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sidebarRef = useRef(null);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const user = JwtDecode();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleRemove = () => {
    localStorage.removeItem("accessToken");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full bg-[url('/images/banner-bg.png')] bg-cover bg-center">
      <div className="bg-[url('/images/banner-gradient-shape.svg')] bg-cover bg-center">
        <header className="z-[999] w-full">
          <div
            className={`${
              scrolled ? "bg-[#212121]" : "bg-transparent"
            } fixed left-0 right-0 top-0 z-[9999] w-full transition-all duration-300`}
          >
            <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-4 lg:px-0">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-2">
                <span className="text-2xl font-semibold text-white dark:text-white">
                  DreamAI
                </span>
              </Link>

              {/* Desktop Navbar */}
              <nav className="hidden items-center justify-center space-x-6 lg:flex">
                <Link
                  href="/generate"
                  className="flex items-center text-white dark:text-white"
                >
                  <Sparkles size={18} className="mr-2 inline" />
                  Generate
                </Link>
                {user?.email && (
                  <Link
                    href="/my-list"
                    className="flex items-center text-white dark:text-white"
                  >
                    <List size={18} className="mr-2 inline" />
                    My List
                  </Link>
                )}
                <Link
                  href="/discover"
                  className="flex items-center text-white dark:text-white"
                >
                  <ImageIcon size={18} className="mr-2 inline" />
                  Discover
                </Link>
                <Link
                  href="/favorites"
                  className="flex items-center text-white dark:text-white"
                >
                  <Heart size={18} className="mr-2 inline" />
                  Favorites
                </Link>

                {user?.role === "admin" && (
                  <Link
                    href="/dashboard"
                    className="flex items-center text-white dark:text-white"
                  >
                    <LayoutDashboard size={18} className="mr-2 inline" />
                    Dashboard
                  </Link>
                )}

                {session?.user || user?.email ? (
                  <div
                    onClick={() => {
                      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                      signOut() && handleRemove();
                    }}
                    className="flex cursor-pointer items-center text-white dark:text-white"
                  >
                    <LogIn size={18} className="mr-2 inline" />
                    Logout
                  </div>
                ) : (
                  <div
                    onClick={() => setIsFormOpen(true)}
                    className="flex cursor-pointer items-center text-white dark:text-white"
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
                  {isOpen ? (
                    <X size={24} />
                  ) : (
                    <Menu size={24} className="text-white" />
                  )}
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
                  <ThemeToggle />
                </div>
                <nav className="mt-4 space-y-4">
                  <Link
                    href="/generate"
                    className="flex items-center text-gray-900 dark:text-white"
                    onClick={toggleSidebar}
                  >
                    <ImageIcon size={18} className="mr-2 inline" />
                    Generate
                  </Link>
                  {user?.email && (
                    <Link
                      href="/my-list"
                      className="flex items-center text-gray-900 dark:text-white"
                    >
                      <List size={18} className="mr-2 inline" />
                      My List
                    </Link>
                  )}
                  <Link
                    href="/discover"
                    className="flex items-center text-gray-900 dark:text-white"
                    onClick={toggleSidebar}
                  >
                    <ImageIcon size={18} className="mr-2 inline" />
                    Discover
                  </Link>
                  <Link
                    href="/favorites"
                    className="flex items-center text-gray-900 dark:text-white"
                  >
                    <Heart size={18} className="mr-2 inline" />
                    Favorites
                  </Link>

                  {user?.role === "admin" && (
                    <Link
                      href="/dashboard"
                      className="flex items-center text-gray-900 dark:text-white"
                      onClick={toggleSidebar}
                    >
                      <LayoutDashboard size={18} className="mr-2 inline" />
                      Dashboard
                    </Link>
                  )}

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
                </nav>
              </div>
            </div>
          </div>
        </header>
        {/* Hero section */}
        <Hero />
        {/* Showcase */}
        <ShowCase />
      </div>
      <div className="absolute bottom-0 left-0 z-[999] h-[160px] w-full bg-gradient-to-b from-black/0 to-black" />

      {/* Registration modal */}
      <Registration isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} />
    </div>
  );
};

export default HomeNav;
