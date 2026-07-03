import { Routes, Route } from "react-router-dom";
import Buses from "./pages/Buses";
import EVHub from "./pages/EVHub";
import Home from "./pages/Home";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/buses' element={<Buses />} />
        <Route path='/ev-hubs' element={<EVHub />} />
     </Routes>
    </div>
  )
}

export default App