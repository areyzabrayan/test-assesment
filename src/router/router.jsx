import React, { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/login/login";
import { ProjectManager } from "../components/projectManager/projectManager"
import PublicRouter from "./publicRouter";
import PrivateRouter from "./privateRouter";
import Home from "../pages/home/Home"

  
export const AppContext = createContext({});
const Router = () => {
   const [isLogin, setIsLogin] = useState(false);
  return (
    <AppContext.Provider value={{setIsLogin, isLogin}}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route element={<PublicRouter />}>
              <Route element={<Login />} />
               <Route path="home" element={<Login />} />
            </Route>
            <Route element={<PrivateRouter />}>
              <Route index element={<ProjectManager />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default Router;