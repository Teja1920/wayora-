import { Routes, Route, useLocation } from "react-router-dom";
import About from "./pages/About";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Buses from "./pages/Buses";
import EVHub from "./pages/EVHub";
import Home from "./pages/Home";

const App = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activePath={location.pathname} />
      <main className="flex-1">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/buses' element={<Buses />} />
          <Route path='/ev-hubs' element={<EVHub />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App