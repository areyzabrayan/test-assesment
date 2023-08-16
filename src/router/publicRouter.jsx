import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "./router";

const PublicRouter = () => {
  const { isLogin } = useContext(AppContext);
  return <div>{isLogin ? <Navigate to={"/private"} /> : <Outlet />}</div>;
};

export default PublicRouter;

