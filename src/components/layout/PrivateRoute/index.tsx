import { useCookies } from "react-cookie";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const [cookies] = useCookies(["user"]);
  return cookies?.user?.access_token ? <Outlet /> : <Navigate to={"/"} />;
};

export default PrivateRoute;
