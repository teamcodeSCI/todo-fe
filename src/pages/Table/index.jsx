import React, { useState } from 'react';
import style from './table.module.scss';
import TableItem from '@/components/TableItem';
import { useDispatch } from 'react-redux';
import { createTopic } from '@/features/topic/topicApi';
import { useSelector } from 'react-redux';
import { loadedTopicSelector, loadingTopicSelector, topicSelector } from '@/features/topic/topicSlice';
import { pressEnter } from '@/utils/help';
import Loading from '@/components/Loading';

const Table = () => {
  const dispatch = useDispatch();
  const [isAdd, setIsAdd] = useState(false);
  const [isError, setIsError] = useState(false);
  const [info, setInfo] = useState({ name: '' });
  const topicList = useSelector(topicSelector);
  const loadedTopic = useSelector(loadedTopicSelector);
  const loadingTopic = useSelector(loadingTopicSelector);

  const handleInfo = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  const handleAdd = () => {
    setIsAdd(!isAdd);
  };
  const saveTopic = () => {
    if (info.name === '') {
      setIsError(true);
      return;
    }
    setIsError(false);
    dispatch(createTopic(info));
    setInfo({ name: '' });
    setIsAdd(false);
  };

  return (
    <div className={style['container']}>
      <div className={style['title']}>Danh sách bảng</div>
      <div className={style['table']}>
        {loadedTopic && topicList.data.map((item) => <TableItem key={item.id} {...item} />)}
        {isAdd ? (
          <div className={style['addItem']}>
            <input
              style={{ borderColor: isError ? 'red' : '#3481aa' }}
              type="text"
              name="name"
              value={info.name}
              onChange={handleInfo}
              onKeyDown={(e) => pressEnter(e, saveTopic)}
              placeholder="Nhập tiêu đề bảng ..."
            />
            <div className={style['addControl']}>
              <button className={style['submit']} onClick={saveTopic}>
                Thêm bảng
              </button>
              <button className={style['cancel']} onClick={handleAdd}>
                <i className="icon-cancel-2"></i>
              </button>
            </div>
          </div>
        ) : (
          <div className={style['addBtn']} onClick={handleAdd}>
            <i className="icon-plus-1"></i> Thêm mới
          </div>
        )}
      </div>
      {loadingTopic && <Loading />}
    </div>
  );
};

export default Table;
