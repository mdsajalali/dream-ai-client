"use client";

import HomeNav from "@/components/core/HomeNav";
import Navbar from "@/components/shared/Navbar";
import { usePathname } from "next/navigation";

const RoutePathname = () => {
  const pathname = usePathname();

  return <>{pathname === "/" ? <HomeNav /> : <Navbar />}</>;
};

export default RoutePathname;
