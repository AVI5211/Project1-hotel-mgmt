import React, { useState } from "react";
import { Input } from "../ui/input";
import { CalendarIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { MdOutlineKingBed, MdPerson } from "react-icons/md";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { format, addDays } from "date-fns";
import { cn } from "../../lib/utils";
import { DateRange } from "react-day-picker";

interface BookingFormProps {
  initialLocation?: string;
  initialDateRange?: DateRange;
  initialGuests?: { adults: number; rooms: number };
  onSubmit?: (data: {
    location: string;
    date: DateRange | undefined;
    guests: { adults: number; rooms: number };
  }) => void;
}

function BookingForm({
  initialLocation = "",
  initialDateRange = {
    from: new Date(),
    to: addDays(new Date(), 7),
  },
  initialGuests = { adults: 1, rooms: 1 },
  onSubmit = (data: {
    location: string;
    date: DateRange | undefined;
    guests: { adults: number; rooms: number };
  }) => {
    console.log("Form submitted", data);
  },
}: BookingFormProps) {
  const [location, setLocation] = useState(initialLocation);
  const [date, setDate] = useState<DateRange | undefined>(initialDateRange);
  const [guests, setGuests] = useState(initialGuests);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ location, date, guests });
  };

  return (
    <>
      <div className="max-w-7xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        <div>
          <p className="lg:text-xl text-base font-bold p-2 font-sans">
            Search Hotels
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <MdOutlineKingBed
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size="1.5em"
                />
                <Input
                  type="text"
                  placeholder="Where are you going?"
                  className="pl-10 pr-4 py-2 w-full border-2 border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            <div className="flex-1">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "LLL dd, y")} -{" "}
                          {format(date.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                    disabled={(date: any) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex-1">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <MdPerson className="mr-2 h-4 w-4" />
                    {guests.adults} {guests.adults === 1 ? "Guest" : "Guests"},{" "}
                    {guests.rooms} {guests.rooms === 1 ? "Room" : "Rooms"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4" align="start">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Adults</span>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            setGuests((prev) => ({
                              ...prev,
                              adults: Math.max(1, prev.adults - 1),
                            }))
                          }
                        >
                          -
                        </Button>
                        <span>{guests.adults}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            setGuests((prev) => ({
                              ...prev,
                              adults: prev.adults + 1,
                            }))
                          }
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Rooms</span>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            setGuests((prev) => ({
                              ...prev,
                              rooms: Math.max(1, prev.rooms - 1),
                            }))
                          }
                        >
                          -
                        </Button>
                        <span>{guests.rooms}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            setGuests((prev) => ({
                              ...prev,
                              rooms: prev.rooms + 1,
                            }))
                          }
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            <MagnifyingGlassIcon className="mr-2 h-4 w-4" />
            Search
          </Button>
        </form>
      </div>
    </>
  );
}

export default BookingForm;
