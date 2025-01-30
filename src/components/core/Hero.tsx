import React from "react";

const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center py-20 px-4 md:px-8 lg:px-16">
      <h1 className="text-4xl md:text-5xl font-bold leading-tight">
        Generate Image <br className="hidden md:block" /> with{" "}
        <span className="text-blue-500">Dream.ai</span>
      </h1>
      <p className="mt-4 text-lg md:text-xl text-gray-600">
        Create Anything - AI With No Restriction
      </p>
      <button className="mt-6 px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 transition">
        Get Started
      </button>
    </section>
  );
};

export default Hero;
