import React from 'react';
import style from './home.module.scss';
import Jobs from '@/components/Jobs';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

const Home = () => {
  return (
    <div className={style['home']}>
      <Sidebar />
      <main>
        <Header />
        <div className={style['main']}>
          <Jobs />
        </div>
      </main>
    </div>
  );
};

export default Home;
