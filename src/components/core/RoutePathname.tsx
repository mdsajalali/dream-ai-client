"use client";

import HomeNav from "@/components/core/HomeNav";
import Navbar from "@/components/shared/Navbar";
import { UserProps } from "@/types/index.type";
import { usePathname } from "next/navigation";

const RoutePathname = ({ session }: { session: UserProps | null }) => {
  const pathname = usePathname();

 if (pathname.startsWith("/dashboard")) return null;

  return pathname === "/" ? (
    <HomeNav session={session} />
  ) : (
    <Navbar session={session} />
  );
};

export default RoutePathname;
