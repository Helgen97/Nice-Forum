import React from "react";

const TextArea = ({ value = "", onChange, maxTextLength }) => {
  return (
    <div>
      <label htmlFor="textarea">Введите текст:</label>
      <div className="form__topic-text">
        <div className="form__topic-text__title">
          <p>Видоизменение текста в разработке</p>
        </div>
        <div>
          <textarea
            className="create-page__textarea"
            id="textarea"
            cols="30"
            rows="10"
            placeholder="Введите текст здесь"
            value={value}
            onChange={onChange}
          />
          <p className="textarea__chars-remain">{value.length > maxTextLength ? "Превышен лимит символов!" : "Осталось символов: " + (maxTextLength - value.length)}</p>
        </div>
      </div>
    </div>
  );
};

export default TextArea;
