import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "./router";

const PrivateRouter = () => {
  const { isLogin } = useContext(AppContext);
  return <div>{isLogin ? <Outlet /> : <Navigate to={"/home"} />}</div>;
};

export default PrivateRouter;

