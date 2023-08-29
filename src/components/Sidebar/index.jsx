import React from 'react';
import style from './sidebar.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { menu, table } from '@/utils/const';
import { useSelector } from 'react-redux';
import { currentUserSelector } from '@/features/auth/authSlice';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = useSelector(currentUserSelector);
  const user = currentUser.data.data;
  return (
    <div className={style['sidebar']}>
      <div className={style['img']}>
        <img width={224} height={222} src={`${process.env.PUBLIC_URL}/assets/images/logo.png`} alt="" />
        <span>SCI Work</span>
      </div>
      <div className={style['main']}>
        {menu.map((item) => (
          <div
            key={item.link}
            className={location.pathname === item.link ? style['menu'] + ' ' + style['active'] : style['menu']}
          >
            <Link to={item.link}>
              {item.icon} {item.title}
            </Link>
          </div>
        ))}
        <div className={style['title']}>Không gian làm việc</div>
        <ul>
          {table.map((item) => (
            <li className={location.pathname === `/table/${item.id}` ? style['active'] : ''} key={item.id}>
              <Link to={`/table/${item.id}`}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={style['bottom']}>
        <div className={style['info']}>
          <div className={style['avatar']}>{user.last_name.split('')[0]}</div>
          <div className={style['content']}>
            <p>{user.first_name + ' ' + user.last_name}</p>
            <span>{user.position.name}</span>
          </div>
        </div>
        <div
          className={style['logout']}
          onClick={() => {
            localStorage.clear();
            navigate('/auth');
          }}
        >
          Đăng xuất
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
