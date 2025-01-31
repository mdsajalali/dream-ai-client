"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, Home, Image as ImageIcon, Heart, LogIn } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("login");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
          <div
            onClick={() => setIsFormOpen(true)}
            className="text-gray-900 cursor-pointer dark:text-white flex items-center"
          >
            <LogIn size={20} className="inline mr-2" />
            Login
          </div>
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

            <div
              onClick={() => {
                setIsFormOpen(true);
                toggleSidebar();
              }}
              className="text-gray-900 cursor-pointer dark:text-white flex items-center"
            >
              <LogIn size={20} className="inline mr-2" />
              Login
            </div>
          </nav>
        </div>
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>
              {activeTab === "login" ? "Login" : "Sign Up"}
            </DialogTitle>
          </DialogHeader>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* Login Form */}
            <TabsContent value="login">
              <form className="space-y-4">
                <Input type="email" placeholder="Email" required />
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <Button className="w-full">Login</Button>
              </form>

              {/* Switch to Signup */}
              <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                New here?{" "}
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => setActiveTab("signup")}
                >
                  Sign Up
                </button>
              </p>
            </TabsContent>

            {/* Signup Form */}
            <TabsContent value="signup">
              <form className="space-y-4">
                <Input type="text" placeholder="Name" required />
                <Input type="email" placeholder="Email" required />
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
                <Button className="w-full">Sign Up</Button>
              </form>

              {/* Switch to Login */}
              <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => setActiveTab("login")}
                >
                  Login
                </button>
              </p>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Navbar;
