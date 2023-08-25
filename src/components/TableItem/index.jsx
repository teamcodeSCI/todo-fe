import React, { useRef, useState } from 'react';
import style from './tableItem.module.scss';
import { Link } from 'react-router-dom';
import { useOutside } from '@/utils/help';
import NoticeModal from '../NoticeModal';

const TableItem = (props) => {
  const [isDrop, setIsDrop] = useState(false);
  const [isDel, setIsDel] = useState(false);
  const dropRef = useRef(null);
  const handleIsDrop = () => {
    setIsDrop(!isDrop);
  };
  const handleIsDel = () => {
    setIsDel(!isDel);
  };
  useOutside(dropRef, () => setIsDrop(false));
  return (
    <>
      <div className={style['item']}>
        <Link to={`/table/${props.id}`}>{props.name}</Link>
        <span className={style['author']}>Đức Đoàn</span>
        <span className={style['createdDate']}>24/08/2023</span>
        <button onClick={handleIsDrop}>●●●</button>
        {isDrop && (
          <ul ref={dropRef}>
            <li onClick={handleIsDel}>Xóa</li>
          </ul>
        )}
      </div>
      {isDel && <NoticeModal handleSetDel={handleIsDel} />}
    </>
  );
};

export default TableItem;
