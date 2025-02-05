import AiImages from "@/components/core/AiImages";
import AiTexts from "@/components/core/AiTexts";
import Faq from "@/components/core/Faq";
import React from "react";
import About from "@/components/core/About";

const page = () => {
  return (
    <>
      {/* AiTexts */}
      <AiTexts />
      {/* About */}
      <About />
      {/* AiImage */}
      <AiImages />
      {/* Faq */}
      <Faq />
    </>
  );
};

export default page;
