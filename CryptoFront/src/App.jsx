import './App.css'
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/home/Home';
import Navbar from './components/Navbar';
import AboutUs from './components/AboutUs';
import { useSelector } from 'react-redux';
import AuthForm from './pages/auth/auth';
import CardPage from './pages/card/Card';


function App() {
  const user = useSelector((state)=> state.user)

  useEffect(()=>{
    if(user&&user.user){
      console.log("if");
    }
    else{
      console.log("else");
    }
  },[user])

  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>
          <Routes>
            {user && user.user?
            <>
            {/* HomePage of logged in will be Dashboard. */}
              <Route path='/' element={<HomePage/>}/>
              <Route path='/card' element={<CardPage/>}/>
              <Route path='/about' element={<AboutUs/>}/>
            </>
            :
            <>
              <Route path='/' element={<AuthForm/>}/>
            </>}
            {/* <Route path='*' element={NotFound}/> */}
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
