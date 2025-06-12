import React, { useState } from "react";
import "./Tweet.css";

const Tweet = ({ tweet, onLike, onReply, onDelete, onDeleteReply }) => {
  const [replyContent, setReplyContent] = useState("");
  const [showReplies, setShowReplies] = useState(false);

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (replyContent.trim()) {
      onReply(replyContent);
      setReplyContent("");
    }
  };

  return (
    <div className="tweet">
      <div className="tweet-header">
        <img src={tweet.profileImage} alt={tweet.name} className="profile-image" />
        <div className="tweet-info">
          <span className="name">{tweet.name}</span>
          <span className="username">@{tweet.username}</span>
          <span className="date">{tweet.date}</span>
        </div>
        <button className="delete-button" onClick={() => onDelete(tweet.id)}>
          삭제
        </button>
      </div>
      <p className="tweet-content">{tweet.content}</p>
      <div className="tweet-actions">
        <button
          className={`like-button ${tweet.isLiked ? "liked" : ""}`}
          onClick={() => onLike(tweet.id)}
        >
          ❤️ {tweet.likeCount}
        </button>
        <button
          className="reply-button"
          onClick={() => setShowReplies(!showReplies)}
        >
          💬 {tweet.replies.length}
        </button>
      </div>

      {showReplies && (
        <div className="replies-section">
          <form onSubmit={handleReplySubmit} className="reply-form">
            <input
              type="text"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="답글을 작성하세요..."
              className="reply-input"
            />
            <button type="submit" className="reply-submit-button">
              답글
            </button>
          </form>

          <div className="replies-list">
            {tweet.replies.map((reply) => (
              <div key={reply.id} className="reply">
                <div className="reply-header">
                  <img
                    src={reply.profileImage}
                    alt={reply.name}
                    className="reply-profile-image"
                  />
                  <div className="reply-info">
                    <span className="reply-name">{reply.name}</span>
                    <span className="reply-username">@{reply.username}</span>
                    <span className="reply-date">{reply.date}</span>
                  </div>
                  <button
                    className="delete-reply-button"
                    onClick={() => onDeleteReply(reply.id)}
                  >
                    삭제
                  </button>
                </div>
                <p className="reply-content">{reply.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tweet;
