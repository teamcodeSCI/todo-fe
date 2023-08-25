import React from 'react';
import style from './home.module.scss';

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Outlet, useLocation } from 'react-router-dom';

const Home = () => {
  const location = useLocation();

  return (
    <div className={style['home']}>
      <Sidebar />
      <main>
        {location.pathname.split('/')[1] === 'table' && <Header />}
        <div className={style['main']}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Home;
