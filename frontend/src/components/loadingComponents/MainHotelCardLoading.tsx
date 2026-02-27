import { Skeleton } from "../ui/skeleton";

export default function MainHotelCardLoading() {
  return (
    <div className="flex flex-col sm:flex-row border rounded-lg w-full sm:w-fit overflow-hidden">
      <div className="w-full sm:w-72">
        <Skeleton className="w-full h-48 sm:h-full bg-slate-200" />
      </div>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 p-4 bg-slate-400">
        <div className="flex flex-col justify-between flex-grow ">
          <div className="nameAndFeatures">
            <Skeleton className="h-6 w-3/4 mb-1 bg-white" />
            <Skeleton className="h-4 w-2/3 mb-2 bg-white" />
            <div className="flex flex-wrap gap-2 w-[200px] mb-3 ">
              {[1, 2, 3].map((_, index) => (
                <Skeleton key={index} className="h-6 w-16 rounded" />
              ))}
            </div>
          </div>
          <div className="refundAndRatings">
            <Skeleton className="h-4 w-24 mb-1 bg-white" />
            <div className="flex">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <Skeleton key={index} className="h-4 w-4 mr-1" />
              ))}
            </div>
          </div>
        </div>
        <div className="price flex flex-row sm:flex-col justify-between sm:justify-end items-end">
          <Skeleton className="h-4 w-16 mb-1 bg-white" />
          <Skeleton className="h-6 w-20 bg-white" />
        </div>
      </div>
    </div>
  );
}
