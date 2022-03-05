import './App.css';
import React, { useState } from 'react';
import Login from './components/login/login';
import Register from './components/register/register';
import TakeInterView from './components/TakeInterview/TakeInterview'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage';
import CallPage from './components/CallPage/CallPage';

function App() {

  const [user, setLoginUser] = useState({});

  return (
    <>
      <div>

        <Router>
          <Routes>
            <Route exact path="/" element={(user && user._id) ? <LandingPage setLoginUser={setLoginUser} user={user}/> : <Login setLoginUser={setLoginUser} />} />
            {/* <Route exact path='/' element={<LandingPage setLoginUser={setLoginUser} user={user}/>} /> */}

            <Route path="/login" element={<Login setLoginUser={setLoginUser} />} />

            <Route path="/register" element={<Register />} />

            <Route path="/takeInterview" element={<TakeInterView setLoginUser={setLoginUser}/>} />
            <Route exact path="/interviewroom/:id" element={<CallPage />} />
          </Routes>
        </Router>

      </div>
    </>
  );
}

export default App;
