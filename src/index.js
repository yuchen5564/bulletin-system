import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import List from './List';
import Post from './Post';
import NotFound from './NotFound';
import News from './News';
import { AuthProvider } from "./firebaseAuth/AuthProvider";
import ProtectedRoutes from "./ProtectedRoutes"; // Adjust path if necessary


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <BrowserRouter>
  <AuthProvider>
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route element={<ProtectedRoutes />}>
      <Route exact path='/list' element={<List />} />
      <Route exact path='/post' element={<Post />} />
      </Route>
      <Route exact path='/news' element={<News />} />
      {/* <Route exact path='/login' element={<Login />} /> */}
      <Route path='*' element={<NotFound />} />
    </Routes>
    </AuthProvider>
  </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
