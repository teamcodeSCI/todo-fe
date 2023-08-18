import React from 'react';
import style from './sidebar.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { table } from '@/utils/const';

const Sidebar = () => {
  const location = useLocation();
  console.log('location: ', location);
  return (
    <div className={style['sidebar']}>
      <div className={style['img']}>
        <img width={224} height={222} src={`${process.env.PUBLIC_URL}/assets/images/logo.png`} alt="" />
        <span>SCI Work</span>
      </div>
      <div className={style['main']}>
        <div className={location.pathname === `/` ? style['menu'] + ' ' + style['active'] : style['menu']}>
          <Link to="/">
            <i className="icon-th-large"></i> Bảng
          </Link>
        </div>
        <div className={style['title']}>
          Không gian làm việc
          <button>
            <i className="icon-plus-1"></i>
          </button>
        </div>
        <ul>
          {table.map((item) => (
            <li className={location.pathname === `/table/${item.id}` ? style['active'] : ''} key={item.id}>
              <Link to={`/table/${item.id}`}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
