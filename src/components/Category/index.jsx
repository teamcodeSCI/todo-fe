import React, { useRef, useState } from 'react';
import style from './category.module.scss';
import Card from '../Card';
import { useOutside } from '@/utils/help';

const Category = ({ provided, section }) => {
  const inputRef = useRef(null);
  const [title, setTitle] = useState(section.title);
  const [active, setActive] = useState(false);

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  useOutside(inputRef, () => {
    setActive(false);
    if (active) console.log('hello');
  });
  return (
    <div {...provided.droppableProps} className={style['section']} ref={provided.innerRef}>
      <div
        className={style['section-title']}
        style={active ? { width: '100%' } : { width: 'fit-content' }}
        onClick={() => setActive(true)}
        ref={inputRef}
      >
        {active ? <input type="text" value={title} onChange={handleTitle} /> : <span>{title}</span>}
      </div>
      <div className={style['section-content']}>
        {section.jobs.map((job, idx) => (
          <Card key={job.id} job={job} idx={idx} />
        ))}
        {provided.placeholder}
      </div>
    </div>
  );
};

export default Category;
