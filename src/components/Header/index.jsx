import React, { useEffect, useRef, useState } from 'react';
import style from './header.module.scss';
import { useOutside } from '@/utils/help';
import { userList } from '@/utils/const';
import UserTag from '../UserTag';
import UserList from '../UserList';
import {
  currentTopicSelector,
  currentTopicLoadedSelector,
  currentTopicLoadingSelector,
} from '@/features/topic/topicByIdSlice';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getTopicById, updateTopic } from '@/features/topic/topicApi';
import { updatedTopicSelector } from '@/features/topic/topicSlice';
import Loading from '../Loading';

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const id = location.pathname.split('/')[location.pathname.split('/').length - 1];
  const loadingTopic = useSelector(currentTopicLoadingSelector);
  const loadedTopic = useSelector(currentTopicLoadedSelector);
  const currentTopic = useSelector(currentTopicSelector);
  const updatedTopic = useSelector(updatedTopicSelector);
  console.log('current: ', currentTopic);

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
      if (loadedTopic && title !== currentTopic.name) {
        dispatch(updateTopic({ id, name: title }));
      }
    }
  });
  useEffect(() => {
    dispatch(getTopicById(id));
    if (updatedTopic) {
      window.location.reload();
    }
  }, [dispatch, id, updatedTopic]);
  return (
    <div className={style['header']}>
      {loadingTopic ? (
        <Loading />
      ) : (
        <>
          {loadedTopic && (
            <div className={style['title']} onClick={() => setActive(true)} ref={inputRef}>
              {active ? <input type="text" value={title} onChange={handleTitle} /> : <span>{currentTopic.name}</span>}
            </div>
          )}

          <div className={style['user']} onClick={handleOpenUserList}>
            {loadedTopic && currentTopic.userList.slice(0, 3).map((item) => <UserTag key={item.email} {...item} />)}
            <div className={style['more']}>{userList.length - 3}+</div>
          </div>
          {isOpenUserList && <UserList handleOpenUserList={handleOpenUserList} />}
        </>
      )}
    </div>
  );
};

export default Header;
