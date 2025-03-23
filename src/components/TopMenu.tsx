import TopMenuItem from "./TopMenuItem";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Link from "next/link";

export default async function TopMenu() {
  const session = await getServerSession(authOptions);

  return (
    <div className="fixed top-0 w-full h-[50px] flex items-center justify-center bg-white/80 backdrop-blur-md shadow-md z-50 text-sm">
      {/* โลโก้ */}
      <Link href="/" className="cursor-pointer">
        <Image
          src="/img/logo.png"
          alt="logo"
          width={50}
          height={50}
          className="w-auto"
        />
      </Link>

      {/* เมนูตรงกลาง */}
      <div className="flex items-center gap-6 mx-6">
        <TopMenuItem title="Booking" pageRef="/booking" />
        <TopMenuItem title="MyBooking" pageRef="/mybooking" />
      </div>

      {/* ปุ่ม Sign-in / Sign-out */}
      <div>
        {session ? (
          <Link href="/api/auth/signout" className="text-cyan-600">
            Sign-out
          </Link>
        ) : (
          <Link href="/api/auth/signin" className="text-cyan-600">
            Sign-in
          </Link>
        )}
      </div>
    </div>
  );
}
