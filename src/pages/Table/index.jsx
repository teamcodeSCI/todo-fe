import React from 'react';
import style from './table.module.scss';
import { table } from '@/utils/const';

import TableItem from '@/components/TableItem';

const Table = () => {
  return (
    <div className={style['table']}>
      {table.map((item) => (
        <TableItem key={item.id} {...item} />
      ))}
      <div className={style['addBtn']}>
        <i className="icon-plus-1"></i> Thêm mới
      </div>
    </div>
  );
};

export default Table;
