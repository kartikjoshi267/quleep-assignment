import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const DeProtectRoutes = () => {
  const { user } = useAppContext();

  return (
    <>
      {user ? <Navigate to="/" /> : <Outlet />}
    </>
  );
}

export default DeProtectRoutes