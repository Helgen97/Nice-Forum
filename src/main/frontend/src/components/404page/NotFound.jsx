import React from "react";

const NotFound = () => {
  return (
    <main className="error-page">
        <div className="error_page__404">
          <p>404</p>
        </div>
        <div className="error_page__text">
          <p>Упс, страница не найдена...</p>
        </div>
        <div className="error_page__home-btn">
          <a href="/" className="error_page__home-btn_link">На главную...</a>
        </div>
    </main>
  );
};

export default NotFound;
