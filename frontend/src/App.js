import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/pages/login/Login.js";
import Signup from './components/pages/signup/Signup.js' 
import HomePage from "./components/pages/home/Home.js";
import ChatPage from "./components/pages/chat/Chat.js";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
      ,
    </div>
  );
}

export default App;
