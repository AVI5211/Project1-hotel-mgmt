export default function HotelPage({
  image,
  hotelRating,
  hotelAddress,
  hotelName,
  hotelFeatures,
  totalDays,
  hotelDiscountedPrice,
}: any) {
  return (
    <div className="p-2">
      <div className="mainContainer max-w-3xl text-white">
        <div className="header my-2">
          <div className="flex justify-between items-center px-4">
            <p className="lg:text-2xl text-xl  font-bold text-amber-700">
              {hotelName.toUpperCase()}
            </p>
            <div className="flex">
              <p>Ratings : </p>
              {Array.from({ length: hotelRating }, (_, index) => (
                <span key={index} className="text-yellow-400">
                  ⭐
                </span>
              ))}
            </div>
          </div>
          <p className="text-gray-300 px-4">{hotelAddress}</p>
        </div>
        <div className="hotel-main ">
          <img src={image} alt="" className="w-96 rounded-md" />
        </div>
        <div className="my-2">
          <p className="lg:text-2xl text-xl font-bold py-1">
            Why to book this property ?{" "}
          </p>
          <div className="flex  flex-col w-full lg:text-xl py-1">
            <p className="font-semibold ">Features </p>{" "}
            <div className="">
              {hotelFeatures.map((feature: any, index: string) => (
                <li
                  key={index}
                  className="list-none px-2 rounded text-slate-200"
                >
                  {feature}
                </li>
              ))}
            </div>
          </div>
          <div className="max-w-2xl flex flex-col ">
            <p className="font-semibold lg:text-xl">Description </p>{" "}
            <p className=" px-2 lg:text-xl font-Oswald">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
              natus quia ea veniam harum veritatis exercitationem fugit eos.
              Corrupti recusandae placeat veritatis nemo dolorum explicabo
              tempora, cupiditate fugit labore minima?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
