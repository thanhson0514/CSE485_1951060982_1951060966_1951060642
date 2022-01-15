import React, { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';

import Auth from './pages/Auth';
import Home from './pages/Home';
import Page404 from './pages/Page404';
import AuthState from './context/auth/AuthState';
import PostState from './context/post/PostState';
import User from './pages/User';

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <AuthState>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <PostState>
                  <Home />
                </PostState>
              }
            />
            <Route path="/login" element={<Auth />} exact />
            <Route path="/register" element={<Auth />} exact />
            <Route path="*" element={<Page404 />} />
            <Route path="/user" element={<User />} exact />
          </Routes>
        </AuthState>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
