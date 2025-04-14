// App.js - Make sure the import path is correct
import React, { useState } from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Place_Order from './pages/Place order/Place_Order';
import Footer from './components/Footer/Footer';
import LoginPopUp from './components/LoginPopUp/LoginPopUp';
import { FoodInfoItems } from './components/FoodInfoItems';
import { FoodChatbot } from './components/FoodChatbot';
import { NutritionFetcher } from './components/CalorieEstimation';
import { Video } from './components/CookingVideos';
import { Payment } from './components/Payment/Payment';
import { OrderConfirmation } from './components/OrderConfirmation/OrderConfirmation';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      {showLogin ? <LoginPopUp setShowLogin={setShowLogin} /> : <></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Food chatbot' element={<FoodChatbot />} />
          <Route path='/Calorie estimation' element={<NutritionFetcher />} />
          <Route path='/Cooking info' element={<Video />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<Place_Order />} />
          <Route path='/foodinfo' element={<FoodInfoItems />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/order-confirmation' element={<OrderConfirmation />} />
          {/* Add a route for track-order if you have that component */}
          {/* <Route path='/track-order' element={<TrackOrder />} /> */}
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;