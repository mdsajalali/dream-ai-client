import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";
import { RegistrationProps } from "@/types/index.type";

const Registration = ({ isFormOpen, setIsFormOpen }: RegistrationProps) => {
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500 dark:text-gray-400"
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500 dark:text-gray-400"
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500 dark:text-gray-400"
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
  );
};

export default Registration;
