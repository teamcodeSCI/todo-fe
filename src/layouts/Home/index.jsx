import React from 'react';
import style from './home.module.scss';
import Jobs from '@/components/Jobs';

const Home = () => {
  return (
    <div className={style['home']}>
      <header>
        <h1>Job Board Draggble</h1>
      </header>
      <main style={{ padding: '20px' }}>
        <Jobs />
      </main>
    </div>
  );
};

export default Home;
