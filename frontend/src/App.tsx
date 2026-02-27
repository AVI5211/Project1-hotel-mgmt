import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainGuestPage from "./pages/Guest/MainGuestPage";
import Bookings from "./pages/Guest/Bookings";
import SignupForm from "./components/auth/SignupForm";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import SigninForm from "./components/auth/SigninForm";
import HotelSearch from "./pages/Guest/HotelSearch";
import HotelBookingPage from "./pages/Guest/HotelBookingPage";
import ProfilePage from "./pages/Guest/ProfilePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/signin" element={<SigninForm />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainGuestPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/hotelSearch"
          element={
            <ProtectedRoute>
              <HotelSearch />
            </ProtectedRoute>
          }
        />

        <Route path="/hotelBook" element={<HotelBookingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
