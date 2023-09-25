import React from 'react';
import style from './contentModal.module.scss';
import JoditEditor from 'jodit-react';
import { useRef } from 'react';
import { useState } from 'react';
import { useOutside } from '@/utils/help';

const ContentModal = (props) => {
  const editor = useRef(null);
  const contentModalRef = useRef(null);
  const inputRef = useRef(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [content, setContent] = useState({ title: props.content, content: '' });

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
  const handleEdit = () => {
    handleIsEditTitle();
    if (props.content !== content.title) {
      console.log(content.title);
    }
  };
  useOutside(contentModalRef, props.handleIsDetail);
  useOutside(inputRef, handleEdit);
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
                <button> Lưu </button>
                <button onClick={handleIsEdit}> Hủy </button>
              </div>
            </div>
          ) : (
            <div className={style['main']} onClick={handleIsEdit}>
              Thêm nội dung chi tiết...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentModal;
