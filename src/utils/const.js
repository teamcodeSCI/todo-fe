import { v4 as uuid } from 'uuid';
export const table = [
  { id: 1, name: 'Bảng 1' },
  { id: 2, name: 'Bảng 2' },
  { id: 3, name: 'Bảng 3' },
  { id: 4, name: 'Bảng 4' },
  { id: 5, name: 'Bảng 5' },
];
export const menu = [
  { link: '/user', title: 'Thông tin cá nhân', icon: <i className="icon-user"></i> },
  { link: '/', title: 'Bảng', icon: <i className="icon-th-large"></i> },
];
export const userList = [
  {
    id: uuid(),
    firstName: 'Đoàn Minh',
    lastName: 'Đức',
    email: 'ducdm@scigroup.com.vn',
    background: 'red',
    role: 'Admin',
    position: 'Nhân viên code',
  },
  {
    id: uuid(),
    firstName: 'Nguyễn Văn',
    lastName: 'Long',
    email: 'longnv@scigroup.com.vn',
    background: 'blue',
    role: 'Member',
    position: 'Nhân viên thiết kế',
  },
  {
    id: uuid(),
    firstName: 'Hoàng Minh',
    lastName: 'Cương',
    email: 'cuonghm@scigroup.com.vn',
    background: 'green',
    role: 'Member',
    position: 'Nhân viên thiết kế',
  },
  {
    id: uuid(),
    firstName: 'Trần Tiến',
    lastName: 'Đạt',
    email: 'dattt@scigroup.com.vn',
    background: 'yellow',
    role: 'Member',
    position: 'Nhân viên thiết kế',
  },
];
