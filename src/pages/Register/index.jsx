import React, { useEffect, useState } from 'react';
import style from './register.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import Notice from '@/components/Notice';
import { validateEmail } from '@/utils/help';
import { useDispatch } from 'react-redux';
import { fetchPosition } from '@/features/position/positionApi';
import { useSelector } from 'react-redux';
import { loadedPositionSelector, loadingPositionSelector, positionSelector } from '@/features/position/positionSlice';
import Loading from '@/components/Loading';
import { register } from '@/features/auth/authApi';
import { loadedAuthSelector, loadingAuthSelector } from '@/features/auth/authSlice';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const positionLoaded = useSelector(loadedPositionSelector);
  const positionLoading = useSelector(loadingPositionSelector);
  const positionList = useSelector(positionSelector);

  const registerLoaded = useSelector(loadedAuthSelector);
  const registerLoading = useSelector(loadingAuthSelector);

  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    position: '',
    password: '',
    rePassword: '',
  });
  const [notify, setNotify] = useState('');

  const handleRegister = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };
  const clickRegister = () => {
    if (
      registerData.firstName === '' ||
      registerData.lastName === '' ||
      registerData.position === '' ||
      registerData.email === '' ||
      registerData.password === '' ||
      registerData.rePassword === ''
    ) {
      setNotify('Vui lòng nhập đủ thông tin');
      return;
    }
    if (!validateEmail(registerData.email)) {
      setNotify('Email không hợp lệ !');
      return;
    }
    dispatch(register(registerData));
  };
  const handleClose = () => {
    setNotify('');
  };
  useEffect(() => {
    dispatch(fetchPosition());
    if (registerLoaded) window.location.assign('/auth/login');
  }, [dispatch, registerLoaded, navigate]);
  return (
    <div className={style['register']}>
      {(positionLoading || registerLoading) && <Loading />}
      {notify !== '' && <Notice notice={notify} close={handleClose} />}
      <div className={style['form']}>
        <div className={style['input']}>
          <label htmlFor="firstName">Họ và tên đệm</label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            placeholder="Nguyễn Văn"
            value={register.firstName}
            onChange={handleRegister}
          />
        </div>
        <div className={style['input']}>
          <label htmlFor="lastName">Tên</label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            placeholder="A"
            value={register.lastName}
            onChange={handleRegister}
          />
        </div>
        <div className={style['input']}>
          <label htmlFor="position">Vị trí</label>
          <select name="position" onChange={handleRegister} defaultValue="" value={register.position}>
            <option value="" disabled>
              Chọn vị trí
            </option>
            {positionLoaded &&
              positionList.data.data.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>
        <div className={style['input']}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            name="email"
            placeholder="example@gmail.com"
            value={register.email}
            onChange={handleRegister}
          />
        </div>
        <div className={style['input']}>
          <label htmlFor="password">Mật khẩu</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Nhập mật khẩu"
            value={register.password}
            onChange={handleRegister}
          />
        </div>
        <div className={style['input']}>
          <label htmlFor="rePassword">Nhập lại mật khẩu</label>
          <input
            id="rePassword"
            type="password"
            name="rePassword"
            placeholder="Nhập lại mật khẩu"
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
