import React, { useState } from 'react'
import { Navbar } from './components/Navbar/Navbar'
import { Route, Routes, useSearchParams } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Place_Order from './pages/Place order/Place_Order'
import Footer from './components/Footer/Footer'
import LoginPopUp from './components/LoginPopUp/LoginPopUp'
const App = () => {
  const [showLogin,setShowLogin] = useState(false);
  return (
    // cant return two at a time so we add fragments <></>
    <>
    {showLogin?<LoginPopUp setShowLogin={setShowLogin} />:<></>}
    <div className='app'>
       {/* <Navbar></Navbar> */}
       <Navbar setShowLogin= {setShowLogin}/>
       <Routes>
        <Route path='/' element = {<Home/>}></Route>
        <Route path='/cart' element = {<Cart/>}></Route>
        <Route path='/order' element = {<Place_Order/>}></Route>
       </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App
