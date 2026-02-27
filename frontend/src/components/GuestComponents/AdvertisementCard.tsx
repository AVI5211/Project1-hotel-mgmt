function AdvertisementCard() {
  return (
    <div className="flex flex-wrap gap-2  p-2 text-slate-300">
      <div className="free-cancelation border-[.2px] rounded-sm w-full md:w-auto">
        <img
          src="./scenic-image.webp"
          className="object-cover  h-auto aspect-video lg:w-[24vw] md:w-[718px]  object-center md:min-h-[227px] md:max-h-[227px] "
          alt="Scenic view"
        />
        <div className="p-1">
          <p>Free cancellation on most hotels</p>
          <p>Because Flexibility Matters</p>
        </div>
      </div>
      <div className="containers flex flex-col gap-2 border-[0.2px] rounded-sm">
        <div className="lastminDeals flex items-center gap-2">
          <img
            src="group-people.avif"
            className="max-h-36"
            alt="Group of people"
          />
          <div>
            <p>Last Minute Deals Available</p>
            <p>Find your next getaway</p>
          </div>
        </div>
        <div className="ideasInspiration flex items-center gap-2 border">
          <img
            src="group-people.avif"
            className="max-h-36"
            alt="Group of people"
          />
          <div className="lg:w-[18vw] ">
            <p>When you are ready to get away we'll be ready to inspire you</p>
            <p>Trip ideas and inspiration</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdvertisementCard;
