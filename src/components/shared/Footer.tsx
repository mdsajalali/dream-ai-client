import React from "react";
import { Facebook, Twitter, Linkedin } from "lucide-react";
import Container from "./Container";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <Container>
        <div className="container mx-auto px-4 text-center space-y-6">
          {/* CTA Section */}
          <div>
            <h2 className="text-2xl font-semibold">See the magic. Try now</h2>
            <button className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 transition rounded-lg">
              Generate Images
            </button>
          </div>

          {/* Footer Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-6">
            {/* Logo & Copyright */}
            <p className="text-lg font-bold">DreamAI</p>
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
