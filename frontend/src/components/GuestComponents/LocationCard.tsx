import React from "react";

interface LocationCardProps {
  locationImage: string;
  locationTitle: string;
  locationDescription: string;
}

const LocationCard: React.FC<LocationCardProps> = ({
  locationImage,
  locationTitle,
  locationDescription,
}) => {
  return (
    <div className="cardItem w-[25vw] flex flex-col items-center gap-3 p-4 border rounded-xl shadow-lg">
      <div>
        <img
          className="w-64 rounded-lg"
          src={locationImage}
          alt={locationTitle}
        />
      </div>
      <div className="w-[25vw] text-center p-1">
        <p className="font-semibold text-lg">{locationTitle}</p>
        <p>{locationDescription}</p>
        <button className="p-2 rounded font-semibold border  bg-[#af2626] text-white mt-2">
          Get the deal
        </button>
      </div>
    </div>
  );
};

export default LocationCard;
