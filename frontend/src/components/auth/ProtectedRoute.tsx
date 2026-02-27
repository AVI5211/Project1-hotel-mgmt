import { useRecoilValue } from "recoil";
import { Navigate } from "react-router-dom";
import { authState } from "../../store/atom"; // Adjust the path

const ProtectedRoute = ({ children }: any) => {
  const auth = useRecoilValue(authState);

  return auth.isAuthenticated ? children : <Navigate to="/signup" />;
};

export default ProtectedRoute;
