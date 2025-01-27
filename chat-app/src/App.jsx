import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Messages from './pages/Messages'
import Login from './pages/auth/Login'
import SignUp from './pages/auth/SignUp'
import Verification from './pages/auth/Verification'
import ProfilePage from './pages/ProfilePage'
import Layout from './layout'

function App() {

  useEffect(()=>{
    const colorMode = JSON.parse(window.localStorage.getItem('color-theme'));
  
    const className = 'dark';
  
    const bodyClass = window.document.body.classList;
  
    colorMode === 'dark' ? bodyClass.add(className) : bodyClass.remove(className)
  },[]);

  return (
    <Routes>

      {/* Redirect / to /auth/login */}
      <Route path='/' element={<Navigate to="auth/login" />} />
      {/* <Route index={true} element={<Messages />} /> */}
      <Route path='/auth/login' element={<Login />} />
      <Route path='/auth/signup' element={<SignUp />} />
      <Route path='/auth/verify' element={<Verification />} />
      <Route path='/dashboard' element={<Layout />}>
        <Route index element={<Messages />} />
        <Route path='/dashboard/profile' element={<ProfilePage />} />
      </Route>
    </Routes>
  )
}

export default App