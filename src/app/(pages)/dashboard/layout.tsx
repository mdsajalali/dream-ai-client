"use client";
import { useState, useEffect, ReactNode } from "react";
import ThemeToggle from "@/components/core/ThemeToggle";
import { ImageIcon, LogIn, User, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SidebarLayout({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("/dashboard");
  const router = useRouter();

  const handleRemove = () => {
    localStorage.removeItem("accessToken");
    toast.success("Logout successfully!")
    router.push("/");
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleOutsideClick = (event: any) => {
      if (isOpen && !event.target.closest(".sidebar")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isOpen]);

  return (
    <div className="z-[999] flex min-h-screen">
      {/* Sidebar for desktop */}
      <div className="hidden w-64 bg-gray-800 p-4 text-white dark:bg-black md:block">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-semibold">
            DreamAI
          </Link>
          <ThemeToggle />
        </div>
        <ul>
          <li>
            <Link
              href="/dashboard"
              className={`mt-5 flex items-center space-x-2 rounded p-2 hover:bg-gray-700 ${active === "/dashboard" ? "bg-gray-700" : ""}`}
              onClick={() => setActive("/dashboard")}
            >
              <User className="h-5 w-5" />
              <span>Users</span>
            </Link>
          </li>

          <li>
            <Link
              href="/dashboard/images"
              className={`my-2 flex items-center space-x-2 rounded p-2 hover:bg-gray-700 ${active === "/dashboard/images" ? "bg-gray-700" : ""}`}
              onClick={() => setActive("/dashboard/images")}
            >
              <ImageIcon className="h-5 w-5" />
              <span>Images</span>
            </Link>
          </li>
          <hr className="my-2 border-gray-700" />
          <li>
            <button
              onClick={handleRemove}
              className="flex w-full items-center space-x-2 rounded p-2 hover:text-gray-200"
            >
              <LogIn className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Mobile Sidebar */}
      <div className="fixed left-0 top-0 z-[999] flex w-full items-center justify-between bg-gray-800 p-4 text-white md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        <Link href="/" className="text-2xl font-semibold">
          DreamAI
        </Link>
        <ThemeToggle />
      </div>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed left-0 top-0 h-full w-64 transform bg-gray-900 p-6 text-white transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"} sidebar`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 text-white"
        >
          <X className="h-6 w-6" />
        </button>
        <ul className="mt-10 space-y-4">
          <li>
            <Link
              href="/dashboard/users"
              className={`flex items-center space-x-2 rounded p-2 hover:bg-gray-700 ${active === "/dashboard/users" ? "bg-gray-700" : ""}`}
              onClick={() => {
                setActive("/dashboard/users");
                setIsOpen(false);
              }}
            >
              <User className="h-5 w-5" />
              <span>Users</span>
            </Link>
          </li>

          <li>
            <Link
              href="/dashboard/images"
              className={`flex items-center space-x-2 rounded p-2 hover:bg-gray-700 ${active === "/dashboard/images" ? "bg-gray-700" : ""}`}
              onClick={() => {
                setActive("/dashboard/images");
                setIsOpen(false);
              }}
            >
              <ImageIcon className="h-5 w-5" />
              <span>Images</span>
            </Link>
          </li>
          <hr className="my-2 border-gray-700" />
          <li>
            <button className="flex w-full items-center space-x-2 rounded p-2 hover:text-gray-700">
              <LogIn className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="mt-14 flex-1 p-6 md:mt-0">{children}</div>
    </div>
  );
}
