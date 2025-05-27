import React from 'react';
import Footer from '../Footer';
import Tweet from '../Components/Tweet';
import './MyPage.css';
import dummyTweets from '../static/dummyData';

const MyPage = () => {
  // ✅ 현재 사용자 "Bob"의 트윗만 필터링
  const filteredTweets = dummyTweets.filter(tweet => tweet.username === 'Bob');

  return (
    <section className="myInfo">
      <div className="myInfo__container">
        <div className="myInfo__wrapper">
          <div className="myInfo__profile">
            {/* ✅ Bob의 첫 번째 트윗에서 사진 가져오기 */}
            <img src={filteredTweets[0].picture} alt="Bob의 프로필" />
          </div>
          <div className="myInfo__detail">
            <p className="myInfo__detailName">
              {filteredTweets[0].username} Profile
            </p>
            <p>28 팔로워 100 팔로잉</p>
          </div>
        </div>
      </div>

      {/* ✅ 트윗 리스트 */}
      <ul className="tweets__mypage">
        {filteredTweets.map((tweet) => (
          <Tweet key={tweet.id} tweet={tweet} />
        ))}
      </ul>

      <Footer />
    </section>
  );
};

export default MyPage;
