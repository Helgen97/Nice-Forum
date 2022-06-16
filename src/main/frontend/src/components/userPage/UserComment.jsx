import React from 'react'

const UserComment = ({comment}) => {

    const linkToTopic = "/topic/" + comment.topicId;

    return (
        <div className="user-content__panel">
            <div className="user-content__panel-block">
                <a href={linkToTopic} className="user-content__panel-block__link">
                    <p className="user-content__panel-title">Коментарий</p>
                    <p className="user-content__panel-description">{comment.text}</p>
                </a>
            </div>
            <div className="user-content__panel-block">
                <p className="user-content__panel-title">Дата</p>
                <p className="user-content__panel-description">{comment.dateCreation}</p>
            </div>
            <div className="user-content__panel-block">
                <p className="user-content__panel-title">Likes</p>
                <p className="user-content__panel-description">{comment.likes}</p>
            </div>
        </div>
    )
}

export default UserComment