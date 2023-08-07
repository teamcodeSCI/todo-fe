import React from 'react';
import style from './login.module.scss';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className={style['login']}>
      <div className={style['form']}>
        <div className={style['input']}>
          <label htmlFor="phone">Số điện thoại</label>
          <input id="phone" type="text" />
        </div>
        <div className={style['input']}>
          <label htmlFor="password">
            Mật khẩu <Link to={'/auth/forgot-password'}>Quên mật khẩu?</Link>
          </label>
          <input id="password" type="password" />
        </div>
        <div className={style['btn']}>
          <button>Đăng nhập</button>
        </div>
      </div>
      <div className={style['register']}>
        <Link to={'/auth/register'}>Đăng ký bằng SCI Email tại đây!</Link>
      </div>
    </div>
  );
};

export default Login;
