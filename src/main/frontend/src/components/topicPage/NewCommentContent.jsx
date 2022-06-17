import React from 'react'

const NewCommentContent = ({value, onChange, maxTextLength}) => {
  return (
    <div className="new__comment__content-text">
        <div className="comment__content-edit__text-title">
            <p>New comment</p>
        </div>
        <div className="comment__content-text">
            <textarea rows="7" placeholder="Enter comment text" value={value} onChange={onChange}></textarea>
            <p className="textarea__chars-remain">{value.length > maxTextLength ? "Сharacter limit exceeded!" : "Characters left: " + (maxTextLength - value.length)}</p>
        </div>
    </div>
  )
}

export default NewCommentContent