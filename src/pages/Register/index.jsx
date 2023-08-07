import React, { useState } from 'react';
import style from './register.module.scss';
import { Link } from 'react-router-dom';

const Register = () => {
  const [register, setRegister] = useState({ firstName: '', lastName: '', phone: '', password: '', rePassword: '' });
  const handleRegister = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };
  const clickRegister = () => {};
  return (
    <div className={style['register']}>
      <div className={style['form']}>
        <div className={style['input']}>
          <label htmlFor="firstName">Họ và tên đệm</label>
          <input id="firstName" type="text" name="firstName" value={register.firstName} onChange={handleRegister} />
        </div>
        <div className={style['input']}>
          <label htmlFor="lastName">Tên</label>
          <input id="lastName" type="text" name="lastName" value={register.lastName} onChange={handleRegister} />
        </div>
        <div className={style['input']}>
          <label htmlFor="phone">Số điện thoại</label>
          <input id="phone" type="text" name="phone" value={register.phone} onChange={handleRegister} />
        </div>
        <div className={style['input']}>
          <label htmlFor="password">Mật khẩu</label>
          <input id="password" type="password" name="password" value={register.password} onChange={handleRegister} />
        </div>
        <div className={style['input']}>
          <label htmlFor="rePassword">Nhập lại mật khẩu</label>
          <input
            id="rePassword"
            type="password"
            name="rePassword"
            value={register.rePassword}
            onChange={handleRegister}
          />
        </div>
        <div className={style['btn']}>
          <button onClick={clickRegister}>Đăng ký</button>
        </div>
      </div>
      <div className={style['login']}>
        <Link to={'/auth/login'}>Quay lại trang đăng nhập</Link>
      </div>
    </div>
  );
};

export default Register;
