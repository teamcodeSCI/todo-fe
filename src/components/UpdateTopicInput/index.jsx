import React, { useRef, useState } from 'react';
import style from './updateTopicInput.module.scss';
import { pressEnter, useOutside } from '@/utils/help';
import { useDispatch } from 'react-redux';
import { updateTopic } from '@/features/topic/topicApi';

const UpdateTopicInput = (props) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const [error, setError] = useState(false);
  const [title, setTitle] = useState(props.name);
  const inputRef = useRef(null);

  const handleUpdateTitle = () => {
    if (active) {
      if (title === '') {
        setError(true);
        return;
      }
      setActive(false);
      if (title !== props.name) {
        dispatch(updateTopic({ id: props.id, name: title }));

        setError(false);
      }
    }
  };
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  useOutside(inputRef, handleUpdateTitle);

  return (
    <div className={style['title']} onClick={() => setActive(true)} ref={inputRef}>
      {active ? (
        <input
          type="text"
          style={error ? { boxShadow: 'inset 0 0 0 2px red' } : { boxShadow: 'inset 0 0 0 2px #388bff' }}
          value={title}
          onKeyDown={(e) => pressEnter(e, handleUpdateTitle)}
          onChange={handleTitle}
        />
      ) : (
        <span>{title}</span>
      )}
    </div>
  );
};

export default UpdateTopicInput;
