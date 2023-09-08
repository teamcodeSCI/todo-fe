import React, { useRef, useState } from 'react';
import style from './header.module.scss';
import { useOutside } from '@/utils/help';
import { userList } from '@/utils/const';
import UserTag from '../UserTag';
import UserList from '../UserList';

const Header = () => {
  const text = 'Bảng 1';
  const inputRef = useRef(null);
  const [isOpenUserList, setIsOpenUserList] = useState(false);
  const [title, setTitle] = useState(text);
  const [active, setActive] = useState(false);
  const handleOpenUserList = () => {
    setIsOpenUserList(!isOpenUserList);
  };
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  useOutside(inputRef, () => {
    setActive(false);
    if (active) {
      if (text !== title) {
      }
    }
  });

  return (
    <div className={style['header']}>
      <div className={style['title']} onClick={() => setActive(true)} ref={inputRef}>
        {active ? <input type="text" value={title} onChange={handleTitle} /> : <span>{title}</span>}
      </div>
      <div className={style['user']} onClick={handleOpenUserList}>
        {userList.slice(0, 3).map((item) => (
          <UserTag key={item.email} {...item} />
        ))}
        <div className={style['more']}>{userList.length - 3}+</div>
      </div>
      {isOpenUserList && <UserList handleOpenUserList={handleOpenUserList} />}
    </div>
  );
};

export default Header;
