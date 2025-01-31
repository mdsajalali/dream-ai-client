// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

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
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import axiosInstance from "@/utils/axiosInstance";

// Form validation schema
const validationSchema = Yup.object({
  name: Yup.string().when("activeTab", {
    is: "signup",
    then: Yup.string().required("Name is required"),
  }),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .when("activeTab", {
      is: "signup",
      then: Yup.string().required("Confirm Password is required"),
    })
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const sidebarRef = useRef(null);

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

  // login

  // Define the validation schema
  const validationLoginSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address") // Email should be in valid format
      .required("Email is required"), // Email is required
    password: Yup.string()
      .min(4, "Password must be at least 4 characters") // Minimum length for password
      .required("Password is required"), // Password is required
  });

  const handleSignUpSubmit = async (values: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    console.log("Sign Up Values:", values);

    try {
      // Send POST request to create user
      const response = await axiosInstance.post("/create-user", {
        name: values.name,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      });

      // If the request was successful, show success toast
      if (response.status === 200) {
        toast.success("User created successfully!");
        setIsFormOpen(false);
      } else {
        // Handle error if response status is not 200 (optional)
        toast.error(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      // Catch any errors, such as network issues
      console.error("Error during sign-up:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  const handleLoginSubmit = async (values: {
    email: string;
    password: string;
  }) => {
    console.log("Login Values:", values);

    try {
      // Send POST request to create user
      const response = await axiosInstance.post("/login", {
        email: values.email,
        password: values.password,
      });

      // If the request was successful, show success toast
      if (response.status === 200) {
        toast.success("login successfully!");
        setIsFormOpen(false);
      } else {
        // Handle error if response status is not 200 (optional)
        toast.error(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      // Catch any errors, such as network issues
      console.error("Error during login-in:", error);
      toast.error("An unexpected error occurred.");
    }
  };

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
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={validationLoginSchema}
                onSubmit={handleLoginSubmit}
              >
                {({ errors, touched }) => (
                  <Form className="space-y-4">
                    <Field
                      name="email"
                      type="email"
                      as={Input}
                      placeholder="Email"
                      required
                    />
                    {errors.email && touched.email && (
                      <div className="text-red-500">{errors.email}</div>
                    )}

                    <div className="relative">
                      <Field
                        name="password"
                        type={showPassword ? "text" : "password"}
                        as={Input}
                        placeholder="Password"
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                    {errors.password && touched.password && (
                      <div className="text-red-500">{errors.password}</div>
                    )}

                    <Button className="w-full" type="submit">
                      Login
                    </Button>
                  </Form>
                )}
              </Formik>
            </TabsContent>

            {/* Signup Form */}
            <TabsContent value="signup">
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSignUpSubmit}
              >
                {({ errors, touched }) => (
                  <Form className="space-y-4">
                    <Field
                      name="name"
                      type="text"
                      as={Input}
                      placeholder="Name"
                      required
                    />
                    {errors.name && touched.name && (
                      <div className="text-red-500">{errors.name}</div>
                    )}
                    <Field
                      name="email"
                      type="email"
                      as={Input}
                      placeholder="Email"
                      required
                    />
                    {errors.email && touched.email && (
                      <div className="text-red-500">{errors.email}</div>
                    )}
                    <div className="relative">
                      <Field
                        name="password"
                        type={showPassword ? "text" : "password"}
                        as={Input}
                        placeholder="Password"
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                    {errors.password && touched.password && (
                      <div className="text-red-500">{errors.password}</div>
                    )}
                    <div className="relative">
                      <Field
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        as={Input}
                        placeholder="Confirm Password"
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && touched.confirmPassword && (
                      <div className="text-red-500">
                        {errors.confirmPassword}
                      </div>
                    )}
                    <Button className="w-full" type="submit">
                      Sign Up
                    </Button>
                  </Form>
                )}
              </Formik>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Navbar;
