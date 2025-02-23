import type { Metadata } from "next";
import "./globals.css";

import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import RoutePathname from "@/components/core/RoutePathname";
import TopToScroll from "@/components/shared/TopToScroll";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import FooterPathname from "@/components/core/FooterPahname";
import WrapperProvider from "@/context/WrapperProvider";

const inter = Inter({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DreamAI",
  description: "Generated by Md. Sajal Ali",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className={inter.className}>
      <body>
        <WrapperProvider>
          {/* Toast */}
          <Toaster position="top-center" />
          <RoutePathname session={session} />
          <main>{children}</main>
          {/* Top to scroll */}
          <TopToScroll />
          <FooterPathname />
        </WrapperProvider>
      </body>
    </html>
  );
}
