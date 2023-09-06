// App.js

import React from 'react';
import { createRoot } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store'; 
import Header from './component/Header';

import MainCard from './component/MainCard';

// Import style
import './styles/style.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <>
    <Header/>
    <MainCard/>
    </>
  </Provider>
);
