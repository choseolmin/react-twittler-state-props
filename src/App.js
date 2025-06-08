import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // ✅ 올바른 Router import
import { NotificationProvider } from './context/NotificationContext';
import { TweetProvider } from './context/TweetContext';

import Sidebar from './Sidebar';
import Tweets from './Pages/Tweets';
import MyPage from './Pages/MyPage';
import About from './Pages/About';
import AlarmPage from './Pages/AlarmPage';

import './App.css';

const App = () => {
  return (
    <NotificationProvider>
      <TweetProvider>
        <BrowserRouter>
          <div className="App">
            <main>
              <Sidebar />
              <section className="features">
                <Routes>
                  <Route path="/" element={<About />} />
                  <Route path="/tweets" element={<Tweets />} />
                  <Route path="/mypage" element={<MyPage />} />
                  <Route path="/alarm" element={<AlarmPage />} />
                </Routes>
              </section>
            </main>
          </div>
        </BrowserRouter>
      </TweetProvider>
    </NotificationProvider>
  );
};

// ! 아래 코드는 수정하지 않습니다.
export default App;
