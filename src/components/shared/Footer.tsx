import React from "react";
import { Facebook, Twitter, Linkedin } from "lucide-react";
import Container from "./Container";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#212121] py-10 text-white">
      <Container>
        <div className="container mx-auto space-y-6 px-4 text-center">
          {/* CTA Section */}
          <div>
            <h2 className="text-2xl font-semibold">See the magic. Try now</h2>
            <Link href="/discover">
              <button className="mt-6 rounded-full bg-gradient-to-r from-lime-400 to-cyan-500 md:px-8 px-4 py-1 md:py-3 text-lg font-semibold text-black shadow-lg text-[12px] md:text-[16px] transition-transform duration-300 hover:scale-105">
                Generate Images
              </button>
            </Link>
          </div>

          {/* Footer Bottom */}
          <div className="flex flex-col items-center justify-between border-t border-gray-700 pt-6 md:flex-row">
            {/* Logo & Copyright */}
            <Link href="/" className="text-lg font-bold">
              DreamAI
            </Link>
            <p className="mt-2 text-sm md:mt-0">
              © {new Date().getFullYear()} DreamAI. All rights reserved.
            </p>

            {/* Social Icons */}
            <div className="mt-4 flex space-x-4 md:mt-0">
              <a href="#" className="hover:text-blue-400">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-blue-400">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-blue-400">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
