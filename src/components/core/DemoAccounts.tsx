"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

const DemoAccounts = () => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<{ [key: string]: boolean }>({});

  const demoData = [
    {
      role: "Admin",
      email: "admin@dreamai.com",
      password: "Dreamai2025",
    },
    {
      role: "User",
      email: "user@dreamai.com",
      password: "Dreamai2025",
    },
  ];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied((prev) => ({ ...prev, [key]: true }));

    toast.success(`${key} copied successfully!`);

    setTimeout(() => {
      setCopied((prev) => ({ ...prev, [key]: false }));
    }, 3000);
  };

  return (
    <>
      <Button className="mt-3 w-full" onClick={() => setOpen(true)}>
        View Demo Accounts
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md border dark:border-gray-700 sm:max-w-lg md:max-w-xl">
          <DialogHeader>
            <DialogTitle>Demo Accounts</DialogTitle>
          </DialogHeader>

          {demoData.map(({ role, email, password }, index) => (
            <div key={index} className="mt-3">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {role}
              </h3>
              <div className="mt-2 overflow-hidden rounded-lg border dark:border-gray-700">
                {/* Email */}
                <div className="flex items-center justify-between border-b bg-gray-50 px-3 py-2 dark:border-gray-700 dark:bg-gray-800">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Email
                  </span>
                  <span className="text-sm font-medium">{email}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCopy(email, `${role}-Email`)}
                  >
                    {copied[`${role}-Email`] ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-500 dark:text-gray-300" />
                    )}
                  </Button>
                </div>
                {/* Password */}
                <div className="flex items-center justify-between bg-gray-50 px-3 py-2 dark:border-gray-700 dark:bg-gray-800">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Password
                  </span>
                  <span className="text-sm font-medium">{password}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCopy(password, `${role}-Password`)}
                  >
                    {copied[`${role}-Password`] ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-500 dark:text-gray-300" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DemoAccounts;
