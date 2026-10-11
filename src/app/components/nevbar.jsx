"use client";

import { toast } from "react-toastify";
import Link from 'next/link';
import Image from 'next/image';
import NavLinks from './navLinks';
import { useSession, signOut } from '../../lib/auth-client';

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const handleSignOut = async () => {
  try {
    await signOut();
    toast.success("Sign Out Successful!");
  } catch (error) {
    toast.error("Sign Out Failed!");
  }
};
  
  return (
    <nav className="w-full bg-[#f8f9fa] px-4 py-3 sm:px-8 pb-0">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 bg-[#0f8a42] rounded-2xl flex items-center justify-center shadow-sm relative overflow-hidden">
            <Image
              src="/ass/logo-icon.png"
              alt="Logo"
              width={44}
              height={44}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
              বাজার দর
            </h1>
            <span className="text-xs sm:text-sm text-gray-600 font-medium">
              মঙ্গলবার, ৬ অক্টোবর, ২০২৬
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-3">
          {isPending ? (
            <div className="h-9 w-24 bg-gray-200 animate-pulse rounded-xl" />
          ) : session ? (
            <div className="flex items-center space-x-3">
              {session.user?.image ? (
                <Link
                  href="/profile"
                  className="relative w-9 h-9 rounded-full overflow-hidden border border-gray-300 block hover:opacity-95 transition-opacity"
                >
                  <Image
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    fill
                    className="object-cover"
                  />
                </Link>
              ) : (
                <Link
                  href="/profile"
                  className="text-sm font-medium text-gray-700 hidden sm:inline-block hover:underline"
                >
                  {session.user?.name || session.user?.email}
                </Link>
              )}
              <button
                onClick={handleSignOut}
                className="px-4 py-2 text-sm font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 rounded-xl transition-all"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="px-3.5 py-2 text-sm font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-200/60 rounded-xl transition-all"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="px-4 py-2 text-sm font-semibold text-white bg-[#0f8a42] hover:bg-[#0c7337] rounded-xl shadow-sm hover:shadow transition-all"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>

  );

} 