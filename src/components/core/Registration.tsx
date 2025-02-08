// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";
import { RegistrationProps } from "@/types/index.type";
import { FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "sonner";

// Separate schemas for login and signup
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[a-z]/, "Must include one lowercase letter")
      .regex(/[A-Z]/, "Must include one uppercase letter")
      .regex(/[0-9]/, "Must include one number"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

const Registration = ({ isFormOpen, setIsFormOpen }: RegistrationProps) => {
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(activeTab === "login" ? loginSchema : signupSchema),
  });

  const onSubmit = async (data) => {
    console.log(`Submitting ${activeTab} form`, data);

    if (activeTab === "login") {
      const response = await axiosInstance.post("/auth/login", data);
      console.log("Login Response:", response?.data);
      if (response.status === 200) {
        localStorage.setItem("accessToken", response?.data?.token);
        setIsFormOpen(false);
        toast.success(response?.data?.message);
      }
    } else {
      const response = await axiosInstance.post("/auth/register", data);
      console.log("Signup Response:", response);
      if (response.status === 201) {
        setIsFormOpen(false);
        toast.success(response?.data?.message);
      }
    }
  };

  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>
            {activeTab === "login" ? "Login" : "Sign Up"}
          </DialogTitle>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input {...register("email")} type="email" placeholder="Email" />
              {errors.email && (
                <p className="text-sm text-red-500">
                  {errors.email.message as string}
                </p>
              )}

              <div className="relative">
                <Input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 transform"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message as string}
                </p>
              )}

              <Button className="w-full" type="submit">
                Login
              </Button>
            </form>

            {/* Google Login Button for Login */}
            <div className="relative mt-4 text-center">
              <div className="absolute left-0 top-1/2 w-[45%] -translate-y-1/2 transform border border-b"></div>
              <div className="mx-4 inline-block">OR</div>
              <div className="absolute right-0 top-1/2 w-[45%] -translate-y-1/2 transform border border-b"></div>
            </div>

            <Button
              onClick={() =>
                signIn("google", {
                  callbackUrl: "http://localhost:3000/images",
                })
              }
              className="mt-4 flex w-full items-center justify-center bg-[#212121] text-white dark:bg-white dark:text-black"
              type="button"
            >
              <FaGoogle size={20} className="mr-2" />
              Sign in with Google
            </Button>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input {...register("name")} type="text" placeholder="Name" />
              {errors.name && (
                <p className="text-sm text-red-500">
                  {errors.name.message as string}
                </p>
              )}

              <Input {...register("email")} type="email" placeholder="Email" />
              {errors.email && (
                <p className="text-sm text-red-500">
                  {errors.email.message as string}
                </p>
              )}

              <div className="relative">
                <Input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 transform"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message as string}
                </p>
              )}

              <div className="relative">
                <Input
                  {...register("confirmPassword")}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 transform"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {errors.confirmPassword.message as string}
                </p>
              )}

              <Button className="w-full" type="submit">
                Sign Up
              </Button>
            </form>

            {/* Google Login Button for Signup */}
            <div className="relative mt-4 text-center">
              <div className="absolute left-0 top-1/2 w-[45%] -translate-y-1/2 transform border border-b"></div>
              <div className="mx-4 inline-block">OR</div>
              <div className="absolute right-0 top-1/2 w-[45%] -translate-y-1/2 transform border border-b"></div>
            </div>

            <Button
              onClick={() =>
                signIn("google", {
                  callbackUrl: "http://localhost:3000/images",
                })
              }
              className="mt-4 flex w-full items-center justify-center bg-[#212121] text-white dark:bg-white dark:text-black"
              type="button"
            >
              <FaGoogle size={20} className="mr-2" />
              Sign up with Google
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default Registration;
