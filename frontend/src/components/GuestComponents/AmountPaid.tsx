function AmountPaid() {
  return (
    <div>
      <div className="balance flex flex-col gap-3 mt-5 border p-2 bg-white">
        <p className="font-semibold"> Balance :</p>
        <div className="pl-3 font-medium">
          <p className="text-red-500">
            Total Amount : <span>25000</span>
          </p>
          <p className="text-blue-500">
            Amount Paid : <span>13000</span>
          </p>
          <p className="text-slate-500">
            Remaining Amount : <span>12000</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AmountPaid;
