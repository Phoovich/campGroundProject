"use client";

import Image from "next/image";
import { useState, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const bannerImages = [
  "/img/cover.jpg",
  "/img/cover2.jpg",
  "/img/cover3.jpg",
  "/img/cover4.jpg",
];

export default function Banner() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const router = useRouter();
  const { data: session } = useSession();

  const handleBannerClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
  };

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    router.push("/campground");
  };

  return (
    <div
      className="relative w-full h-screen flex flex-col items-center justify-center cursor-pointer overflow-hidden mt-[-50px]"
      onClick={handleBannerClick}
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={bannerImages[currentImageIndex]}
          alt="Banner"
          layout="fill"
          objectFit="cover"
          className="w-full h-full transition-opacity duration-700 ease-in-out"
        />
      </div>

      {/* Overlay Effect */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Welcome Box for Logged-in User */}
      {session?.user && (
        <div className="absolute top-5 right-5 bg-white bg-opacity-80 text-black px-4 py-2 rounded-xl shadow-md">
          Welcome, <span className="font-semibold">{session.user.name}</span>
        </div>
      )}

      {/* Text Content & Button Group */}
      <div className="relative text-center text-white drop-shadow-lg z-10 px-6">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          Where Every Camper Finds Their Escape
        </h1>
        <p className="text-lg md:text-2xl font-serif mt-4 max-w-3xl mx-auto">
          Book Your Perfect Campsite for a Memorable Outdoor Experience!
        </p>

        {/* CTA Button */}
        <button
          className="mt-8 bg-white bg-opacity-80 text-black font-medium px-10 py-4 rounded-full shadow-md transition-all
          hover:bg-opacity-100 hover:shadow-xl active:scale-95 z-10"
          onClick={handleButtonClick}
        >
          Select Campgrounds
        </button>
      </div>
    </div>
  );
}
