import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout//Landing';
import AppRoutes from './components/routing/AppRoutes';

import './App.css';

import setAuthToken from './utils/setAuthToken';
import { useDispatch } from 'react-redux';
import { loadUser } from './redux/thunks/authThunks';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () =>{ 
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <Fragment>
        <Navbar />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/*' element={<AppRoutes />} />
        </Routes>
      </Fragment>
    </Router>
  )
};

export default App;