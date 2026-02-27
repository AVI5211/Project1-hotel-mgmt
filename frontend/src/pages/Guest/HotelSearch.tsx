import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import BookingForm from "../../components/GuestComponents/BookingForm";
import GuestNavbar from "../../components/GuestComponents/GuestNavbar";
import MainHotelCardLoading from "../../components/loadingComponents/MainHotelCardLoading";
import MainHotelCard from "../../components/GuestComponents/MainhotelCard";

function HotelSearch() {
  function calculateTotalDays(from: Date, to: Date): number {
    console.log("Start Date:", from);
    console.log("End Date:", to);

    if (!(from instanceof Date) || !(to instanceof Date)) {
      console.error(
        "Invalid date input: Start or end date is not a Date object"
      );
      return 0;
    }

    if (isNaN(from.getTime()) || isNaN(to.getTime())) {
      console.error("Invalid date input: Unable to parse dates");
      return 0;
    }

    const diffInMilliseconds = to.getTime() - from.getTime();
    const totalDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

    console.log("Calculated Total Days:", totalDays);

    return Math.floor(totalDays);
  }

  const stateLocation = useLocation();
  const { initialDateRange, initialGuest, initialLocation } =
    stateLocation.state || {};

  const [bookingData, setBookingData] = useState({
    location: initialLocation,
    dateRange: initialDateRange,
    guests: initialGuest,
  });
  console.log(bookingData.dateRange);

  const totalDays = bookingData.dateRange
    ? calculateTotalDays(bookingData.dateRange.from, bookingData.dateRange.to)
    : 0;

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["listOfHotels", bookingData.location],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:5000/api/guest/hotels?location=${bookingData.location}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setTimeout(() => {
        console.log("data is being fetched");
      }, 2000);
      return response.data.data;
    },
    enabled: !!bookingData.location,
  });

  const handleBookingSubmit = (formValues: any) => {
    setBookingData({
      location: formValues.location,
      dateRange: formValues.dateRange,
      guests: formValues.guests,
    });
    refetch();
  };

  return (
    <div className="bg-dark-gray bg-custom-gradient-2 min-h-screen">
      <div className="flex justify-center items-center">
        <GuestNavbar />
      </div>
      <div className="w-screen justify-center flex items-center">
        <div className="max-w-7xl ">
          <BookingForm
            initialLocation={bookingData.location}
            initialDateRange={bookingData.dateRange}
            initialGuests={bookingData.guests}
            onSubmit={handleBookingSubmit}
          />
        </div>
      </div>

      <div className="HotelCards p-2">
        {isPending && (
          <div className="flex justify-center items-center">
            <MainHotelCardLoading />
          </div>
        )}
        {error && <div>No Hotels were found</div>}
        {data && data.length === 0 && (
          <div className="flex justify-center items-center w-screen">
            <p className="text-xl text-gray-500">
              {" "}
              No hotels found in this area
            </p>
          </div>
        )}
        {data &&
          data.map((hotel: any) => (
            <div className="flex justify-center flex-col items-center   ">
              <Link
                key={hotel.id}
                to={{
                  pathname: "/hotelBook",
                }}
                state={{
                  hotelId: hotel.id,
                  hotelImage: hotel.hotelImage,
                  hotelName: hotel.name,
                  hotelAddress: hotel.location,
                  isRefundable: hotel.isRefundable,
                  hotelRating: hotel.ratings,
                  hotelFeatures: hotel.features,
                  hotelPrice: 1000,
                  hotelDiscountedPrice: 500,
                  dateRange: bookingData.dateRange,
                  guestDetails: bookingData.guests,
                  totalDays: totalDays,
                }}
              >
                <MainHotelCard
                  hotelImage={hotel.hotelImage}
                  hotelAddress={hotel.location}
                  hotelPrice={1000}
                  hotelFeatures={hotel.features}
                  hotelRating={hotel.ratings}
                  hotelName={hotel.name}
                  hotelDiscountedPrice={500}
                  totalDate={totalDays}
                />
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

export default HotelSearch;
