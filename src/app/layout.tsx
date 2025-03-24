import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import TopMenu from "@/components/TopMenu";
import Footer from "@/components/Footer"; // จะสร้างไฟล์นี้ด้านล่าง
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
import NextAuthProvider from "@/providers/NextAuthProvider";
import ReduxProvider from "@/redux/ReduxProvider";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Thai Campgrounds - หาและจองแคมป์กราวนด์ที่ดีที่สุดในประเทศไทย",
  description:
    "แพลตฟอร์มสำหรับการค้นหาและจองแคมป์กราวนด์ทั่วประเทศไทย ให้คุณได้สัมผัสประสบการณ์การพักผ่อนท่ามกลางธรรมชาติ",
  keywords:
    "แคมป์กราวนด์, campground, เต็นท์, กางเต็นท์, ท่องเที่ยวธรรมชาติ, แคมป์ปิ้ง, การจองแคมป์, ประเทศไทย",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nextAuthSession = await getServerSession(authOptions);
  return (
    <html lang="th" className="scroll-smooth">
      <body
        className={`${poppins.className} antialiased text-gray-800 min-h-screen flex flex-col`}
      >
        <NextAuthProvider session={nextAuthSession}>
          <ReduxProvider>
            {/* Header */}
            <TopMenu />

            {/* Main Content */}
            <main className="flex-grow">{children}</main>

            {/* Footer */}
            <Footer />
          </ReduxProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}

