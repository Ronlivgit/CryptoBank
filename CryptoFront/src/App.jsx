import './App.css'
import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/home/Home';
import Navbar from './components/Navbar';
import AboutUs from './components/AboutUs';


function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/about' element={<AboutUs/>}/>
            {/* <Route path='*' element={NotFound}/> */}
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
