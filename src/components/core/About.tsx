import React from "react";
import Container from "../shared/Container";
import about_one from "../../../public/images/about1.webp";
import about_two from "../../../public/images/about2.webp";
import about_three from "../../../public/images/about3.webp";
import Image from "next/image"; 
import Link from "next/link";

const About = () => {
  return (
    <Container>
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 py-12 px-6 lg:px-12   dark:bg-gray-900 rounded-lg  ">
        {/* Image Section */}
        <div className="flex  gap-2 sm:gap-4 lg:w-1/2">
          <div className="relative  w-[340px] sm:w-[400px] sm:h-[495px] h-auto">
            <Image
              src={about_one}
              fill
              alt="About"
              className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 object-cover"
            />
          </div>
          <div className="flex flex-col sm:gap-4 gap-2">
            <Image
              src={about_two}
              width={400}
              height={300}
              alt="About"
              className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            />
            <Image
              src={about_three}
              width={400}
              height={300}
              alt="About"
              className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            WELCOME
          </h1>
          <h2 className="text-xl text-gray-700 dark:text-gray-300 mt-2">
            Easy ways to use AI tools, and tools to build AI.
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4 leading-relaxed">
            Easy ways to use AI tools, and tools to build AI.Easy ways to use AI
            tools, and tools to build AI.
          </p>
          <Link href="/discover">
            <button className="mt-6 px-8 py-3 text-lg font-semibold text-black bg-gradient-to-r from-lime-400 to-cyan-500 rounded-full shadow-lg hover:scale-105 transition-transform duration-300">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default About;
