import React from "react";

const Error = ({ error }) => {
  return (
    <div className="error_modal">
      <div className="error_modal__message">
        <p>{error}</p>
      </div>
      <div className="error_modal__recomendation">
        <p>Please reload the page and try again.</p>
      </div>
    </div>
  );
};

export default Error;
