import React from "react";
import { DateRange } from "react-day-picker";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
  CardHeader,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { CalendarDays, Users, Bath, BadgeDollarSign } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/ui/drawer";
import PaymentPortal from "./PaymentPortal";

interface BookingSummaryProps {
  numberOfAdults: number;
  numberOfRooms: number;
  dateRange: DateRange;
  totalDays: number;
  hotelPrice: number;
  hotelDiscountedPrice: number;
  hotelId: number;
  hotelAddress: string;
}

function BookingSummary({
  hotelId,
  hotelAddress,
  numberOfAdults,
  numberOfRooms,
  dateRange,
  totalDays,
  hotelPrice,
  hotelDiscountedPrice,
}: BookingSummaryProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="w-full lg:max-w-3xl">
      <div className="container px-4 md:px-6">
        <h2 className="text-xl lg:text-2xl font-bold tracking-tighter mb-8 text-amber-800">
          Your Booking Summary
        </h2>
        <Card className="lg:text-base">
          <CardHeader>
            <CardTitle className="text-amber-700">Booking Details</CardTitle>
            <CardDescription>
              Review your reservation information
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-between flex-wrap gap-2">
            <div className="grid gap-4">
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                <span>Number of Adults: {numberOfAdults}</span>
              </div>
              <div className="flex items-center">
                <CalendarDays className="mr-2 h-4 w-4" />
                {/* @ts-ignore */}
                <span>Check-in: {formatDate(dateRange.from)}</span>
              </div>
              <div className="flex items-center">
                <CalendarDays className="mr-2 h-4 w-4" />
                {/* @ts-ignore */}
                <span>Check-out: {formatDate(dateRange.to)}</span>
              </div>
              <div className="flex items-center">
                <CalendarDays className="mr-2 h-4 w-4" />
                <span>Total nights: {totalDays}</span>
              </div>
              <div className="flex items-center">
                <Bath className="mr-2 h-4 w-4" />
                <span>Rooms: {numberOfRooms}</span>
              </div>
            </div>
            <div className="lg:w-[50%] flex flex-col gap-2 ">
              <div className="flex items-center">
                <p className="text-base">
                  <span className="font-semibold">Price :</span> ${hotelPrice}{" "}
                  per night
                </p>
              </div>
              <p className="text-base">
                <span className="font-semibold">Discount :</span>{" "}
                {hotelDiscountedPrice} per night
              </p>
              <p className="text-base border lg:w-fit w-full lg:p-2 p-1 font-semibold bg-blue-500 text-white">
                Total Price : ${hotelDiscountedPrice * totalDays}
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Drawer>
              <DrawerTrigger>
                <Button>Confirm Booking</Button>
              </DrawerTrigger>
              <DrawerContent className="flex justify-center items-center flex-col">
                <PaymentPortal
                  nights={totalDays}
                  pricePerNight={hotelDiscountedPrice}
                  // @ts-expect-error
                  dateRange={dateRange}
                  hotelId={hotelId}
                  hotelAddress={hotelAddress}
                />
              </DrawerContent>
            </Drawer>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}

export default BookingSummary;
