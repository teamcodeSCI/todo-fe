import React, { useState } from 'react';
import style from './personalInfo.module.scss';

import { useSelector } from 'react-redux';
import { currentUserSelector } from '@/features/auth/authSlice';

const PersonalInfo = () => {
  const currentUser = useSelector(currentUserSelector);
  const user = currentUser.data.data;
  const [isEdit, setIsEdit] = useState(false);

  const [info, setInfo] = useState({
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    position: user.position,
  });
  const [password, setPassword] = useState({ new: '', retype: '' });
  const handleIsEdit = () => {
    setIsEdit(!isEdit);
  };
  const handlePassword = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };
  const handleInfo = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  const handleResetPass = () => {
    if (password.new === '' || password.retype === '') {
    }
  };
  const saveInfo = () => {
    handleIsEdit();
  };
  return (
    <div className={style['personalInfo']}>
      <div className={style['title']}>Thông tin cá nhân</div>
      <div className={style['info']}>
        <div className={style['control']}>
          {isEdit ? (
            <div className={style['btnGroup']}>
              <button className={style['cancel']} onClick={handleIsEdit}>
                Hủy bỏ
              </button>
              <button className={style['save']} onClick={saveInfo}>
                Lưu
              </button>
            </div>
          ) : (
            <button className={style['edit']} onClick={handleIsEdit}>
              Sửa thông tin
            </button>
          )}
        </div>
        <div className={style['avatar']}>{user.last_name.split('')[0]}</div>
        <div className={style['inputGroup']}>
          <div className={style['input']}>
            <label htmlFor="firstName">Họ và tên đệm</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              onChange={handleInfo}
              value={info.firstName}
              placeholder="Họ và tên đệm..."
              disabled={!isEdit}
            />
          </div>
          <div className={style['input']}>
            <label htmlFor="lastName">Tên</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              onChange={handleInfo}
              value={info.lastName}
              placeholder="Tên..."
              disabled={!isEdit}
            />
          </div>
          <div className={style['input']}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              onChange={handleInfo}
              value={info.email}
              placeholder="Email..."
              disabled={!isEdit}
            />
          </div>
          <div className={style['input']}>
            <label htmlFor="position">Vị trí</label>
            <input
              type="text"
              id="position"
              name="text"
              onChange={handleInfo}
              value={info.position.name}
              placeholder="Email..."
              disabled={!isEdit}
            />
          </div>
        </div>
      </div>
      <div className={style['title']}>Đổi mật khẩu</div>
      <div className={style['password']}>
        <div className={style['input']}>
          <label htmlFor="new">Mật khẩu mới</label>
          <input
            type="password"
            id="new"
            name="new"
            onChange={handlePassword}
            value={password.new}
            placeholder="Nhập mật khẩu mới.."
          />
        </div>
        <div className={style['input']}>
          <label htmlFor="retype">Nhập lại mật khẩu</label>
          <input
            type="password"
            id="retype"
            name="retype"
            onChange={handlePassword}
            value={password.retype}
            placeholder="Nhập lại mật khẩu..."
          />
        </div>
        <button>Đổi mật khẩu</button>
      </div>
    </div>
  );
};

export default PersonalInfo;
