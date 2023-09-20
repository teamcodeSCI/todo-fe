import React, { useEffect, useState } from 'react';
import style from './addMember.module.scss';
import AddMemberItem from '../AddMemberItem';

import { useDispatch } from 'react-redux';
import { getAllUser } from '@/features/userList/userListApi';
import { useSelector } from 'react-redux';

import Loading from '../Loading';
import {
  loadedUserSuggestSelector,
  loadingUserSuggestSelector,
  userSuggestSelector,
} from '@/features/userList/userSuggestSlice';

const AddMember = () => {
  const dispatch = useDispatch();
  const userSuggest = useSelector(userSuggestSelector);
  const loadedUserSuggest = useSelector(loadedUserSuggestSelector);
  const loadingUserSuggest = useSelector(loadingUserSuggestSelector);

  const [search, setSearch] = useState('');
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    dispatch(getAllUser(''));
  }, [dispatch]);
  return (
    <div className={style['addMember']}>
      {loadingUserSuggest && <Loading />}
      <div className={style['search']}>
        <input type="text" value={search} onChange={handleSearch} placeholder="Tìm kiếm ..." />
        <button>
          <i className=" icon-search-2"></i>
        </button>
      </div>
      <div className={style['title']}>Danh sách người dùng</div>
      <div className={style['content']}>
        {loadedUserSuggest && userSuggest.map((item) => <AddMemberItem key={item.id} {...item} />)}
      </div>
    </div>
  );
};

export default AddMember;
