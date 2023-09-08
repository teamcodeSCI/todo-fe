import React from 'react';
import style from './userTag.module.scss';
import { Tooltip } from 'react-tooltip';

const UserTag = (props) => {
  return (
    <>
      <div
        data-tooltip-id={props.id}
        data-tooltip-content={props.first_name + ' ' + props.last_name}
        style={{ background: props.background }}
        className={style['tag']}
      >
        {props.last_name.split('')[0]}
      </div>
      <Tooltip id={props.id} />
    </>
  );
};

export default UserTag;
