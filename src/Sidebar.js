import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <section className="sidebar">
      {/* Tweets 링크 */}
      <Link to="/">
        <i className="far fa-comment-dots"></i>
      </Link>

      {/* About 링크 */}
      <Link to="/about">
        <i className="far fa-question-circle"></i>
      </Link>

      {/* MyPage 링크 */}
      <Link to="/mypage">
        <i className="far fa-user"></i>
      </Link>
    </section>
  );
};

export default Sidebar;
