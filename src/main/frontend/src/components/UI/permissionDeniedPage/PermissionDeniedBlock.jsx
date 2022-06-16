import React from 'react'

const PermissionDeniedBlock = () => {
  return (
    <main className="permission-denied-page">
        <div className="block">
            <p className="block__message">Пожалуйста авторизуйтесь!</p>
            <p className="block__message-description">Для доступа к странице нужна авторизация!</p>
        </div>
        <div className="block-links">
            <div className="block__link-container"><a href="/signin" className="block__link">Авторизация</a></div>
            <div className="block__link-container"><a href="/" className="block__link">На главную</a></div>
        </div>
    </main>
  )
}

export default PermissionDeniedBlock;