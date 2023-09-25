import React from 'react';
import style from './card.module.scss';
import { Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';
import ContentModal from '../ContentModal';

const Card = ({ job, idx }) => {
  const [isDetail, setIsDetail] = useState(false);
  const handleIsDetail = () => {
    setIsDetail(!isDetail);
  };
  return (
    <>
      <Draggable draggableId={String(job.id)} index={idx}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{ ...provided.draggableProps.style, opacity: snapshot.isDragging ? '0.5' : 1 }}
            onClick={handleIsDetail}
          >
            <div className={style['card']}>{job.content}</div>
            {provided.placeholder}
          </div>
        )}
      </Draggable>
      {isDetail && <ContentModal {...job} handleIsDetail={handleIsDetail} />}
    </>
  );
};

export default Card;
