import Image from "next/image";
import InteractiveCard from "./InteractiveCard";
import Rating from "@mui/material/Rating";
import React from "react";

interface CardProps {
  campgroundName: string;
  imgSrc: string;
  onRating?: (rating: number) => void; // ทำให้เป็น optional
}

export default function Card({ campgroundName, imgSrc, onRating }: CardProps) {
  const [value, setValue] = React.useState<number | null>(0);

  return (
    <InteractiveCard>
      <div className="w-full h-[70%] relative rounded-t-lg">
        <Image src={imgSrc} alt="Product Picture" fill className="object-cover rounded-t-lg relative" />
      </div>
      <div className="w-full h-[30%] p-[10px]">
        <h2 className="text-[14px] font-bold mb-1 text-[#501717] underline">{campgroundName}</h2>

        {onRating && ( // แสดง Rating เฉพาะเมื่อ onRating ถูกส่งมา
          <div onClick={(e) => e.stopPropagation()}>
            <Rating
              id={`${campgroundName} Rating`}
              name={`${campgroundName} Rating`}
              data-testid={`${campgroundName} Rating`}
              value={value}
              onChange={(e, newValue) => {
                setValue(newValue);
                if (newValue !== null) onRating(newValue);
              }}
            />
          </div>
        )}
      </div>
    </InteractiveCard>
  );
}
