import { v4 as uuid } from 'uuid';
export const userList = [
  {
    id: uuid(),
    firstName: 'Đoàn Minh',
    lastName: 'Đức',
    email: 'ducdm@scigroup.com.vn',
    background: 'red',
    role: 'Admin',
  },
  {
    id: uuid(),
    firstName: 'Nguyễn Văn',
    lastName: 'Long',
    email: 'longnv@scigroup.com.vn',
    background: 'blue',
    role: 'Member',
  },
  {
    id: uuid(),
    firstName: 'Hoàng Minh',
    lastName: 'Cương',
    email: 'cuonghm@scigroup.com.vn',
    background: 'green',
    role: 'Member',
  },
  {
    id: uuid(),
    firstName: 'Trần Tiến',
    lastName: 'Đạt',
    email: 'dattt@scigroup.com.vn',
    background: 'yellow',
    role: 'Member',
  },
];
