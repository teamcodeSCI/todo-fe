import React, { useState } from 'react';
import style from './register.module.scss';
import { Link } from 'react-router-dom';
import Notice from '@/components/Notice';
import { validateEmail } from '@/utils/help';

const Register = () => {
  const [register, setRegister] = useState({ firstName: '', lastName: '', email: '', password: '', rePassword: '' });
  const [notify, setNotify] = useState('');

  const handleRegister = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };
  const clickRegister = () => {
    if (!validateEmail(register.email)) {
      setNotify('Email không hợp lệ !');
      return;
    }
  };
  const handleClose = () => {
    setNotify('');
  };

  return (
    <div className={style['register']}>
      {notify !== '' && <Notice notice={notify} close={handleClose} />}
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
          <label htmlFor="position">Vị trí</label>
          <select name="position">
            <option value="" disabled>
              Chọn vị trí
            </option>
            <option value="">Nhân viên code</option>
            <option value="">Nhân viên thiết kế</option>
            <option value="">Leader thiết kế</option>
          </select>
        </div>
        <div className={style['input']}>
          <label htmlFor="email">Email</label>
          <input id="email" type="text" name="email" value={register.email} onChange={handleRegister} />
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
