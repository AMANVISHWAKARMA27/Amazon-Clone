import Navbar from "./components/header/Navbar";
import "./index.css"
import Newnav from "./components/newNavbar/Newnav";
import Maincomponent from "./components/home/Maincomponent";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <>
      <Navbar/>
      <Newnav/>
      <Maincomponent/>
      <Footer/>
    </>
  );
}

export default App;
