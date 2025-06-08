import React, { useEffect } from 'react';
import { useNotifications } from '../context/NotificationContext';
import './AlarmPage.css';

const AlarmPage = () => {
  const { notifications, removeNotification, addNotification } = useNotifications();

  useEffect(() => {
    // 기본 알림 추가
    if (notifications.length === 0) {
      const defaultNotifications = [
        {
          id: 1,
          user: 'Alice',
          content: '님이 회원님의 트윗을 좋아합니다',
          time: '2시간 전',
          userImage: 'https://randomuser.me/api/portraits/women/1.jpg'
        },
        {
          id: 2,
          user: 'Charlie',
          content: '님이 회원님의 트윗을 좋아합니다',
          time: '5시간 전',
          userImage: 'https://randomuser.me/api/portraits/men/2.jpg'
        },
        {
          id: 3,
          user: 'David',
          content: '님이 회원님의 트윗을 좋아합니다',
          time: '1일 전',
          userImage: 'https://randomuser.me/api/portraits/men/3.jpg'
        }
      ];

      defaultNotifications.forEach(notification => {
        addNotification(notification);
      });
    }
  }, []);

  return (
    <div className="alarm-page">
      <h2>알림</h2>
      {notifications.length > 0 ? (
        <div className="alarm-list">
          {notifications.map((notification) => (
            <div key={notification.id} className="alarm-item">
              <div className="alarm-content">
                <img
                  src={notification.userImage}
                  alt={notification.user}
                  className="alarm-user-image"
                />
                <div>
                  <div className="alarm-text">
                    <span className="alarm-user">{notification.user}</span>
                    {notification.content}
                  </div>
                  <div className="alarm-time">{notification.time}</div>
                </div>
              </div>
              <button
                className="alarm-confirm-button"
                onClick={() => removeNotification(notification.id)}
              >
                확인
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-alarms">새로운 알림이 없습니다</div>
      )}
    </div>
  );
};

export default AlarmPage; 