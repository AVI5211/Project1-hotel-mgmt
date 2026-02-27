import ConversationNavbar from "../../components/Conversations/ConversationNavbar";
import GuestChatbox from "../../components/Conversations/GuestChatbox";
import GuestFooter from "../../components/GuestComponents/GuestFooter";
import GuestNavbar from "../../components/GuestComponents/GuestNavbar";

function Conversation() {
  return (
    <div>
      <div className="flex justify-center items-center flex-col font-Roboto">
        <GuestNavbar />
        <ConversationNavbar />
        <GuestChatbox />
        <GuestFooter />
      </div>
    </div>
  );
}

export default Conversation;
