import React, { useRef } from 'react';
import style from './userList.module.scss';
import { userList } from '@/utils/const';
import UserItem from '../UserItem';
import { useOutside } from '@/utils/help';

const UserList = ({ handleOpenUserList }) => {
  const userRef = useRef(null);
  useOutside(userRef, handleOpenUserList);
  return (
    <div className={style['userList']}>
      <div ref={userRef} className={style['box']}>
        <div className={style['title']}>
          <span>Thành viên</span>
          <div className={style['close']} onClick={handleOpenUserList}>
            <i className="icon-cancel-2"></i>
          </div>
        </div>
        <div className={style['content']}>
          {userList.map((item) => (
            <UserItem {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;
