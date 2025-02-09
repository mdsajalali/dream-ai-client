"use client";
import { usePathname } from "next/navigation";
import Footer from "../shared/Footer";

const FooterPathname = () => {
  const pathname = usePathname();

  return <>{pathname === "/dashboard" ? "" : <Footer />}</>;
};

export default FooterPathname;
