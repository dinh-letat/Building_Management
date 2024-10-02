import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from '../../component/users/header/Header'
import Signin from '../Form/Signin'
import Signup from '../Form/Signup'
import Home from '../../component/users/home/Home'
import About from '../../component/users/about-us/About'


const User = () => {
  return (
    <div className='user-page bg-hidden'>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />

          <Route path='/' element={<Home />} />
          <Route path='/about-us' element={<About/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default User