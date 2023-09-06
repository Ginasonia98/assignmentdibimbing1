import React from 'react';
import { createRoot } from 'react-dom/client';
import MainCard from './component/MainCard'; 

// Import style
import './styles/style.css';

const root = createRoot(document.getElementById('root'));
root.render(<h1><MainCard/></h1>); 
