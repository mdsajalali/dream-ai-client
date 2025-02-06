import React from "react";
import Marquee from "react-fast-marquee";

const effects = [
  { id: 1, name: "Backlight" },
  { id: 2, name: "Color Grading" },
  { id: 3, name: "Depth of Field" },
  { id: 4, name: "TXAA" },
  { id: 5, name: "Beautiful" },
  { id: 6, name: "Moody Lighting" },
  { id: 7, name: "Backlight" },
  { id: 8, name: "Color Grading" },
  { id: 9, name: "Depth of Field" },
  { id: 10, name: "TXAA" },
  { id: 11, name: "Beautiful" },
  { id: 12, name: "Moody Lighting" },
  { id: 13, name: "Backlight" },
  { id: 14, name: "Color Grading" },
  { id: 15, name: "Depth of Field" },
  { id: 16, name: "TXAA" },
];

const AiTexts = () => {
  return (
    <div className="bg-black">
      <Marquee className="cursor-pointer" pauseOnHover>
        {effects.map((effect) => (
          <div
            key={effect.id}
            className="mx-4 my-5 rounded-full bg-white p-2 text-[14px] font-medium duration-300 hover:bg-black hover:text-white"
          >
            {effect.name}
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default AiTexts;
