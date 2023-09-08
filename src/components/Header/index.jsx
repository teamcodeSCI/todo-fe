import React, { useEffect, useRef, useState } from 'react';
import style from './header.module.scss';
import { useOutside } from '@/utils/help';

import UserTag from '../UserTag';
import UserList from '../UserList';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getTopicById } from '@/features/topic/topicApi';
import { useSelector } from 'react-redux';
import { currentTopicSelector, loadedTopicSelector, loadingTopicSelector } from '@/features/topic/topicSlice';

const Header = () => {
  const dispatch = useDispatch();
  const loadingTopic = useSelector(loadingTopicSelector);
  const loadedTopic = useSelector(loadedTopicSelector);
  const detailTopic = useSelector(currentTopicSelector);
  console.log('detailTopic: ', detailTopic);
  const location = useLocation();
  const inputRef = useRef(null);
  const [isOpenUserList, setIsOpenUserList] = useState(false);
  const [title, setTitle] = useState('');
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
      if (loadedTopic && detailTopic.name !== title) {
      }
    }
  });

  useEffect(() => {
    dispatch(getTopicById(location.pathname.split('/')[2]));
  }, [dispatch, location]);
  return (
    <div className={style['header']}>
      <div className={style['title']} onClick={() => setActive(true)} ref={inputRef}>
        {active ? (
          <input type="text" value={title} onChange={handleTitle} />
        ) : (
          <span>{loadedTopic && detailTopic.name}</span>
        )}
      </div>
      {loadedTopic && (
        <div className={style['user']} onClick={handleOpenUserList}>
          {detailTopic.userList.slice(0, 3).map((item) => (
            <UserTag key={item.email} {...item} />
          ))}
          {detailTopic.userList.length > 3 && <div className={style['more']}>{detailTopic.userList.length - 3}+</div>}
        </div>
      )}
      {isOpenUserList && <UserList handleOpenUserList={handleOpenUserList} />}
    </div>
  );
};

export default Header;
