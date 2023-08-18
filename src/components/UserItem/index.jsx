import React, { useState } from 'react';
import style from './userItem.module.scss';
import NoticeModal from '../NoticeModal';

const UserItem = (props) => {
  const [isDel, setIsDel] = useState(false);
  const handleSetDel = () => {
    setIsDel(!isDel);
  };
  let role = '';
  switch (props.role) {
    case 'Admin':
      role = 'Quản trị viên';
      break;
    case 'Member':
      role = 'Thành viên';
      break;
    default:
      break;
  }
  return (
    <div className={style['userItem']}>
      <div className={style['text']}>
        <p>{props.firstName + ' ' + props.lastName}</p>
        <span>{role}</span>
      </div>
      <div className={style['role']}>
        <button onClick={handleSetDel}>Xóa</button>
      </div>
      {isDel && <NoticeModal handleSetDel={handleSetDel} />}
    </div>
  );
};

export default UserItem;
