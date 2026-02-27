import { useRef } from "react";
import BookingForm from "../../components/GuestComponents/BookingForm";
import GuestNavbar from "../../components/GuestComponents/GuestNavbar";
import GuestStay from "../../components/GuestComponents/GuestStay";
import AdvertisementCard from "../../components/GuestComponents/AdvertisementCard";
import { DateRange } from "react-day-picker";
import { useNavigate } from "react-router-dom";

function MainGuestPage() {
  const navigate = useNavigate();
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };
  const initialDateRange: DateRange = {
    from: new Date(2024, 9, 1),
    to: new Date(2024, 9, 7),
  };
  return (
    <div className="flex justify-center gap-2  lg:items-center flex-col  bg-dark-gray bg-custom-gradient-2 ">
      <div className="font-Roboto">
        <div className="h-[10vh] flex items-center justify-center">
          <GuestNavbar />
        </div>

        <div className="min-h-52 bg-cover bg-no-repeat flex flex-col justify-center items-start p-2">
          <BookingForm
            initialLocation="Kathmandu"
            initialDateRange={initialDateRange}
            initialGuests={{ adults: 1, rooms: 1 }}
            onSubmit={(data) => {
              navigate("/hotelSearch", {
                state: {
                  initialLocation: data.location,
                  initialGuest: data.guests,
                  initialDateRange: data.date,
                },
              });
            }}
          />
        </div>
        <div className="outer-div p-3 flex  flex-col ">
          <p className="font-bold lg:text-xl text-base font-serif text-slate-200">
            Explore stays in trending location
          </p>
          <div className="relative max-w-4xl p-3">
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white p-2 rounded-full"
              onClick={scrollLeft}
            >
              &#8592;
            </button>

            <div
              ref={carouselRef}
              className="carousel-comp p-3 flex max-w-4xl overflow-x-auto gap-2 scrollbar-hide"
            >
              <GuestStay image="./dubai.jpg" cityName="Dubai" country="UAE" />
              <GuestStay
                image="./Bali.jpg"
                cityName="Bali"
                country="Indonesia"
              />
              <GuestStay
                image="./kathmandu.jpg"
                cityName="kathmandu"
                country="Nepal"
              />
              <GuestStay image="./dubai.jpg" cityName="Dubai" country="UAE" />
              <GuestStay image="./dubai.jpg" cityName="Dubai" country="UAE" />
            </div>

            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white p-2 rounded-full"
              onClick={scrollRight}
            >
              &#8594;
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="p-3 flex  flex-col">
          <p className="font-bold lg:text-xl text-base  font-serif text-slate-300">
            Explore world with us
          </p>
        </div>
        <AdvertisementCard />
      </div>
    </div>
  );
}

export default MainGuestPage;
