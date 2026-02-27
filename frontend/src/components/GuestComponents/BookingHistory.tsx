import { useState } from "react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Booking {
  id: number;
  date: string;
  checkoutDate: string;
  status: string;
  location: string;
  guestId: number;
  hotelId: number;
  cost: number | null;
}

interface BookingHistoryProps {
  bookings?: Booking[];
}

export default function BookingHistory({ bookings = [] }: BookingHistoryProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 5;
  const totalPages = Math.max(1, Math.ceil(bookings.length / bookingsPerPage));

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM dd, yyyy");
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "verified":
        return "bg-green-500 hover:bg-green-600";
      case "notverified":
        return "bg-yellow-500 hover:bg-yellow-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  if (bookings.length === 0) {
    return (
      <Card className="w-full max-w-4xl mx-auto mt-10">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Booking History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-gray-600 text-center">
            No bookings found.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <Card className="w-full max-w-4xl mx-auto mt-10">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-amber-800">
            Booking History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] font-semibold">
                    Booking ID
                  </TableHead>
                  <TableHead className="font-semibold">Check-in Date</TableHead>
                  <TableHead className="font-semibold">
                    Check-out Date
                  </TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Location</TableHead>
                  <TableHead className="text-right font-semibold">
                    Cost
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentBookings.map((booking) => (
                  <TableRow
                    key={booking.id}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <TableCell className="font-medium">{booking.id}</TableCell>
                    <TableCell>{formatDate(booking.date)}</TableCell>
                    <TableCell>{formatDate(booking.checkoutDate)}</TableCell>
                    <TableCell>
                      <Badge
                        className={`${getStatusColor(
                          booking.status
                        )} transition-colors`}
                      >
                        {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{booking.location}</TableCell>
                    <TableCell className="text-right">
                      {booking.cost ? `$${booking.cost.toFixed(2)}` : "N/A"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous page</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next page</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
