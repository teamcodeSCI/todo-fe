import React, { useRef, useState } from 'react';
import style from './tableItem.module.scss';
import { Link } from 'react-router-dom';
import { formatDate, useOutside } from '@/utils/help';
import NoticeModal from '../NoticeModal';
import { useDispatch } from 'react-redux';
import { deleteTopic } from '@/features/topic/topicApi';

const TableItem = (props) => {
  const dispatch = useDispatch();
  const [isDrop, setIsDrop] = useState(false);
  const [isDel, setIsDel] = useState(false);
  const dropRef = useRef(null);
  const handleIsDrop = () => {
    setIsDrop(!isDrop);
  };
  const handleIsDel = () => {
    setIsDel(!isDel);
  };
  const deleteItem = () => {
    dispatch(deleteTopic([props.id]));
    handleIsDel();
  };
  useOutside(dropRef, () => setIsDrop(false));
  return (
    <>
      <div className={style['item']}>
        <Link to={`/table/${props.id}`}>{props.name}</Link>
        <span className={style['author']}>{props.owner.first_name + ' ' + props.owner.last_name}</span>
        <span className={style['createdDate']}>{formatDate(props.created_at)}</span>
        <button onClick={handleIsDrop}>●●●</button>
        {isDrop && (
          <ul ref={dropRef}>
            <li onClick={handleIsDel}>Xóa</li>
          </ul>
        )}
      </div>
      {isDel && <NoticeModal message={'Bạn có chắc muốn xóa không?'} handleSetDel={handleIsDel} action={deleteItem} />}
    </>
  );
};

export default TableItem;
