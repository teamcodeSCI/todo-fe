import React from 'react';
import style from './card.module.scss';
import { Draggable } from 'react-beautiful-dnd';

const Card = ({ job, idx }) => {
  return (
    <Draggable draggableId={String(job.id)} index={idx}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{ ...provided.draggableProps.style, opacity: snapshot.isDragging ? '0.5' : 1 }}
        >
          <div className={style['card']}>{job.content}</div>
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
};

export default Card;
