import React, { useState } from 'react';
import Tweet from '../Components/Tweet';
import Sidebar from '../Components/Sidebar';
import { useNotifications } from '../context/NotificationContext';
import './Tweets.css';
import dummyTweets from '../static/dummyData';

const Tweets = () => {
  const [tweets, setTweets] = useState(dummyTweets);
  const [message, setMessage] = useState('');
  const [selectedTweet, setSelectedTweet] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { addNotification } = useNotifications();

  // 트윗 버튼 클릭 시 트윗 추가
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newTweet = {
        id: Date.now(),
        username: 'Bob',
        content: message,
        createdAt: new Date().toLocaleString(),
        picture: 'https://randomuser.me/api/portraits/men/98.jpg',
        isLiked: false,
        likeCount: 0,
        replies: []
      };

      setTweets([newTweet, ...tweets]);
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

  // 트윗 삭제 핸들러
  const handleDeleteTweet = (id) => {
    setTweets(tweets.filter(tweet => tweet.id !== id));
    setIsSidebarOpen(false);
    setSelectedTweet(null);
  };

  // 답글 핸들러
  const handleReply = (tweetId, reply, replyIdToDelete) => {
    setTweets(tweets.map(tweet => {
      if (tweet.id === tweetId) {
        if (replyIdToDelete) {
          // 답글 삭제
          return {
            ...tweet,
            replies: tweet.replies.filter(reply => reply.id !== replyIdToDelete)
          };
        } else {
          // 답글 추가
          return {
            ...tweet,
            replies: [...(tweet.replies || []), reply]
          };
        }
      }
      return tweet;
    }));
  };

  // 좋아요 핸들러
  const handleLike = (id) => {
    setTweets(tweets.map(tweet => {
      if (tweet.id === id) {
        const isLiked = !tweet.isLiked;
        const likeCount = isLiked ? (tweet.likeCount || 0) + 1 : (tweet.likeCount || 1) - 1;
        
        // 자신의 트윗에 좋아요를 누를 때만 알림 추가
        if (isLiked && tweet.username === 'Bob') {
          addNotification({
            id: Date.now(),
            type: 'like',
            user: 'Bob',
            content: `님이 회원님의 트윗을 좋아합니다.`,
            time: '방금 전',
            tweetId: id
          });
        }
        
        return { ...tweet, isLiked, likeCount };
      }
      return tweet;
    }));
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
                  src={tweet.picture}
                  alt={tweet.username}
                  className="tweet-user-image"
                />
                <div className="tweet-user-info">
                  <span className="tweet-username">{tweet.username}</span>
                  <span className="tweet-date">{tweet.createdAt}</span>
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
          onDelete={handleDeleteTweet}
          onReply={handleReply}
          onLike={handleLike}
        />
      )}
    </div>
  );
};

export default Tweets;
