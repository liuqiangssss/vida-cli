import Home from "@/pages/home";
import { Navigate, RouteObject, useRoutes } from "react-router-dom";

const routeConfig: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
];
const Routes = () => useRoutes(routeConfig);
export default Routes;
