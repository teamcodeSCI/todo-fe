import React, { useRef, useState } from 'react';
import style from './userList.module.scss';
import { userList } from '@/utils/const';
import UserItem from '../UserItem';
import { useOutside } from '@/utils/help';
import AddMember from '../AddMember';

const UserList = ({ handleOpenUserList }) => {
  const userRef = useRef(null);
  const [isAddMember, setIsAddMember] = useState(false);
  const handleAddMember = () => {
    setIsAddMember(!isAddMember);
  };
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
          {isAddMember ? (
            <AddMember />
          ) : (
            <>
              <button className={style['addMember']} onClick={handleAddMember}>
                <i className="icon-user-add"></i>
                Thêm thành viên
              </button>
              {userList.map((item) => (
                <UserItem key={item.id} {...item} />
              ))}
            </>
          )}
        </div>
        {isAddMember && (
          <div className={style['footer']}>
            <button onClick={handleAddMember}>Xong</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
