import React from 'react';
import style from './sidebar.module.scss';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className={style['sidebar']}>
      <div className={style['img']}>
        <img width={224} height={222} src={`${process.env.PUBLIC_URL}/assets/images/logo.png`} alt="" />
        <span>SCI Work</span>
      </div>
      <div className={style['title']}>
        Không gian làm việc
        <button>
          <i className="icon-plus-1"></i>
        </button>
      </div>
      <ul>
        <li className={style['active']}>
          <Link>Bảng 1</Link>
        </li>
        <li>
          <Link>Bảng 2</Link>
        </li>
        <li>
          <Link>Bảng 3</Link>
        </li>
        <li>
          <Link>Bảng 4</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
