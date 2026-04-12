import React from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";

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
