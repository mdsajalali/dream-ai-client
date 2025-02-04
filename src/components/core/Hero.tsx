import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className="flex absolute top-[10%] right-0 left-0 flex-col items-center justify-center text-center py-20 px-4 md:px-8 lg:px-16">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight max-w-3xl  text-white">
        Generate Stunning Images <br className="hidden md:inline" /> with{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-cyan-500">
          Dream.ai
        </span>
      </h1>
      <p className="mt-4 text-lg md:text-xl text-white max-w-2xl">
        Create Anything - AI with No Restrictions
      </p>
      <Link href="/discover">
        <button className="mt-6 px-8 py-3 text-lg font-semibold text-black bg-gradient-to-r from-lime-400 to-cyan-500 rounded-full shadow-lg hover:scale-105 transition-transform duration-300">
          Get Started
        </button>
      </Link>
    </section>
  );
};

export default Hero;
