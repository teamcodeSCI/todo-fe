import React from 'react';
import style from './loading.module.scss';

const Loading = () => {
  return (
    <div className={style['loading']}>
      <button>
        <i className="icon-spin4"></i>
      </button>
    </div>
  );
};

export default Loading;
