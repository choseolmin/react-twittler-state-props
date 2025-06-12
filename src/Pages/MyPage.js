import React, { useState } from 'react';
import Footer from '../Footer';
import Tweet from '../Components/Tweet';
import './MyPage.css';
import { useTweet } from '../context/TweetContext';

const MyPage = () => {
  const [activeTab, setActiveTab] = useState('tweets');
  const { tweets } = useTweet();

  // 내가 작성한 트윗만 필터링
  const myTweets = tweets.filter((tweet) => tweet.username === 'Bob');
  const tweetCount = myTweets.length;

  // 내가 작성한 답글만 필터링
  const myReplies = tweets.reduce((acc, tweet) => {
    const myRepliesInTweet = tweet.replies
      .filter((reply) => reply.username === 'Bob')
      .map((reply) => ({
        ...reply,
        parentTweet: {
          id: tweet.id,
          content: tweet.content,
          username: tweet.username,
        },
      }));
    return [...acc, ...myRepliesInTweet];
  }, []);

  const renderContent = () => {
    if (activeTab === 'tweets') {
      return (
        <ul className="mypage__tweets">
          {myTweets.map((tweet) => (
            <li key={tweet.id} className="mypage__tweet">
              <div className="mypage__tweet-header">
                <img
                  src={tweet.profileImage}
                  alt={tweet.name}
                  className="mypage__profile-image"
                />
                <div className="mypage__tweet-info">
                  <span className="mypage__name">{tweet.name}</span>
                  <span className="mypage__username">@{tweet.username}</span>
                </div>
              </div>
              <p className="mypage__tweet-content">{tweet.content}</p>
              <div className="mypage__tweet-footer">
                <span className="mypage__tweet-date">{tweet.date}</span>
                <div className="mypage__tweet-stats">
                  <span className="mypage__tweet-stat">
                    <i className="fas fa-heart"></i> {tweet.likeCount}
                  </span>
                  <span className="mypage__tweet-stat">
                    <i className="fas fa-comment"></i> {tweet.replies.length}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      );
    } else if (activeTab === 'replies') {
      return (
        <ul className="mypage__replies">
          {myReplies.map((reply) => (
            <li key={reply.id} className="mypage__reply">
              <div className="mypage__reply-header">
                <img
                  src={reply.profileImage}
                  alt={reply.name}
                  className="mypage__profile-image"
                />
                <div className="mypage__reply-info">
                  <span className="mypage__name">{reply.name}</span>
                  <span className="mypage__username">@{reply.username}</span>
                </div>
              </div>
              <p className="mypage__reply-content">{reply.content}</p>
              <div className="mypage__reply-footer">
                <span className="mypage__reply-date">{reply.date}</span>
                <div className="mypage__reply-parent">
                  <span>답글 작성: </span>
                  <span className="mypage__reply-parent-content">
                    {reply.parentTweet.content}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      );
    }
    return null;
  };

  return (
    <section className="mypage">
      {/* 커버 이미지 */}
      <div className="mypage__cover">
        <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=cover&w=800&q=80" alt="cover" />
      </div>
      {/* 프로필 정보 */}
      <div className="mypage__profileWrap">
        <div className="mypage__profileImg">
          <img src={myTweets[0]?.profileImage || "https://picsum.photos/200"} alt="프로필" />
        </div>
        <div className="mypage__profileInfo">
          <div className="mypage__profileName">Bob</div>
          <div className="mypage__profileId">@bob</div>
          <div className="mypage__profileBio">안녕하세요! 저는 Bob입니다. 트위터 클론을 사용 중이에요.</div>
          <div className="mypage__profileStats">
            <span><b>{tweetCount}</b> 트윗</span>
            <span><b>{myReplies.length}</b> 답글</span>
          </div>
        </div>
      </div>
      {/* 탭 */}
      <div className="mypage__tabs">
        <button
          className={activeTab === 'tweets' ? 'active' : ''} 
          onClick={() => setActiveTab('tweets')}
        >
          트윗
        </button>
        <button
          className={activeTab === 'replies' ? 'active' : ''} 
          onClick={() => setActiveTab('replies')}
        >
          답글
        </button>
        <button disabled>미디어</button>
        <button disabled>마음에 들어요</button>
      </div>
      {/* 컨텐츠 */}
      {renderContent()}
      <Footer />
    </section>
  );
};

export default MyPage;

