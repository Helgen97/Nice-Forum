import React from 'react'

const PermissionDeniedBlock = () => {
  return (
    <main className="permission-denied-page">
        <div className="block">
            <p className="block__message">Authentication required</p>
            <p className="block__message-description">Please login first to access this page.</p>
        </div>
        <div className="block-links">
            <div className="block__link-container"><a href="/signin" className="block__link">Sign in</a></div>
            <div className="block__link-container"><a href="/" className="block__link">Home</a></div>
        </div>
    </main>
  )
}

export default PermissionDeniedBlock;