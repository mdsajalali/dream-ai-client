"use client";
import { usePathname } from "next/navigation";
import Footer from "../shared/Footer";

const FooterPathname = () => {
  const pathname = usePathname();

  return <>{pathname.startsWith("/dashboard") ? null : <Footer />}</>;
};

export default FooterPathname;
