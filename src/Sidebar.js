import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <section className="sidebar">
      {/* About(홈) 링크 - 가장 위 */}
      <Link to="/">
        <i className="far fa-question-circle"></i>
      </Link>
      {/* Tweets 링크 */}
      <Link to="/tweets">
        <i className="far fa-comment-dots"></i>
      </Link>
      {/* MyPage 링크 */}
      <Link to="/mypage">
        <i className="far fa-user"></i>
      </Link>
    </section>
  );
};

export default Sidebar;
