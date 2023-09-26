import React, { useState } from 'react';
import style from './forgotPassword.module.scss';
import { Link, Navigate } from 'react-router-dom';
import { pressEnter, validateEmail } from '@/utils/help';
import Notice from '@/components/Notice';
import { useDispatch } from 'react-redux';
import { updatePasswordAPI } from '@/features/auth/authApi';
import { useSelector } from 'react-redux';
import { loadedAuthSelector, loadingAuthSelector } from '@/features/auth/authSlice';
import Loading from '@/components/Loading';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const loadedForgotPass = useSelector(loadedAuthSelector);
  const loadingForgotPass = useSelector(loadingAuthSelector);
  const [forgotPass, setForgotPass] = useState({
    email: '',
    password: '',
    rePassword: '',
  });
  const [notify, setNotify] = useState('');
  const handleForgotPass = (e) => {
    setForgotPass({ ...forgotPass, [e.target.name]: e.target.value });
  };
  const clickForgotPass = () => {
    if (!validateEmail(forgotPass.email)) {
      setNotify('Email không hợp lệ !');
      return;
    }
    if (forgotPass.password !== forgotPass.rePassword) {
      setNotify('Nhập lại mật khẩu không đúng !');
      return;
    }
    dispatch(updatePasswordAPI(forgotPass));
  };
  const handleClose = () => {
    setNotify('');
  };
  return (
    <div className={style['forgotPassword']}>
      {loadingForgotPass && <Loading />}
      {loadedForgotPass && <Navigate to={'/auth'} />}
      {notify !== '' && <Notice notice={notify} close={handleClose} />}
      <div className={style['form']}>
        <div className={style['input']}>
          <label htmlFor="email">Email</label>
          <input id="email" type="text" name="email" value={forgotPass.email} onChange={handleForgotPass} />
        </div>
        <div className={style['input']}>
          <label htmlFor="password">Mật khẩu mới</label>
          <input
            id="password"
            type="password"
            name="password"
            value={forgotPass.password}
            onKeyDown={(e) => pressEnter(e, clickForgotPass)}
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
            onKeyDown={(e) => pressEnter(e, clickForgotPass)}
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
