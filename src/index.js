import React from 'react';
import { createRoot } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store'; 
import Header from './component/Header';
import Footer from './component/footer'; 
import MainCard from './component/MainCard';

// Import style
import './styles/style.css'; 

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <div className='flex flex-col h-screen'> 
      <Header />
      <div className='flex-grow'> 
        <MainCard />
      </div>
      <Footer className='mt-auto' /> 
    </div>
  </Provider>
);
