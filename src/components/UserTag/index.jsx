import React from 'react';
import style from './userTag.module.scss';
import { Tooltip } from 'react-tooltip';

const UserTag = (props) => {
  return (
    <>
      <div
        data-tooltip-id={props.id}
        data-tooltip-content={props.firstName + ' ' + props.lastName}
        style={{ background: props.background }}
        className={style['tag']}
      >
        {props.lastName.split('')[0]}
      </div>
      <Tooltip id={props.id} />
    </>
  );
};

export default UserTag;
