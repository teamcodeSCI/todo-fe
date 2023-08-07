import React from 'react';
import style from './notice.module.scss';

const Notice = ({ notice, close }) => {
  return (
    <div className={style['notice']}>
      {notice}
      <button onClick={close}>✕</button>
    </div>
  );
};

export default Notice;
