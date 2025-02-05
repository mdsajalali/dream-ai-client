import AiImages from "@/components/core/AiImages";
import AiTexts from "@/components/core/AiTexts";
import Faq from "@/components/core/Faq";
import React from "react";

const page = () => {
  return (
    <>
      {/* AiTexts */}
      <AiTexts />
      {/* AiImage */}
      <AiImages />
      {/* Faq */}
      <Faq />
    </>
  );
};

export default page;
