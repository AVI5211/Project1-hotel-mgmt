import { FcAssistant } from "react-icons/fc";
import { MdOutlineRoomService } from "react-icons/md";
function ConversationNavbar() {
  return (
    <div className="w-[55vw] flex justify-end font-Roboto  text-white  font-semibold">
      <div className="flex gap-3">
        <p className="flex gap-5 items-center  border rounded-md  p-2 cursor-pointer bg-slate-400 bg-opacity-95  hover:bg-opacity-45">
          <span>
            <FcAssistant />
          </span>{" "}
          Customer Care
        </p>
        <p className="flex gap-5 items-center  border rounded-md  p-2 cursor-pointer bg-slate-400 bg-opacity-95  hover:bg-opacity-45">
          <span>
            <MdOutlineRoomService />
          </span>{" "}
          Room Service
        </p>
      </div>
    </div>
  );
}

export default ConversationNavbar;
