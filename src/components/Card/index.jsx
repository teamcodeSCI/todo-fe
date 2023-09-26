import React from 'react';
import style from './card.module.scss';
import { Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';
import ContentModal from '../ContentModal';
import NoticeModal from '../NoticeModal';
import { useDispatch } from 'react-redux';
import { deleteItem } from '@/features/category/itemApi';

const Card = ({ job, idx }) => {
  const dispatch = useDispatch();
  const [isDetail, setIsDetail] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const handleIsDetail = () => {
    setIsDetail(!isDetail);
  };
  const handleIsDelete = () => {
    setIsDelete(!isDelete);
  };
  const handleDelete = () => {
    handleIsDelete();
    dispatch(deleteItem(job.id));
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
          >
            <div className={style['card']}>
              <span onClick={handleIsDetail}>{job.title}</span>
              {job.content !== '' && job.content !== null && job.content !== `<p><br></p>` && (
                <i className="icon-list"></i>
              )}
              <button onClick={handleIsDelete}>
                <i className="icon-trash"></i>
              </button>
            </div>
            {provided.placeholder}
          </div>
        )}
      </Draggable>
      {isDetail && <ContentModal {...job} handleIsDetail={handleIsDetail} />}
      {isDelete && (
        <NoticeModal message={'Bạn có chắc muốn xóa không ?'} handleSetDel={handleIsDelete} action={handleDelete} />
      )}
    </>
  );
};

export default Card;
