"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import styles from "./banner.module.css";

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

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    router.push("/venue");
  };

  return (
    <div className={styles.banner} onClick={handleBannerClick}>
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

      <div className={styles.bannerText}>
        <h1 className="text-4xl font-medium">Where Every Event Finds Its Venue</h1>
        <p className="text-xl font-serif">
          Book our elegant venue for your special events with premium services and a perfect ambiance!
        </p>
      </div>

      <button
        className="absolute bottom-5 right-5 bg-red-500 text-white px-4 py-2 rounded z-10"
        onClick={handleButtonClick}
      >
        Select Venue
      </button>
    </div>
  );
}
