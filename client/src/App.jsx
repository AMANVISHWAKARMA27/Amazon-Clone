import Navbar from "./components/header/Navbar";
import "./index.css"
import Newnav from "./components/newNavbar/Newnav";
import Maincomponent from "./components/home/Maincomponent";
import Footer from "./components/footer/Footer";
import Signin from "./components/Signup_signin/Signin";
import Signup from "./components/Signup_signin/Signup";
import { Routes, Route } from "react-router-dom";
import ForgotPassword from "./components/Signup_signin/ForgotPassword";

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
      </Routes>
      <Footer />
    </>
  );
}

export default App;
