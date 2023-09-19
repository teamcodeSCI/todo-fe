import React, { useEffect, useState } from 'react';
import style from './header.module.scss';
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
import { getTopicById } from '@/features/topic/topicApi';
import Loading from '../Loading';
import UpdateTopicInput from '../UpdateTopicInput';

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const id = location.pathname.split('/')[location.pathname.split('/').length - 1];
  const loadingTopic = useSelector(currentTopicLoadingSelector);
  const loadedTopic = useSelector(currentTopicLoadedSelector);
  const currentTopic = useSelector(currentTopicSelector);

  const [isOpenUserList, setIsOpenUserList] = useState(false);

  const handleOpenUserList = () => {
    setIsOpenUserList(!isOpenUserList);
  };

  useEffect(() => {
    dispatch(getTopicById(id));
  }, [dispatch, id]);
  return (
    <div className={style['header']}>
      {loadingTopic ? (
        <Loading />
      ) : (
        <>
          {loadedTopic && <UpdateTopicInput id={id} name={currentTopic.name} />}

          <div className={style['user']} onClick={handleOpenUserList}>
            {loadedTopic && currentTopic.userList.slice(0, 3).map((item) => <UserTag key={item.email} {...item} />)}
            {loadedTopic && currentTopic.length >= 3 && <div className={style['more']}>{userList.length - 3}+</div>}
          </div>
          {isOpenUserList && <UserList handleOpenUserList={handleOpenUserList} />}
        </>
      )}
    </div>
  );
};

export default Header;
