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
      <div className="flex flex-col items-center gap-8 rounded-lg px-6 py-12 lg:flex-row lg:gap-12 lg:px-12">
        {/* Image Section */}
        <div className="flex gap-2 sm:gap-4 lg:w-1/2">
          <div className="relative h-auto w-[340px] sm:h-[495px] sm:w-[400px]">
            <Image
              src={about_one}
              fill
              alt="About"
              className="rounded-lg object-cover shadow-lg transition-transform duration-300"
            />
          </div>
          <div className="flex flex-col gap-2 sm:gap-4">
            <Image
              src={about_two}
              width={400}
              height={300}
              alt="About"
              className="rounded-lg shadow-lg transition-transform duration-300"
            />
            <Image
              src={about_three}
              width={400}
              height={300}
              alt="About"
              className="rounded-lg shadow-lg transition-transform duration-300"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="text-center lg:w-1/2 lg:text-left">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            WELCOME
          </h1>
          <h2 className="mt-2 text-xl text-gray-700 dark:text-gray-300">
            Easy ways to use AI tools, and tools to build AI.
          </h2>
          <p className="mt-4 leading-relaxed text-gray-600 dark:text-gray-400">
            Simple and effective methods to utilize AI-powered tools, along with
            essential platforms and frameworks for developing artificial
            intelligence applications.
          </p>
          <Link href="/discover">
            <button className="mt-6 rounded-full bg-gradient-to-r from-lime-400 to-cyan-500 px-4 py-1 text-[12px] text-lg font-semibold text-black shadow-lg transition-transform duration-300 hover:scale-105 md:px-8 md:py-3 md:text-[16px]">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default About;
