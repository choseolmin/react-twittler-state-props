import React, { useState } from 'react';
import Tweet from '../Components/Tweet';
import Sidebar from '../Components/Sidebar';
import { useNotifications } from '../context/NotificationContext';
import { useTweet } from '../context/TweetContext';
import './Tweets.css';

const Tweets = () => {
  const { tweets, addTweet, toggleLike, addReply, deleteReply, deleteTweet } = useTweet();
  const [message, setMessage] = useState('');
  const [selectedTweet, setSelectedTweet] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { addNotification } = useNotifications();

  // 트윗 버튼 클릭 시 트윗 추가
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      addTweet(message);
      setMessage('');
    }
  };

  // 트윗 클릭 핸들러
  const handleTweetClick = (tweet) => {
    setSelectedTweet(tweet);
    setIsSidebarOpen(true);
  };

  // 사이드바 닫기 핸들러
  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
    setSelectedTweet(null);
  };

  // 답글 핸들러
  const handleReply = (tweetId, reply) => {
    addReply(tweetId, reply.content);
  };

  // 좋아요 핸들러
  const handleLike = (id) => {
    toggleLike(id);
    const tweet = tweets.find(t => t.id === id);
    if (tweet && !tweet.isLiked && tweet.username === 'Bob') {
      addNotification({
        id: Date.now(),
        type: 'like',
        user: 'Bob',
        content: `님이 회원님의 트윗을 좋아합니다.`,
        time: '방금 전',
        tweetId: id
      });
    }
  };

  return (
    <div className="tweets-page">
      <div className="tweets-header">
        <h2>홈</h2>
      </div>
      <div className="tweet-form">
        <div className="tweet-input-container">
          <img src="https://randomuser.me/api/portraits/men/98.jpg" alt="프로필" />
          <div className="tweet-input-wrapper">
            <textarea
              className="tweet-input"
              placeholder="무슨 일이 일어나고 있나요?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="tweet-form-footer">
              <div className="tweet-form-actions">
                <button className="tweet-form-button" disabled={!message.trim()} onClick={handleSubmit}>
                  트윗하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {tweets.length === 0 ? (
        <div className="no-tweets">아직 트윗이 없습니다</div>
      ) : (
        <ul className="tweet-list">
          {tweets.map((tweet) => (
            <li key={tweet.id} className="tweet-item" onClick={() => handleTweetClick(tweet)}>
              <div className="tweet-header">
                <img
                  src={tweet.profileImage}
                  alt={tweet.username}
                  className="tweet-user-image"
                />
                <div className="tweet-user-info">
                  <span className="tweet-username">{tweet.username}</span>
                  <span className="tweet-date">{tweet.date}</span>
                </div>
              </div>
              <div className="tweet-content">{tweet.content}</div>
              <div className="tweet-actions">
                <div className={`tweet-action ${tweet.isLiked ? 'liked' : ''}`} onClick={(e) => {
                  e.stopPropagation();
                  handleLike(tweet.id);
                }}>
                  <i className="fas fa-heart"></i>
                  <span>{tweet.likeCount || 0}</span>
                </div>
                <div className="tweet-action">
                  <i className="fas fa-comment"></i>
                  <span>{tweet.replies?.length || 0}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {isSidebarOpen && (
        <Sidebar
          tweet={selectedTweet}
          onClose={handleSidebarClose}
          onDelete={deleteTweet}
          onReply={handleReply}
          onLike={handleLike}
          onDeleteReply={deleteReply}
        />
      )}
    </div>
  );
};

export default Tweets;
