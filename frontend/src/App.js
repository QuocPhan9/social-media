
import { Outlet, Navigate, Route, Routes, useLocation} from "react-router-dom";
import { Login,Home,Profile, Register, ResetPassword } from './pages';
import { useSelector } from "react-redux";
import Friend from "./pages/FriendPage/Friend";
import NotFound from "./pages/NotFound/NotFound";
import Message from "./pages/Messenger/Message";
import Suggestions from "./pages/FriendPage/Suggestions"
import Requests from "./pages/FriendPage/Requests"
import Notification from "./pages/Notification/Notification";

function Layout(){
  const {user} = useSelector(state => state.user);
  const location = useLocation();

  return user?.token ? (
    <Outlet />
  ): (
    <Navigate to="/login" state={{from:location}} replace/>
  )
} 


function App() {
  const {theme} = useSelector((state) => state.theme);

  return (
    <div data-theme={theme}  className="w-full min-h-[100vh] ">
      <Routes>
        <Route element={<Layout/>}>
          <Route path='/' element={<Home />}/>
          <Route path='/profile/:id?' element={<Profile />}/>
          <Route path='/friends' element={<Friend />}/>
          <Route path='/friends/suggestions' element={<Suggestions />}/>
          <Route path='/friends/requests' element={<Requests />}/>
          <Route path="/notifications" element={<Notification/>} />
          <Route path="/message/:id?" element={<Message/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Route>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/reset-password' element={<ResetPassword />}/>
      </Routes>
    </div>
  );
}

export default App;
