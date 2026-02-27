import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";

function DealCard({ hotelImage }: any) {
  return (
    <div className="max-w-96 font-serif">
      <Card>
        <CardHeader>
          <div className="max-w-full">
            <img src={hotelImage} alt="Hotel" className="max-h-28 w-full" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between max-w-md items-center ">
            <div className="left">
              <div className="address-container">
                <h1 className="font-bold text-xl">Hotel something</h1>
                <h2>Address something</h2>
              </div>
              <div className="ratings flex gap-2 items-center">
                <p className="px-2 border bg-green-400 text-white">4/5</p>
                <p>1234 ratings</p>
              </div>
            </div>
            <div className="right">
              <div className="prices">
                <p>
                  <del>$2379</del>
                </p>
                <p className="font-bold">$1200</p>
                <p>
                  <span className="font-semibold text-gray-500">1 Room</span>{" "}
                  per night
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default DealCard;
