import React from "react";

const BinaryIcons = () => {
  // Array of icon data
  const icons = [
    {
      src: "/assets/img/th-1/16.png",
      alt: "Package 1",
      label: "Solar Starter",
    },
    { src: "/assets/img/th-1/17.png", alt: "Package 2", label: "Power Growth" },
    { src: "/assets/img/th-1/18.png", alt: "Package 3", label: "Elite Energy" },
    {
      src: "/assets/img/th-1/verified.png",
      alt: "Package 3",
      label: "Verified User",
    },
    {
      src: "/assets/img/th-1/unverified.png",
      alt: "Package 3",
      label: "Unverified User",
    },
    {
      src: "/assets/img/th-1/empty.png",
      alt: "Package 3",
      label: "Empty Position",
    },
  ];

  return (
    <div className="w-full flex justify-center">
      <div className="flex gap-8 p-8 rounded-2xl border-2 border-gray-300 items-center justify-center w-[612px]">
        {icons.map((icon, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <img src={icon.src} alt={icon.alt} className="w-12 h-12" />
            <span>{icon.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BinaryIcons;
