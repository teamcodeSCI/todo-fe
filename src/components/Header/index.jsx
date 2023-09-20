import React, { useEffect, useState } from 'react';
import style from './header.module.scss';
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
import { getUserByTopicId } from '@/features/userList/userListApi';
import { loadedUserListSelector, userListSelector } from '@/features/userList/userListSlice';

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const userList = useSelector(userListSelector);
  const loadedUserList = useSelector(loadedUserListSelector);
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
    dispatch(getUserByTopicId(id));
  }, [dispatch, id]);
  return (
    <div className={style['header']}>
      {loadingTopic ? (
        <Loading />
      ) : (
        <>
          {loadedTopic && <UpdateTopicInput id={id} name={currentTopic.name} />}

          <div className={style['user']} onClick={handleOpenUserList}>
            {loadedUserList && userList.slice(0, 3).map((item) => <UserTag key={item.email} {...item} />)}
            {loadedUserList && userList.length > 3 && <div className={style['more']}>{userList.length - 3}+</div>}
          </div>
          {isOpenUserList && loadedTopic && (
            <UserList userList={userList} ownerId={currentTopic.user_id} handleOpenUserList={handleOpenUserList} />
          )}
        </>
      )}
    </div>
  );
};

export default Header;
