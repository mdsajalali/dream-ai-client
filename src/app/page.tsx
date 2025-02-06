import AiImages from "@/components/core/AiImages";
import AiTexts from "@/components/core/AiTexts";
import React from "react";
import About from "@/components/core/About";
import Workflow from "@/components/core/Workflow";

const page = () => {
  return (
    <>
      {/* AiTexts */}
      <AiTexts />
      {/* About */}
      <About />
      {/* AiImage */}
      <AiImages />
      {/* Work flow */}
      <Workflow />
    </>
  );
};

export default page;
