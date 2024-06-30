import Navbar from "./components/header/Navbar";
import "./index.css"
import Newnav from "./components/newNavbar/Newnav";
import Maincomponent from "./components/home/Maincomponent";
import Footer from "./components/footer/Footer";
import Signin from "./components/Signup_signin/Signin";
import Signup from "./components/Signup_signin/Signup";
import { Routes, Route } from "react-router-dom";
import ForgotPassword from "./components/Signup_signin/ForgotPassword";
import Cart from "./components/cart/Cart";
import Buynow from "./components/buynow/Buynow";
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from "react";

function App() {

  const [data, setData] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setData(true)
    }, 2000)
  })
  return (
    <>
    {
      data ? (<>
      <Navbar />
      <Newnav />
      <Routes>
        <Route path="https://amazon-clone-1-rwc2.onrender.com/" element={<Maincomponent />} />
        <Route path="https://amazon-clone-1-rwc2.onrender.com/login" element={<Signin />} />
        <Route path="https://amazon-clone-1-rwc2.onrender.com/register" element={<Signup />} />
        <Route path="https://amazon-clone-1-rwc2.onrender.com/forgotpassword" element={<ForgotPassword />} />
        <Route path="https://amazon-clone-1-rwc2.onrender.com/getproductsone/:id" element={<Cart />} />
        <Route path="https://amazon-clone-1-rwc2.onrender.com/buynow" element={<Buynow />} />
      </Routes>
      <Footer /></>): (
        <div className="circle">
          <CircularProgress/>
          <h2>Loading</h2>
        </div>
      )
    }
      
    </>
  );
}

export default App;
