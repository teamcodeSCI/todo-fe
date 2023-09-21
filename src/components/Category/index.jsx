import React, { useRef, useState } from 'react';
import style from './category.module.scss';
import Card from '../Card';
import { pressEnter, useOutside } from '@/utils/help';
import { Tooltip } from 'react-tooltip';
import { v4 as uuid } from 'uuid';
import { useDispatch } from 'react-redux';
import { createItem, deleteCategories, updateCategories } from '@/features/category/categoriesApi';
import NoticeModal from '../NoticeModal';
import { useSelector } from 'react-redux';
import { loadingCategoriesSelector } from '@/features/category/categoriesSlice';
import Loading from '../Loading';

const Category = ({ provided, section }) => {
  const dispatch = useDispatch();
  const loadingCate = useSelector(loadingCategoriesSelector);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const [item, setItem] = useState({ id: uuid(), category_id: section.id, title: '' });
  const [dropdown, setDropdown] = useState(false);
  const [title, setTitle] = useState(section.name);
  const [active, setActive] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [isDelCate, setIsDelCate] = useState(false);
  const handleIsAdd = () => {
    setIsAdd(!isAdd);
  };
  const handleIsDel = () => {
    setIsDelCate(!isDelCate);
  };
  const deleteCate = () => {
    dispatch(deleteCategories({ category_id: section.id }));
    handleIsDel();
  };
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleItem = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };
  const saveItem = () => {
    if (item.title !== '') {
      dispatch(createItem(item));
      setItem({ ...item, title: '' });
      setIsAdd(!isAdd);
    }
  };
  const saveCategory = () => {
    setActive(false);
    if (active) {
      if (section.name !== title) dispatch(updateCategories({ category: title, category_id: section.id }));
    }
  };
  useOutside(inputRef, saveCategory);
  useOutside(dropdownRef, () => {
    setDropdown(false);
  });
  return (
    <div {...provided.droppableProps} className={style['section']} ref={provided.innerRef}>
      {loadingCate && <Loading />}
      <div className={style['section-title']}>
        <div className={style['text']} onClick={() => setActive(true)} ref={inputRef}>
          {active ? (
            <input type="text" value={title} onKeyDown={(e) => pressEnter(e, saveCategory)} onChange={handleTitle} />
          ) : (
            <span>{title}</span>
          )}
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
            <li onClick={handleIsDel}>Xóa</li>
          </ul>
        )}
      </div>
      <div className={style['section-content']}>
        {section.items.map((job, idx) => (
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
            onKeyDown={(e) => pressEnter(e, saveItem)}
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
      {isDelCate && (
        <NoticeModal message={'Bạn có chắc muốn xóa không ?'} action={deleteCate} handleSetDel={handleIsDel} />
      )}
    </div>
  );
};

export default Category;
