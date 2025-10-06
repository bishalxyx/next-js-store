import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-950 via-purple-900 to-gray-900 text-gray-300 relative overflow-hidden border-t border-white/10 shadow-[0_-1px_25px_rgba(0,0,0,0.3)]">
      <div className="max-w-screen-xl mx-auto px-6 py-10">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Logo / Brand */}
          <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400 tracking-wide">
            CineBuzz™
          </span>

          {/* Links */}
          <ul className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium">
            <li>
              <a
                href="#"
                className="hover:text-pink-400 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-purple-400 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-indigo-400 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]"
              >
                Licensing
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-pink-400 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]"
              >
                Contact
              </a>
            </li>
          </ul>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-end gap-5 text-lg">
            <a
              href="#"
              className="hover:text-blue-500 hover:scale-110 transition-all duration-300"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="hover:text-sky-400 hover:scale-110 transition-all duration-300"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="hover:text-pink-500 hover:scale-110 transition-all duration-300"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="hover:text-gray-300 hover:scale-110 transition-all duration-300"
            >
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-8"></div>

        {/* Bottom Section */}
        <div className="text-center text-sm text-gray-400">
          © {new Date().getFullYear()}{" "}
          <a
            href="#"
            className="hover:text-pink-400 hover:underline transition-colors duration-300"
          >
            CineBuzz™
          </a>
          . All Rights Reserved.
        </div>
      </div>

      {/* Decorative Glow Line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 blur-sm opacity-75"></div>
    </footer>
  );
};
