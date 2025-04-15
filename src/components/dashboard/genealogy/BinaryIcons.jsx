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
      <div className="flex flex-wrap gap-4 p-4 rounded-xl border border-gray-300 items-center justify-center max-w-[600px]">
        {icons.map((icon, index) => (
          <div key={index} className="flex items-center gap-2 w-[150px]">
            <img src={icon.src} alt={icon.alt} className="w-8 h-8" />
            <span className="text-xs">{icon.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BinaryIcons;
