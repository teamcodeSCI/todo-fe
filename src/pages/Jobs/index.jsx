import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import style from './jobs.module.scss';
import { v4 as uuid } from 'uuid';
import Category from '../../components/Category';
import { useDispatch } from 'react-redux';
import { createCategories, fetchCategories, updateCategories } from '@/features/category/categoriesApi';
import { useSelector } from 'react-redux';
import { categoriesListSelector, loadedCategoriesSelector } from '@/features/category/categoriesSlice';

const Jobs = () => {
  const dispatch = useDispatch();
  const jobs = useSelector(categoriesListSelector);
  const loaded = useSelector(loadedCategoriesSelector);
  const [isAdd, setIsAdd] = useState(false);
  const [newCate, setNewCate] = useState('');
  const handleIsAdd = () => {
    setIsAdd(!isAdd);
  };

  const handleDragEnd = (value) => {
    dispatch(updateCategories(value));
  };
  const handleNewCate = (e) => {
    setNewCate(e.target.value);
  };
  const createNewCate = () => {
    if (newCate !== '') {
      dispatch(createCategories({ id: uuid(), title: newCate, jobs: [] }));
      setNewCate('');
      setIsAdd(false);
    }
  };
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className={style['job']}>
        {loaded &&
          jobs.map((section) => (
            <Droppable key={section.id} droppableId={section.id}>
              {(provided) => <Category provided={provided} section={section} />}
            </Droppable>
          ))}
        <div className={style['newJob']} style={isAdd ? { opacity: 1 } : { opacity: 0.6 }}>
          {isAdd ? (
            <div className={style['addForm']}>
              <input type="text" value={newCate} onChange={handleNewCate} placeholder="Nhập tiêu đề danh sách..." />
              <div className={style['btn']}>
                <button className={style['submit']} onClick={createNewCate}>
                  Thêm danh sách
                </button>
                <button className={style['cancel']} onClick={handleIsAdd}>
                  <i className="icon-cancel-2"></i>
                </button>
              </div>
            </div>
          ) : (
            <div className={style['addBtn']} onClick={handleIsAdd}>
              + Thêm danh sách khác
            </div>
          )}
        </div>
      </div>
    </DragDropContext>
  );
};

export default Jobs;
