import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";

//- - - - - - - -PAGES- - - - - - - -\\
import App from './pages/Home/Home';
import Cadastro from './pages/Cadastro/Cadastro';

const routing = (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>} />
      <Route path="/Cadastro" element={<Cadastro/>} />
    </Routes>
  </BrowserRouter>
)
ReactDOM.render(routing, document.getElementById('root'));
reportWebVitals();