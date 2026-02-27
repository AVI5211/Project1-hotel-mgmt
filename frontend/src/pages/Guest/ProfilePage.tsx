import GuestProfile from "../../components/GuestComponents/GuestProfile";
import GuestNavbar from "../../components/GuestComponents/GuestNavbar";

function ProfilePage() {
  return (
    <div className="bg-dark-gray bg-custom-gradient-2 min-h-[100vh]">
      <div className="h-[10vh] flex items-center justify-center">
        <GuestNavbar />
      </div>
      <GuestProfile />
    </div>
  );
}

export default ProfilePage;
