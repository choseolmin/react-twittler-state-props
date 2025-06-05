import React from 'react';
import Footer from '../Footer';
import './About.css';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  return (
    <section className="aboutTwittler">
      {/* 커버 이미지 */}
      <div className="aboutTwittler__cover">
        <img src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=cover&w=800&q=80" alt="cover" />
      </div>
      {/* 트위터 로고와 소개 */}
      <div className="aboutTwittler__logoWrap">
        <i className="fab fa-twitter aboutTwittler__logo"></i>
        <h1>Twittler에 오신 것을 환영합니다</h1>
        <p className="aboutTwittler__desc">실시간으로 전 세계와 소통하고, 생각을 나누세요.<br/>Twittler는 여러분의 이야기를 기다립니다.</p>
      </div>
      {/* 주요 기능 */}
      <div className="aboutTwittler__features">
        <div className="aboutTwittler__featureCard" style={{cursor:'pointer'}} onClick={() => navigate('/tweets')}>
          <i className="far fa-comment-dots"></i>
          <h3>실시간 트윗</h3>
          <p>여러분의 생각을 빠르게 공유하고, 친구들과 소통하세요.</p>
        </div>
        <div className="aboutTwittler__featureCard">
          <i className="far fa-bell"></i>
          <h3>알림</h3>
          <p>관심 있는 소식과 멘션을 실시간으로 받아보세요.</p>
        </div>
        <div className="aboutTwittler__featureCard" style={{cursor:'pointer'}} onClick={() => navigate('/mypage')}>
          <i className="far fa-user"></i>
          <h3>프로필</h3>
          <p>나만의 프로필을 꾸미고, 나를 표현해보세요.</p>
        </div>
      </div>
      {/* 하단 링크 */}
      <div className="aboutTwittler__links">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">트위터 공식 사이트</a>
        <span> | </span>
        <a href="mailto:support@twittler.com">문의하기</a>
      </div>
      <Footer />
    </section>
  );
};

export default About;
