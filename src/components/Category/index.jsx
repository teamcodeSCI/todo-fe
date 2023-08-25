import React, { useRef, useState } from 'react';
import style from './category.module.scss';
import Card from '../Card';
import { useOutside } from '@/utils/help';
import { Tooltip } from 'react-tooltip';
import { v4 as uuid } from 'uuid';
import { useDispatch } from 'react-redux';
import { createItem } from '@/features/category/categoriesApi';

const Category = ({ provided, section }) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const [item, setItem] = useState({ id: uuid(), category_id: section.id, title: '' });
  const [dropdown, setDropdown] = useState(false);
  const [title, setTitle] = useState(section.title);
  const [active, setActive] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const handleIsAdd = () => {
    setIsAdd(!isAdd);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleItem = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };
  const saveItem = () => {
    if (item.title === '') return;
    dispatch(createItem(item));
    setItem({ id: '', category_id: '', title: '' });
    setIsAdd(!isAdd);
  };
  useOutside(inputRef, () => {
    setActive(false);
    if (active) {
      if (section.title !== title) console.log('hello');
    }
  });
  useOutside(dropdownRef, () => {
    setDropdown(false);
  });
  return (
    <div {...provided.droppableProps} className={style['section']} ref={provided.innerRef}>
      <div className={style['section-title']}>
        <div className={style['text']} onClick={() => setActive(true)} ref={inputRef}>
          {active ? <input type="text" value={title} onChange={handleTitle} /> : <span>{title}</span>}
        </div>
        <button
          data-tooltip-delay-show={2000}
          data-tooltip-id={'action'}
          data-tooltip-content={'Thao tác'}
          onClick={() => {
            setDropdown(true);
          }}
        >
          ●●●
        </button>
        <Tooltip id={'action'} />
        {dropdown && (
          <ul ref={dropdownRef}>
            <li>Xóa</li>
          </ul>
        )}
      </div>
      <div className={style['section-content']}>
        {section.jobs.map((job, idx) => (
          <Card key={job.id} job={job} idx={idx} />
        ))}
        {provided.placeholder}
      </div>
      {isAdd ? (
        <div className={style['addForm']}>
          <textarea
            onChange={handleItem}
            name="title"
            value={item.title}
            placeholder="Nhập tiêu đề cho thẻ này..."
            cols="30"
            rows="10"
          ></textarea>
          <div className={style['btn']}>
            <button className={style['submit']} onClick={saveItem}>
              Thêm thẻ
            </button>
            <button className={style['cancel']} onClick={handleIsAdd}>
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
