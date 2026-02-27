import React from "react";
import GuestNavbar from "../../components/GuestComponents/GuestNavbar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import BookingHistory from "../../components/GuestComponents/BookingHistory";

const NoBookingsFound = () => (
  <div className="flex flex-col items-center justify-center h-64">
    <h2 className="text-2xl font-semibold text-gray-700 mb-4">
      No Bookings Found
    </h2>
    <p className="text-gray-500">
      It looks like you don't have any bookings yet.
    </p>
  </div>
);

export default function Bookings() {
  const { isPending, error, data } = useQuery({
    queryKey: ["bookingList"],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:5000/api/guest/bookings`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },
  });

  return (
    <section className="bg-dark-gray bg-custom-gradient-2 lg:h-[100vh] min-h-[100vh]">
      <div className="h-[10vh] flex items-center justify-center ">
        <GuestNavbar />
      </div>
      {isPending ? (
        <p>Loading...</p>
      ) : error ? (
        <NoBookingsFound />
      ) : data && data.length > 0 ? (
        <BookingHistory bookings={data} />
      ) : (
        <NoBookingsFound />
      )}
    </section>
  );
}
