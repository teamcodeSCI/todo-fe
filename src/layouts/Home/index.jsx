import React, { useRef, useState } from 'react';
import style from './home.module.scss';
import Jobs from '@/components/Jobs';
import Sidebar from '@/components/Sidebar';
import { useOutside } from '@/utils/help';

const Home = () => {
  const inputRef = useRef(null);
  const [title, setTitle] = useState('Bảng 1');
  const [active, setActive] = useState(false);

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  useOutside(inputRef, () => {
    setActive(false);
    if (active) console.log('hello');
  });
  return (
    <div className={style['home']}>
      <Sidebar />
      <main>
        <div className={style['header']}>
          <div className={style['title']} onClick={() => setActive(true)} ref={inputRef}>
            {active ? <input type="text" value={title} onChange={handleTitle} /> : <span>Bảng 1</span>}
          </div>
        </div>
        <div className={style['main']}>
          <Jobs />
        </div>
      </main>
    </div>
  );
};

export default Home;
