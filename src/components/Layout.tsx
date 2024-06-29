import { FC, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout: FC = ({ onSort }) =>{
  const [sortType, setSortType] = useState('new');

  return (
    <>
      <Header onSort={onSort}/>
      <main className="main">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;