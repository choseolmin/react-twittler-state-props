import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // ✅ 올바른 Router import

import Sidebar from './Sidebar';
import Tweets from './Pages/Tweets';
import MyPage from './Pages/MyPage';
import About from './Pages/About';

import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <main>
          <Sidebar />
          <section className="features">
            <Routes>
              <Route path="/" element={<Tweets />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </section>
        </main>
      </div>
    </BrowserRouter>
  );
};

// ! 아래 코드는 수정하지 않습니다.
export default App;
