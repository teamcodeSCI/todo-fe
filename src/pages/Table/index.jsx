import React, { useState } from 'react';
import style from './table.module.scss';
import { table } from '@/utils/const';
import TableItem from '@/components/TableItem';

const Table = () => {
  const [isAdd, setIsAdd] = useState(false);
  const [info, setInfo] = useState({ title: '' });
  const handleInfo = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  const handleAdd = () => {
    setIsAdd(!isAdd);
  };
  return (
    <div className={style['container']}>
      <div className={style['title']}>Danh sách bảng</div>
      <div className={style['table']}>
        {table.map((item) => (
          <TableItem key={item.id} {...item} />
        ))}
        {isAdd ? (
          <div className={style['addItem']}>
            <input
              type="text"
              name="title"
              value={info.title}
              onChange={handleInfo}
              placeholder="Nhập tiêu đề bảng ..."
            />
            <div className={style['addControl']}>
              <button className={style['submit']}>Thêm bảng</button>
              <button className={style['cancel']} onClick={handleAdd}>
                <i className="icon-cancel-2"></i>
              </button>
            </div>
          </div>
        ) : (
          <div className={style['addBtn']} onClick={handleAdd}>
            <i className="icon-plus-1"></i> Thêm mới
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
