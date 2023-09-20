import React from 'react';
import style from './addMemberItem.module.scss';

const AddMemberItem = (props) => {
  console.log(props);
  return (
    <div className={style['addMemberItem']}>
      <div className={style['text']}>
        <p>{props.first_name + ' ' + props.last_name}</p>
        <span>{props.position_name}</span>
      </div>
      <button>Thêm</button>
    </div>
  );
};

export default AddMemberItem;
