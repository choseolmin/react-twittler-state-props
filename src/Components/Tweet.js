import React from 'react';
import './Tweet.css';

const Tweet = ({ tweet, onClick, onLike }) => {
  const parsedDate = new Date(tweet.createdAt).toLocaleDateString('ko-kr');

  const handleLikeClick = (e) => {
    e.preventDefault(); // 이벤트 전파 방지
    e.stopPropagation(); // 이벤트 버블링 방지
    onLike();
  };

  return (
    <li className="tweet" id={tweet.id} onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className="tweet__profile">
        <img src={tweet.picture} alt="프로필 이미지" />
      </div>
      <div className="tweet__content">
        <div className="tweet__userInfo">
          <div className="tweet__userInfo--wrapper">
            <span className="tweet__username">{tweet.username}</span>
            <span className="tweet__createdAt">{parsedDate}</span>
          </div>
        </div>
        <div className="tweet__message">{tweet.content}</div>
        <div className="tweet__actions">
          <div className="tweet__like-container">
            <span className="tweet__like-text">좋아요</span>
            <span className="tweet__like-count">{tweet.likeCount || 0}</span>
            <button 
              className={`tweet__like-btn ${tweet.isLiked ? 'tweet__like-btn--active' : ''}`}
              onClick={handleLikeClick}
            >
              <i className={`${tweet.isLiked ? 'fas' : 'far'} fa-heart`}></i>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Tweet;
