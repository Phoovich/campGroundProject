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
    router.push("/venue");
  };

  return (
    <div 
      className="relative w-full h-[500px] flex items-center justify-center cursor-pointer overflow-hidden"
      onClick={handleBannerClick}
    >
      <Image 
        src={bannerImages[currentImageIndex]} 
        alt="Banner" 
        layout="fill" 
        objectFit="cover"
      />

      {session?.user && (
        <div className="absolute top-5 right-5 bg-white bg-opacity-80 text-black px-4 py-2 rounded shadow-md">
          Welcome {session.user.name}
        </div>
      )}

      <div className="absolute text-center text-white drop-shadow-lg">
        <h1 className="text-5xl font-medium">Where Every Camper Finds Their Escape</h1>
        <p className="text-2xl font-serif mt-2">Book Your Perfect Campsite for a Memorable Outdoor Experience!</p>
      </div>

      <button
        className="absolute bottom-5 right-5 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded shadow-md transition-all"
        onClick={handleButtonClick}
      >
        Select Camp
      </button>
    </div>
  );
}