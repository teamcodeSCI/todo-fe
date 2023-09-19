import React, { useState } from 'react';
import style from './userItem.module.scss';
import NoticeModal from '../NoticeModal';

const UserItem = (props) => {
  const [isDel, setIsDel] = useState(false);
  const handleSetDel = () => {
    setIsDel(!isDel);
  };
  return (
    <div className={style['userItem']}>
      <div className={style['text']}>
        <p>{props.first_name + ' ' + props.last_name}</p>
        <span>{props.id === props.ownerId ? 'Chủ sở hữu' : 'Thành viên'}</span>
      </div>
      <div className={style['role']}>{props.id !== props.ownerId && <button onClick={handleSetDel}>Xóa</button>}</div>
      {isDel && <NoticeModal message={'Bạn có chắc muốn xóa không ?'} handleSetDel={handleSetDel} />}
    </div>
  );
};

export default UserItem;
