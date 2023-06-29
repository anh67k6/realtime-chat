import { Route, Routes } from "react-router-dom";
import "./App.css";
import ChatPage from "./pages/chat/ChatPage";
import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/singup/SignupPage";
import { PageRoute } from "./common/constants";
import Room from "./features/chat/components/VideoCall/Room";
import CreateRoom from "./features/chat/components/VideoCall/CreateRoom";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route exact path={PageRoute.HOME_PAGE} element={<ChatPage/>} />
        <Route exact path={PageRoute.CHAT_PAGE} element={<ChatPage />} />
        <Route exact path={PageRoute.LOGIN_PAGE} element={<LoginPage />} />
        <Route exact path={PageRoute.SIGNUP_PAGE} element={<SignupPage />} />
        <Route exact path={"/create-room"} element={<CreateRoom />} />
        <Route exact path={"/room/:roomID"} element={<Room />} />
      </Routes>
    </div>
  );
}

export default App;
