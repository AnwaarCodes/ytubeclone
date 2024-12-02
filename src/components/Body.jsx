import React from 'react';
import Sidebar from './Sidebar';
import Feed from './Feed';
import {Outlet} from 'react-router-dom';
import Watch from './Watch';
import { useLocation } from 'react-router-dom';
 

const Body = () => {
  const location = useLocation();
  const isWatchPage = location.pathname.includes('/watch');
  return (
    <div className="flex mt-16 text-white bg-black">
      {!isWatchPage && <Sidebar />}
      <Outlet />
    </div>
  );
};

export default Body