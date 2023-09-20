import React, { useState } from 'react';
import style from './userItem.module.scss';
import NoticeModal from '../NoticeModal';
import { useDispatch } from 'react-redux';
import { delUser } from '@/features/userList/userListApi';
import { useSelector } from 'react-redux';
import { currentTopicSelector } from '@/features/topic/topicByIdSlice';
import { loadingUserListSelector } from '@/features/userList/userListSlice';
import Loading from '../Loading';
import { currentUserSelector } from '@/features/auth/authSlice';

const UserItem = (props) => {
  const currentUser = useSelector(currentUserSelector);
  const currentTopic = useSelector(currentTopicSelector);
  const loadingUserList = useSelector(loadingUserListSelector);
  const dispatch = useDispatch();
  const [isDel, setIsDel] = useState(false);
  const handleSetDel = () => {
    setIsDel(!isDel);
  };
  const handleDelUser = () => {
    dispatch(delUser({ topicId: currentTopic.id, userId: props.id }));
  };
  return (
    <div className={style['userItem']}>
      <div className={style['text']}>
        <p>
          {props.first_name + ' ' + props.last_name} {props.id === props.ownerId && <span>(Chủ sở hữu)</span>}
        </p>
        <span>{props.email}</span>
      </div>
      <div className={style['role']}>
        {currentUser.data.data.id === props.ownerId && props.id !== props.ownerId && (
          <button onClick={handleSetDel}>Xóa</button>
        )}
      </div>
      {isDel && (
        <NoticeModal message={'Bạn có chắc muốn xóa không ?'} handleSetDel={handleSetDel} action={handleDelUser} />
      )}
      {loadingUserList && <Loading />}
    </div>
  );
};

export default UserItem;
