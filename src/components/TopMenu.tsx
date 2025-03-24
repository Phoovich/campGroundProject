"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import TopMenuItem from "./TopMenuItem";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function TopMenu() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll event to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when path changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative h-10 w-10">
              <Image
                src="/img/logo.png" // ใส่โลโก้ของคุณที่นี่
                alt="Thai Campgrounds Logo"
                width={70}
                height={70}
                className="object-contain "
                onError={(e) => {
                  // @ts-ignore
                  e.target.src = "/favicon.ico"; // Fallback if logo.png doesn't exist
                }}
              />
            </div>
            <span
              className={`font-bold text-lg ${isScrolled ? "text-orange-600" : "text-white drop-shadow-md"}`}
            >
              DINOPARK
            </span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-1">
            <TopMenuItem
              title="หน้าหลัก"
              pageRef="/"
              isActive={pathname === "/"}
              isScrolled={isScrolled}
            />
            <TopMenuItem
              title="แคมป์กราวนด์"
              pageRef="/campground"
              isActive={pathname.includes("/campground")}
              isScrolled={isScrolled}
            />

            {session ? (
              <>
                <TopMenuItem
                  title="การจองของฉัน"
                  pageRef="/mybooking"
                  isActive={pathname === "/mybooking"}
                  isScrolled={isScrolled}
                />
                <div className="relative group ml-2">
                  <button
                    className={`flex items-center px-4 py-2 rounded-full ${
                      isScrolled
                        ? "text-gray-700 hover:bg-gray-100"
                        : "text-white hover:bg-white/10"
                    } transition-all`}
                  >
                    <span className="mr-1">{session.user?.name || "User"}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg overflow-hidden z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="p-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {session.user?.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {session.user?.email}
                      </p>
                    </div>
                    <div className="py-1">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        โปรไฟล์
                      </Link>
                      <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        ออกจากระบบ
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/api/auth/signin"
                  className={`px-4 py-2 rounded-full ${
                    isScrolled
                      ? "text-gray-700 hover:bg-gray-100"
                      : "text-white hover:bg-white/10"
                  } transition-all`}
                >
                  เข้าสู่ระบบ
                </Link>
                <Link
                  href="/register"
                  className={`px-4 py-2 rounded-full ${
                    isScrolled
                      ? "bg-orange-600 text-white hover:bg-orange-700"
                      : "bg-white/90 text-orange-700 hover:bg-white"
                  } transition-all font-medium`}
                >
                  สมัครสมาชิก
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
