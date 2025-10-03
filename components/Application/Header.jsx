"use client";
import Link from "next/link";
import { useSelector } from 'react-redux';
import LogoutButton from "@/components/Application/LogoutButton";
import Logo from '@/public/assets/images/logo.png'
import Image from "next/image";
import { useState } from "react";
import { ShoppingCartIcon } from "lucide-react";
export default function Header({ isLoggedIn }) {
  const [menuOpen, setMenuOpen] = useState(false);
  // const cartCount=0;
  const noOfitem=useSelector(state=>state.bag);
  // console.log(isLoggedIn);
  return (
    <header className="bg-[#0B1D39] text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image
            src={Logo}
            alt="CineBuzz Logo"
            width={40}
            height={40}
            priority
            className="w-auto h-8"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            CineBuzz
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 font-medium">
          <Link href="/">Home</Link>
          <Link href="/auth/popular">Popular</Link>
          <Link href="/auth/upcoming">Upcoming</Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <LogoutButton/>
          ) : (
            <Link href="/auth/login">
              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium">
                Login / Sign up
              </button>
            </Link>
          )}
          <Link href="/auth/cart" className="relative">
            <ShoppingCartIcon className="w-7 h-7 text-white hover:text-gray-300 transition" />
            {noOfitem.length >0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
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
        <div className="md:hidden bg-[#0B1D39] px-6 py-4 space-y-3">
          <Link href="/" className="block">
            Home
          </Link>
          <Link href="/auth/popular" className="block">
            Popular
          </Link>
          <Link href="/auth/upcoming" className="block">
            Upcoming
          </Link>
        </div>
      )}
    </header>
  );
}
