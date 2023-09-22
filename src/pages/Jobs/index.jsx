import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import style from './jobs.module.scss';
import Category from '../../components/Category';
import { useDispatch } from 'react-redux';
import { createCategories, fetchCategories } from '@/features/category/categoriesApi';
import { useSelector } from 'react-redux';
import {
  categoriesListSelector,
  loadedCategoriesSelector,
  loadingCategoriesSelector,
} from '@/features/category/categoriesSlice';
import { useLocation } from 'react-router-dom';
import Loading from '@/components/Loading';
import { pressEnter } from '@/utils/help';
import { updatePosItem } from '@/features/category/itemApi';

const Jobs = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const paths = location.pathname.split('/');
  const topicId = paths[paths.length - 1];
  const jobs = useSelector(categoriesListSelector);
  const loadedCate = useSelector(loadedCategoriesSelector);
  const loadingCate = useSelector(loadingCategoriesSelector);

  const [isAdd, setIsAdd] = useState(false);
  const [newCate, setNewCate] = useState('');
  const handleIsAdd = () => {
    setIsAdd(!isAdd);
  };

  const handleDragEnd = (value) => {
    dispatch(updatePosItem(value));
  };
  const handleNewCate = (e) => {
    setNewCate(e.target.value);
  };
  const createNewCate = () => {
    if (newCate !== '') {
      dispatch(createCategories({ topicId, title: newCate }));
      setNewCate('');
      setIsAdd(false);
    }
  };
  useEffect(() => {
    dispatch(fetchCategories(topicId));
  }, [dispatch, topicId]);
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className={style['job']}>
        {loadedCate &&
          jobs.map((section) => (
            <Droppable key={section.id} droppableId={String(section.id)}>
              {(provided) => <Category provided={provided} section={section} />}
            </Droppable>
          ))}
        <div className={style['newJob']} style={isAdd ? { opacity: 1 } : { opacity: 0.6 }}>
          {isAdd ? (
            <div className={style['addForm']}>
              <input
                type="text"
                value={newCate}
                onChange={handleNewCate}
                onKeyDown={(e) => pressEnter(e, createNewCate)}
                placeholder="Nhập tiêu đề danh sách..."
              />
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
          {loadingCate && <Loading />}
        </div>
      </div>
    </DragDropContext>
  );
};

export default Jobs;
