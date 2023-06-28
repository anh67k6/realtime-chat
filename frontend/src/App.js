import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/pages/login/Login.js";
import Signup from './components/pages/signup/Signup.js' 

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
      ,
    </div>
  );
}

export default App;
