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

function App() {
  return (
    <>
      <Navbar />
      <Newnav />
      <Routes>
        <Route path="/" element={<Maincomponent />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/getproductsone/:id" element={<Cart />} />
        <Route path="/buynow" element={<Buynow />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
