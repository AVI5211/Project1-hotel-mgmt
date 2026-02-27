const GuestChatbox = () => {
  return (
    <div className="flex justify-center items-center w-[55vw] h-[70vh] ">
      <div className="w-[55vw] md:w-3/4 lg:w-1/2 h-fit">
        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="flex flex-col space-y-4">
            <p className="text-slate-400">Customer Care</p>
            <div className="flex flex-col gap-1 h-80 bg-gray-50 p-4 rounded-lg overflow-y-auto ">
              <div className="flex justify-start">
                <div className="bg-red-700 bg-opacity-75 text-white p-2 rounded-lg max-w-xs">
                  Hello! Sir how can we help you?
                </div>
              </div>
              <div className="flex justify-end ">
                <div className="bg-green-500 bg-opacity-75 text-white p-2 rounded-lg max-w-xs">
                  Hey why is my payment status not being shown ?
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-grow p-2 border border-gray-300 rounded-lg"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestChatbox;
