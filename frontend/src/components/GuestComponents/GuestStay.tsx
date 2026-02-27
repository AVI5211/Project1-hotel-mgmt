function GuestStay({
  image,
  cityName,
  country,
}: {
  image: string;
  cityName: string;
  country: string;
}) {
  return (
    <div className="flex flex-col items-start justify-center  rounded-lg border max-w-fit text-slate-300">
      <img
        src={image}
        className="max-w-60 max-h-36 rounded-lg "
        alt={`${cityName}, ${country}`}
      />
      <div className="p-2">
        <h2 className=" font-serif font-bold ">{cityName}</h2>
        <p>{country}</p>
      </div>
    </div>
  );
}

export default GuestStay;
