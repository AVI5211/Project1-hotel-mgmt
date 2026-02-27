import { Link } from "react-router-dom";

interface MainHotelCardProps {
  hotelImage: string;
  hotelName: string;
  hotelAddress: string;
  hotelRating: number;
  hotelFeatures: string[];
  hotelPrice: number;
  hotelDiscountedPrice?: number;
  isRefundable?: boolean;
  totalDate: number;
}

function MainHotelCard({
  hotelImage,
  hotelName,
  hotelAddress,
  isRefundable = false,
  hotelRating,
  hotelFeatures,
  hotelPrice,
  hotelDiscountedPrice,
}: MainHotelCardProps) {
  return (
    <div className="flex flex-col sm:flex-row border rounded-lg w-full sm:w-fit overflow-hidden bg-white m-2">
      <div className="w-full sm:w-72">
        <img
          src={hotelImage}
          className="w-full h-48 sm:h-full object-cover"
          alt={hotelName}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 p-4">
        <div className="flex flex-col justify-between flex-grow">
          <div className="nameAndFeatures">
            <h2 className="font-bold text-lg mb-1">
              {hotelName.toUpperCase()}
            </h2>
            <p className="text-sm text-gray-600 mb-2">{hotelAddress}</p>

            <ul className="flex flex-wrap gap-2 w-[200px] text-xs text-gray-600 mb-3">
              {hotelFeatures.map((feature, index) => (
                <li key={index} className="bg-gray-100 px-2 py-1 rounded">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="refundAndRatings">
            {isRefundable ? (
              <p className="text-green-400 text-sm mb-1">Refundable</p>
            ) : (
              <p className="text-red-600 text-sm mb-1">Non Refundable</p>
            )}
            <div className="flex">
              {Array.from({ length: hotelRating }, (_, index) => (
                <span key={index} className="text-yellow-400">
                  ⭐
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="price flex flex-row sm:flex-col justify-between sm:justify-end items-end">
          {hotelDiscountedPrice && (
            <p className="line-through text-gray-500 text-sm">${hotelPrice}</p>
          )}
          <p className="font-semibold text-lg">
            ${hotelDiscountedPrice || hotelPrice}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MainHotelCard;
