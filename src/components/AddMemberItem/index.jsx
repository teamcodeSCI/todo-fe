import React from 'react';
import style from './addMemberItem.module.scss';
import { useSelector } from 'react-redux';
import { currentTopicSelector } from '@/features/topic/topicByIdSlice';
import { useDispatch } from 'react-redux';
import { addUser } from '@/features/userList/userListApi';
import { loadingUserListSelector, userListSelector } from '@/features/userList/userListSlice';
import Loading from '../Loading';

const AddMemberItem = (props) => {
  const dispatch = useDispatch();
  const currentTopic = useSelector(currentTopicSelector);
  const loadingUserList = useSelector(loadingUserListSelector);
  const userList = useSelector(userListSelector);
  const findUser = userList.find((item) => item.id === props.id);
  const handleAddMember = () => {
    dispatch(addUser({ topicId: currentTopic.id, userId: props.id }));
  };
  return (
    <div className={style['addMemberItem']}>
      <div className={style['text']}>
        <p>
          {props.first_name + ' ' + props.last_name} <span>{` (${props.position_name})`}</span>
        </p>
        <span>{props.email}</span>
      </div>
      {findUser ? <i style={{ fontSize: '14px' }}>Đã tham gia</i> : <button onClick={handleAddMember}>Thêm</button>}
      {loadingUserList && <Loading />}
    </div>
  );
};

export default AddMemberItem;
