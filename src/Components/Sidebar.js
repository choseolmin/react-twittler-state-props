import React from 'react';
import './Sidebar.css';

const Sidebar = ({ tweet, onClose, onDelete }) => {
  if (!tweet) return null;

  return (
    <div className="sidebar__overlay">
      <div className="sidebarDetail">
        <button className="sidebar__close" onClick={onClose}>닫기</button>
        <div className="sidebar__profile">
          <img src={tweet.picture} alt="profile" />
        </div>
        <div className="sidebar__content">
          <h3>{tweet.username}</h3>
          <p>{tweet.content}</p>
          <span className="sidebar__date">{tweet.createdAt}</span>
        </div>
        <button className="sidebar__delete" onClick={() => onDelete(tweet.id)}>
          삭제
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 