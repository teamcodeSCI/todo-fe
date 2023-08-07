import React from 'react';
import style from './auth.module.scss';
import { Outlet, useLocation } from 'react-router-dom';

const Auth = () => {
  const location = useLocation();
  let title = '';
  switch (location.pathname) {
    case '/auth/login':
      title = 'Đăng nhập';
      break;
    case '/auth/register':
      title = 'Đăng ký';
      break;
    case '/auth/forgot-password':
      title = 'Quên mật khẩu';
      break;
    default:
      break;
  }
  return (
    <div className={style['auth']}>
      <div className={style['img']}>
        <img width={224} height={222} src={`${process.env.PUBLIC_URL}/assets/images/logo.png`} alt="" />
        <span>SCI Work</span>
      </div>
      <div className={style['title']}>{title}</div>
      <Outlet />
    </div>
  );
};

export default Auth;
