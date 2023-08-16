import React, { useRef, useState } from 'react';
import style from './category.module.scss';
import Card from '../Card';
import { useOutside } from '@/utils/help';

const Category = ({ provided, section }) => {
  const inputRef = useRef(null);
  const [title, setTitle] = useState(section.title);
  const [active, setActive] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const handleIsAdd = () => {
    setIsAdd(!isAdd);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  useOutside(inputRef, () => {
    setActive(false);
    if (active) console.log('hello');
  });
  return (
    <div {...provided.droppableProps} className={style['section']} ref={provided.innerRef}>
      <div className={style['section-title']} onClick={() => setActive(true)} ref={inputRef}>
        {active ? <input type="text" value={title} onChange={handleTitle} /> : <span>{title}</span>}
      </div>
      <div className={style['section-content']}>
        {section.jobs.map((job, idx) => (
          <Card key={job.id} job={job} idx={idx} />
        ))}
        {provided.placeholder}
      </div>
      {isAdd ? (
        <div className={style['addForm']}>
          <textarea placeholder="Nhập tiêu đề cho thẻ này..." cols="30" rows="10"></textarea>
          <div className={style['btn']}>
            <button className={style['submit']}>Thêm thẻ</button>
            <button className={style['cancel']}>
              <i className="icon-cancel-2"></i>
            </button>
          </div>
        </div>
      ) : (
        <div className={style['addBtn']} onClick={handleIsAdd}>
          <i className="icon-plus-1"></i> Thêm thẻ
        </div>
      )}
    </div>
  );
};

export default Category;
