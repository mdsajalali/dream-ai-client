import React from "react";
import { Facebook, Twitter, Linkedin } from "lucide-react";
import Container from "./Container";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <Container>
        <div className="container mx-auto px-4 text-center space-y-6">
          {/* CTA Section */}
          <div>
            <h2 className="text-2xl font-semibold">See the magic. Try now</h2>
            <Link href="/discover">
              <button className="mt-6 px-8 py-3 text-lg font-semibold text-black bg-gradient-to-r from-lime-400 to-cyan-500 rounded-full shadow-lg hover:scale-105 transition-transform duration-300">
                Generate Images
              </button>
            </Link>
          </div>

          {/* Footer Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-6">
            {/* Logo & Copyright */}
            <Link href="/" className="text-lg font-bold">
              DreamAI
            </Link>
            <p className="text-sm mt-2 md:mt-0">
              © {new Date().getFullYear()} DreamAI. All rights reserved.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4 mt-4 md:mt-0">
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
