import React, { useState, useRef } from 'react';
import style from './contentModal.module.scss';
import JoditEditor from 'jodit-react';
import { useOutside } from '@/utils/help';
import { useDispatch } from 'react-redux';
import { updateItem } from '@/features/category/itemApi';

const ContentModal = (props) => {
  const dispatch = useDispatch();
  const editor = useRef(null);
  const contentModalRef = useRef(null);
  const inputRef = useRef(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [content, setContent] = useState({ id: props.id, title: props.title, content: props.content });
  const decodedHTML = { __html: content.content };

  const config = {
    readonly: false,
    placeholder: 'Start typings...',
  };
  const handleIsEditTitle = () => {
    setIsEditTitle(!isEditTitle);
  };
  const handleIsEdit = () => {
    setIsEdit(!isEdit);
  };
  const handleEditTitle = () => {
    handleIsEditTitle();
    if (props.title !== content.title && content.title !== '') {
      dispatch(updateItem(content));
    }
  };
  const handleEditContent = () => {
    if (props.content !== content.content && content.content !== '') {
      dispatch(updateItem(content));
      handleIsEdit();
    }
  };
  // useOutside(contentModalRef, props.handleIsDetail);
  useOutside(inputRef, handleEditTitle);
  return (
    <div className={style['contentModal']}>
      <div className={style['box']} ref={contentModalRef}>
        <div className={style['title']}>
          {isEditTitle ? (
            <input
              ref={inputRef}
              value={content.title}
              onChange={(e) => {
                setContent({ ...content, title: e.target.value });
              }}
              type="text"
            />
          ) : (
            <span onClick={handleIsEditTitle}>{content.title}</span>
          )}
        </div>
        <div className={style['btn']}>
          <button onClick={props.handleIsDetail}>
            <i className="icon-cancel-2"></i>
          </button>
        </div>
        <div className={style['content']}>
          <div className={style['desc']}>
            <i className="icon-list"></i> Mô tả
          </div>
          {isEdit ? (
            <div className={style['editor']}>
              <JoditEditor
                className={style['edit']}
                ref={editor}
                value={content.content}
                config={config}
                tabIndex={1} // tabIndex of textarea
                onBlur={(newContent) => setContent({ ...content, content: newContent })}
                onChange={(newContent) => {}}
              />
              <div className={style['control']}>
                <button onClick={handleEditContent}> Lưu </button>
                <button onClick={handleIsEdit}> Hủy </button>
              </div>
            </div>
          ) : (
            <div className={style['main']} onClick={handleIsEdit}>
              {content.content === '' || props.content === null || content.content === `<p><br></p>` ? (
                <span className={style['intro']}> Thêm nội dung chi tiết...</span>
              ) : (
                <div dangerouslySetInnerHTML={decodedHTML} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentModal;
