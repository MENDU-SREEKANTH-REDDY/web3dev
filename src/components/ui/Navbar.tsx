"use client";

import Link from "next/link";
import { useUser, SignOutButton } from "@clerk/nextjs";

export default function Navbar() {
  const { isSignedIn } = useUser();

  const navItemClass =
    "text-white hover:bg-white/10 backdrop-blur-sm px-3 py-1 rounded transition duration-200";

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-black to-orange-600 p-4 flex justify-between z-50 border-b-2 border-white/20">
      <Link href="/" className={`text-xl font-bold ${navItemClass}`}>
        TaskGen
      </Link>

      <div className="space-x-4 flex items-center">
        <Link href="/" className={navItemClass}>
          Dashboard
        </Link>

        {isSignedIn ? (
          <>
            <Link href="/saved" className={navItemClass}>
              Saved Tasks
            </Link>
            <SignOutButton>
              <button className={navItemClass}>Logout</button>
            </SignOutButton>
          </>
        ) : (
          <Link href="/sign-in" className={navItemClass}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
