import React from 'react';
import style from './card.module.scss';
import { Draggable } from 'react-beautiful-dnd';

const Card = ({ job, idx }) => {
  return (
    <Draggable draggableId={job.id} index={idx}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{ ...provided.draggableProps.style, opacity: snapshot.isDragging ? '0.5' : 1 }}
        >
          <div className={style['card']}>{job.title}</div>
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
};

export default Card;
