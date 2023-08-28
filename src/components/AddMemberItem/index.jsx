import React from 'react';
import style from './addMemberItem.module.scss';

const AddMemberItem = (props) => {
  return (
    <div className={style['addMemberItem']}>
      <div className={style['text']}>
        <p>{props.firstName + ' ' + props.lastName}</p>
        <span>{props.position}</span>
      </div>
      <button>Thêm</button>
    </div>
  );
};

export default AddMemberItem;
