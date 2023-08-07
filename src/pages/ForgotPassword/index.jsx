import React from 'react';
import style from './forgotPassword.module.scss';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  return (
    <div className={style['forgotPassword']}>
      <div className={style['form']}>
        <div className={style['input']}>
          <label htmlFor="phone">Số điện thoại</label>
          <input id="phone" type="text" />
        </div>
        <div className={style['input']}>
          <label htmlFor="password">Mật khẩu</label>
          <input id="password" type="password" />
        </div>
        <div className={style['input']}>
          <label htmlFor="rePassword">Nhập lại mật khẩu</label>
          <input id="rePassword" type="password" />
        </div>
        <div className={style['btn']}>
          <button>Đổi mật khẩu</button>
        </div>
      </div>
      <div className={style['register']}>
        <Link to={'/auth/register'}>Đăng ký bằng SCI Email tại đây!</Link>
      </div>
      <div className={style['register']}>
        <Link to={'/auth/login'}>Quay lại trang đăng nhập</Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
