import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center px-4 py-20 text-center md:px-8 lg:px-16">
      <h1 className="mt-20 max-w-3xl text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl">
        Generate Stunning Images <br className="hidden md:inline" /> with{" "}
        <span className="bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">
          Dream.ai
        </span>
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-white md:text-xl">
        Create Anything - AI with No Restrictions
      </p>
      <Link href="/discover">
        <button className="mt-6 rounded-full bg-gradient-to-r from-lime-400 to-cyan-500 px-8 py-3 text-lg font-semibold text-black shadow-lg transition-transform duration-300 hover:scale-105">
          Get Started
        </button>
      </Link>
    </section>
  );
};

export default Hero;
