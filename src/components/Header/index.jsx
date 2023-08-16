import React, { useRef, useState } from 'react';
import style from './header.module.scss';
import { useOutside } from '@/utils/help';
import { userList } from '@/utils/const';
import UserTag from '../UserTag';

const Header = () => {
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
    <div className={style['header']}>
      <div className={style['title']} onClick={() => setActive(true)} ref={inputRef}>
        {active ? <input type="text" value={title} onChange={handleTitle} /> : <span>Bảng 1</span>}
      </div>
      <div className={style['user']}>
        {userList.slice(0, 3).map((item) => (
          <UserTag key={item.email} {...item} />
        ))}
        <div className={style['more']}>{userList.length - 3}+</div>
      </div>
    </div>
  );
};

export default Header;
