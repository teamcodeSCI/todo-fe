import React, { useState } from 'react';
import style from './forgotPassword.module.scss';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [forgotPass, setForgotPass] = useState({
    phone: '',
    password: '',
    rePassword: '',
  });
  const handleForgotPass = (e) => {
    setForgotPass({ ...forgotPass, [e.target.name]: e.target.value });
  };
  const clickForgotPass = () => {};
  return (
    <div className={style['forgotPassword']}>
      <div className={style['form']}>
        <div className={style['input']}>
          <label htmlFor="phone">Số điện thoại</label>
          <input id="phone" type="text" name="phone" value={forgotPass.phone} onChange={handleForgotPass} />
        </div>
        <div className={style['input']}>
          <label htmlFor="password">Mật khẩu mới</label>
          <input
            id="password"
            type="password"
            name="password"
            value={forgotPass.password}
            onChange={handleForgotPass}
          />
        </div>
        <div className={style['input']}>
          <label htmlFor="rePassword">Nhập lại mật khẩu mới</label>
          <input
            id="rePassword"
            type="password"
            name="rePassword"
            value={forgotPass.rePassword}
            onChange={handleForgotPass}
          />
        </div>
        <div className={style['btn']}>
          <button onClick={clickForgotPass}>Đổi mật khẩu</button>
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
