import React from "react";

const TextArea = ({ value = "", onChange, maxTextLength }) => {
  return (
    <div>
      <label htmlFor="textarea">Text:</label>
      <div className="form__topic-text">
        <div className="form__topic-text__title">
          <p>Text modification in development</p>
        </div>
        <div>
          <textarea
            className="create-page__textarea"
            id="textarea"
            cols="30"
            rows="10"
            placeholder="Enter text here..."
            value={value}
            onChange={onChange}
          />
          <p className="textarea__chars-remain">{value.length > maxTextLength ? "Сharacter limit exceeded!" : "Characters left: " + (maxTextLength - value.length)}</p>
        </div>
      </div>
    </div>
  );
};

export default TextArea;
