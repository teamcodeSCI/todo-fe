import React, { useState } from 'react';
import style from './login.module.scss';
import { Link } from 'react-router-dom';
import { validateEmail } from '@/utils/help';
import Notice from '@/components/Notice';

const Login = () => {
  const [login, setLogin] = useState({ email: '', password: '' });
  const [notify, setNotify] = useState('');
  const handleLogin = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  const clickLogin = () => {
    if (!validateEmail(login.email)) {
      setNotify('Email không hợp lệ !');
      return;
    }
  };
  const handleClose = () => {
    setNotify('');
  };

  return (
    <div className={style['login']}>
      {notify !== '' && <Notice notice={notify} close={handleClose} />}
      <div className={style['form']}>
        <div className={style['input']}>
          <label htmlFor="email">Email</label>
          <input id="email" type="text" name="email" value={login.email} onChange={handleLogin} />
        </div>
        <div className={style['input']}>
          <label htmlFor="password">
            Mật khẩu <Link to={'/auth/forgot-password'}>Quên mật khẩu?</Link>
          </label>
          <input id="password" type="password" name="password" value={login.password} onChange={handleLogin} />
        </div>
        <div className={style['btn']}>
          <button onClick={clickLogin}>Đăng nhập</button>
        </div>
      </div>
      <div className={style['register']}>
        <Link to={'/auth/register'}>Đăng ký bằng SCI Email tại đây!</Link>
      </div>
    </div>
  );
};

export default Login;
