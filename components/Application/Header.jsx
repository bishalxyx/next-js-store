"use client";
import Link from "next/link";
import LogoutButton from "@/components/Application/LogoutButton";

export default function Header({ isLoggedIn }) {
  // console.log(isLoggedIn);
  return (
    <header className="bg-[#0B1D39] text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <span className="text-2xl font-bold">LOGO</span>
        <nav className="hidden md:flex space-x-8 font-medium">
          <Link href="/">Home</Link>
          <Link href="/auth/popular">Popular</Link>
          <Link href="/auth/upcoming">Upcoming</Link>
        </nav>
        <div className="flex items-center space-x-4">
          {isLoggedIn ? <LogoutButton /> : <Link href="/auth/login">
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium">
          Login / Sign up
          </button>
          </Link>}
        </div>
      </div>
    </header>
  );
}
