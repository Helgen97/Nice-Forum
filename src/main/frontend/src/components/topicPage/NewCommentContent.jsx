import React from 'react'

const NewCommentContent = ({value, onChange, maxTextLength}) => {
  return (
    <div className="new__comment__content-text">
        <div className="comment__content-edit__text-title">
            <p>Новый комментарий</p>
        </div>
        <div className="comment__content-text">
            <textarea rows="7" placeholder="Оставь свой комментарий" value={value} onChange={onChange}></textarea>
            <p className="textarea__chars-remain">{value.length > maxTextLength ? "Превышен лимит символов!" : "Осталось символов: " + (maxTextLength - value.length)}</p>
        </div>
    </div>
  )
}

export default NewCommentContent