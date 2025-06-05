import React, { useState } from 'react'; // ✅ useState import
import Footer from '../Footer';
import Tweet from '../Components/Tweet';
import Sidebar from '../Components/Sidebar';
import './Tweets.css';
import dummyTweets from '../static/dummyData';

const Tweets = () => {
  // ✅ 상태 추가
  const [tweets, setTweets] = useState(dummyTweets);
  const [username, setUsername] = useState('Bob');
  const [message, setMessage] = useState('');
  const [selectedTweet, setSelectedTweet] = useState(null); // ✅ 선택된 트윗
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // ✅ 사이드바 상태

  // ✅ 트윗 버튼 클릭 시 트윗 추가
  const handleButtonClick = () => {
    const newTweet = {
      id: tweets.length + 1,
      username,
      content: message,
      createdAt: new Date().toLocaleString(),
      picture: 'https://randomuser.me/api/portraits/men/98.jpg',
    };

    setTweets([newTweet, ...tweets]); // 새 트윗을 위로 추가
    setMessage(''); // 메시지 초기화
  };

  // ✅ 유저 입력 변경 핸들러
  const handleChangeUser = (event) => {
    setUsername(event.target.value);
  };

  // ✅ 트윗 내용 입력 핸들러
  const handleChangeMsg = (event) => {
    setMessage(event.target.value);
  };

  // ✅ 트윗 클릭 핸들러
  const handleTweetClick = (tweet) => {
    setSelectedTweet(tweet);
    setIsSidebarOpen(true);
  };

  // ✅ 사이드바 닫기 핸들러
  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
    setSelectedTweet(null);
  };

  // ✅ 트윗 삭제 핸들러
  const handleDeleteTweet = (id) => {
    setTweets(tweets.filter((tweet) => tweet.id !== id));
    setIsSidebarOpen(false);
    setSelectedTweet(null);
  };

  return (
    <React.Fragment>
      <div className="tweetForm__container">
        <div className="tweetForm__wrapper">
          <div className="tweetForm__profile">
            <img src="https://randomuser.me/api/portraits/men/98.jpg" />
          </div>
          <div className="tweetForm__inputContainer">
            <div className="tweetForm__inputWrapper tweetForm__inputWrapper--row">
              <div className="tweetForm__input">
                <input
                  type="text"
                  value={username}
                  onChange={handleChangeUser}
                  placeholder="your username here.."
                  className="tweetForm__input--username"
                />
                {/* ✅ textarea 엘리먼트 */}
                <textarea
                  value={message}
                  onChange={handleChangeMsg}
                  placeholder="무슨 일이 일어나고 있나요?"
                  className="tweetForm__input--message"
                ></textarea>
              </div>
              {/* ✅ 트윗 전송 버튼을 오른쪽에 배치 */}
              <button
                className="tweetForm__submitButton tweetForm__submitButton--vertical"
                onClick={handleButtonClick}
                disabled={!message.trim()}
              >
                Tweet
              </button>
            </div>
            {/* ✅ 트윗 카운트는 입력창 아래로 이동 */}
            <div className="tweetForm__count" role="status">
              <span className="tweetForm__count__text">
                total: {tweets.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      <ul className="tweets">
        {/* ✅ 트윗 리스트를 동적으로 렌더링 */}
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} tweet={tweet} onClick={() => handleTweetClick(tweet)} />
        ))}
      </ul>
      {/* ✅ Sidebar 렌더링 */}
      {isSidebarOpen && (
        <Sidebar tweet={selectedTweet} onClose={handleSidebarClose} onDelete={handleDeleteTweet} />
      )}
      <Footer />
    </React.Fragment>
  );
};

export default Tweets;
