import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ tweet, onClose, onDelete, onReply }) => {
  const [replyContent, setReplyContent] = useState('');
  const [replies, setReplies] = useState(tweet.replies || []);

  if (!tweet) return null;

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    const newReply = {
      id: Date.now(),
      username: 'Bob', // 현재 로그인한 사용자 이름
      content: replyContent,
      createdAt: new Date().toLocaleString(),
      picture: 'https://randomuser.me/api/portraits/men/98.jpg'
    };

    setReplies([...replies, newReply]);
    setReplyContent('');
    if (onReply) {
      onReply(tweet.id, newReply);
    }
  };

  const handleDeleteReply = (replyId) => {
    setReplies(replies.filter(reply => reply.id !== replyId));
    if (onReply) {
      onReply(tweet.id, null, replyId); // replyId를 전달하여 삭제 처리
    }
  };

  return (
    <div className="sidebar__overlay">
      <div className="sidebarDetail">
        <button className="sidebar__close" onClick={onClose}>닫기</button>
        <div className="sidebar__profile">
          <img src={tweet.picture} alt="profile" />
        </div>
        <div className="sidebar__content">
          <h3>{tweet.username}</h3>
          <p>{tweet.content}</p>
          <span className="sidebar__date">{tweet.createdAt}</span>
        </div>
        <button className="sidebar__delete" onClick={() => onDelete(tweet.id)}>
          삭제
        </button>

        {/* 답글 작성 폼 */}
        <div className="sidebar__reply-form">
          <form onSubmit={handleReplySubmit}>
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="답글을 작성하세요..."
              className="sidebar__reply-input"
            />
            <button 
              type="submit" 
              className="sidebar__reply-submit"
              disabled={!replyContent.trim()}
            >
              답글 작성
            </button>
          </form>
        </div>

        {/* 답글 목록 */}
        <div className="sidebar__replies">
          <h4>답글 {replies.length}개</h4>
          {replies.map((reply) => (
            <div key={reply.id} className="sidebar__reply">
              <div className="sidebar__reply-profile">
                <img src={reply.picture} alt="profile" />
              </div>
              <div className="sidebar__reply-content">
                <div className="sidebar__reply-header">
                  <span className="sidebar__reply-username">{reply.username}</span>
                  <span className="sidebar__reply-date">{reply.createdAt}</span>
                  <button 
                    className="sidebar__reply-delete"
                    onClick={() => handleDeleteReply(reply.id)}
                  >
                    삭제
                  </button>
                </div>
                <p>{reply.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 