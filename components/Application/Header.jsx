"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import LogoutButton from "@/components/Application/LogoutButton";
import Logo from "@/public/assets/images/logo.png";
import Image from "next/image";
import { useState } from "react";
import { ShoppingCartIcon } from "lucide-react";

export default function Header({ isLoggedIn }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const noOfitem = useSelector((state) => state.bag);

  return (
    <header className="bg-gradient-to-r from-indigo-900 via-purple-900 to-gray-900 text-white shadow-md border-b border-white/10 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src={Logo}
            alt="CineBuzz Logo"
            width={40}
            height={40}
            priority
            className="w-auto h-8 drop-shadow-lg"
          />
          <span className="self-center text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
            CineBuzz
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 font-medium">
          <Link
            href="/"
            className="hover:text-pink-400 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            href="/auth/popular"
            className="hover:text-pink-400 transition-colors duration-300"
          >
            Popular
          </Link>
          <Link
            href="/auth/upcoming"
            className="hover:text-pink-400 transition-colors duration-300"
          >
            Upcoming
          </Link>
        </nav>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <LogoutButton />
          ) : (
            <Link href="/auth/login">
              <button className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:scale-105 transition-transform text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-pink-400/30">
                Login / Sign Up
              </button>
            </Link>
          )}

          {/* Cart */}
          <Link href="/auth/cart" className="relative">
            <ShoppingCartIcon className="w-7 h-7 text-white hover:text-pink-400 transition" />
            {noOfitem.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
                {noOfitem.length}
              </span>
            )}
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/10"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {/* Hamburger Icon */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-gradient-to-b from-indigo-950 via-purple-950 to-gray-900 px-6 py-4 space-y-3 border-t border-white/10 backdrop-blur-md animate-fade-in">
          <Link
            href="/"
            className="block text-gray-100 hover:text-pink-400 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/auth/popular"
            className="block text-gray-100 hover:text-pink-400 transition-colors"
          >
            Popular
          </Link>
          <Link
            href="/auth/upcoming"
            className="block text-gray-100 hover:text-pink-400 transition-colors"
          >
            Upcoming
          </Link>
        </div>
      )}
    </header>
  );
}
