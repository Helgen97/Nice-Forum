import React from "react";

const NotFound = () => {
  return (
    <main className="error-page">
        <div className="error_page__404">
          <p>404</p>
        </div>
        <div className="error_page__text">
          <p>Oops, page not found...</p>
        </div>
        <div className="error_page__home-btn">
          <a href="/" className="error_page__home-btn_link">Home...</a>
        </div>
    </main>
  );
};

export default NotFound;
