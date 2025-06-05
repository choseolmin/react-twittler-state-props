import React from 'react';
import Footer from '../Footer';
import Tweet from '../Components/Tweet';
import './MyPage.css';
import dummyTweets from '../static/dummyData';

const MyPage = () => {
  // 현재 사용자 "Bob"의 트윗만 필터링
  const filteredTweets = dummyTweets.filter(tweet => tweet.username === 'Bob');
  const tweetCount = filteredTweets.length;
  const profile = filteredTweets[0];

  return (
    <section className="mypage">
      {/* 커버 이미지 */}
      <div className="mypage__cover">
        <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=cover&w=800&q=80" alt="cover" />
      </div>
      {/* 프로필 정보 */}
      <div className="mypage__profileWrap">
        <div className="mypage__profileImg">
          <img src={profile.picture} alt="프로필" />
        </div>
        <div className="mypage__profileInfo">
          <div className="mypage__profileName">{profile.username}</div>
          <div className="mypage__profileId">@bob</div>
          <div className="mypage__profileBio">안녕하세요! 저는 Bob입니다. 트위터 클론을 사용 중이에요.</div>
          <div className="mypage__profileStats">
            <span><b>{tweetCount}</b> 트윗</span>
            <span><b>28</b> 팔로워</span>
            <span><b>100</b> 팔로잉</span>
          </div>
        </div>
      </div>
      {/* 탭 */}
      <div className="mypage__tabs">
        <button className="active">트윗</button>
        <button disabled>답글</button>
        <button disabled>미디어</button>
        <button disabled>마음에 들어요</button>
      </div>
      {/* 트윗 리스트 */}
      <ul className="mypage__tweets">
        {filteredTweets.map((tweet) => (
          <Tweet key={tweet.id} tweet={tweet} />
        ))}
      </ul>
      <Footer />
    </section>
  );
};

export default MyPage;
