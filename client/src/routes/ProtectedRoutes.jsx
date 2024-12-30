import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const ProtectedRoutes = () => {
  const { user } = useAppContext();

  return (
    <>
      {user ? <Outlet /> : <Navigate to="/login" />}
    </>
  );
}

export default ProtectedRoutes;