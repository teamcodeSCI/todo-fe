import React, { useState } from 'react';
import style from './addMember.module.scss';
import AddMemberItem from '../AddMemberItem';
import { userList } from '@/utils/const';

const AddMember = () => {
  const [search, setSearch] = useState('');
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className={style['addMember']}>
      <div className={style['search']}>
        <input type="text" value={search} onChange={handleSearch} placeholder="Tìm kiếm ..." />
        <button>
          <i className=" icon-search-2"></i>
        </button>
      </div>
      <div className={style['title']}>Danh sách người dùng</div>
      <div className={style['content']}>
        {userList.map((item) => (
          <AddMemberItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default AddMember;
