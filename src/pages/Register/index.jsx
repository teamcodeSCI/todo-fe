import React, { useEffect, useState } from 'react';
import style from './register.module.scss';
import { Link } from 'react-router-dom';
import Notice from '@/components/Notice';
import { validateEmail } from '@/utils/help';
import { useDispatch } from 'react-redux';
import { fetchPosition } from '@/features/position/positionApi';
import { useSelector } from 'react-redux';
import { loadedPositionSelector, loadingPositionSelector, positionSelector } from '@/features/position/positionSlice';
import Loading from '@/components/Loading';

const Register = () => {
  const dispatch = useDispatch();
  const positionList = useSelector(positionSelector);
  const positionLoaded = useSelector(loadedPositionSelector);
  const positionLoading = useSelector(loadingPositionSelector);

  const [register, setRegister] = useState({
    firstName: '',
    lastName: '',
    email: '',
    position: '',
    password: '',
    rePassword: '',
  });
  const [notify, setNotify] = useState('');

  const handleRegister = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };
  const clickRegister = () => {
    if (
      register.firstName === '' ||
      register.lastName === '' ||
      register.position === '' ||
      register.email === '' ||
      register.password === '' ||
      register.rePassword === ''
    ) {
      setNotify('Vui lòng nhập đủ thông tin');
      return;
    }
    if (!validateEmail(register.email)) {
      setNotify('Email không hợp lệ !');
      return;
    }
  };
  const handleClose = () => {
    setNotify('');
  };
  useEffect(() => {
    dispatch(fetchPosition());
  }, [dispatch]);
  return (
    <div className={style['register']}>
      {positionLoading && <Loading />}
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
          <select name="position" onChange={handleRegister} value={register.position}>
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
