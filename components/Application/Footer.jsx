import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-screen-xl mx-auto px-6 py-8 md:py-10">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Logo / Brand */}
          <span className="text-xl font-semibold text-white">
            CineBuzz™
          </span>

          {/* Links */}
          <ul className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <li>
              <a
                href="#"
                className="hover:text-white transition-colors duration-200"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white transition-colors duration-200"
              >
                Licensing
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white transition-colors duration-200"
              >
                Contact
              </a>
            </li>
          </ul>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-end gap-4">
            <a href="#" className="hover:text-blue-500 transition-colors">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-pink-500 transition-colors">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-gray-400 transition-colors">
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Bottom Section */}
        <div className="text-center text-sm text-gray-400">
          © {new Date().getFullYear()}{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            CineBuzz™
          </a>
          . All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};
