import React from 'react';
import style from './home.module.scss';

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <div className={style['home']}>
      <Sidebar />
      <main>
        <Header />
        <div className={style['main']}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Home;
