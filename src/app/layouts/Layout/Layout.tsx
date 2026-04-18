import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../Header/Header";

interface Props {}

const Layout: React.FC<Props> = ({}) => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
