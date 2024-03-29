
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/LoginSignup/Login';
import Home from './Pages/Home/Home';
import UserSignup from './Pages/LoginSignup/UserSignup';
import CounselorSignUp from './Pages/LoginSignup/CounselorSignUp';
import OtpLogin from './Pages/LoginSignup/OtpLogin';
import Dashboard from './Pages/Dashboard/User/Dashboard';
import Profile from './Pages/Dashboard/User/Profile';
import OtpForgot from './Pages/LoginSignup/OtpForgot';
import UpdatePassword from './Pages/LoginSignup/UpdatePassword';
import UserRoute from './PrivateRoutes/UserRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes >
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/counselorSignup' element={<CounselorSignUp />} />
        <Route path='/otp' element={<OtpLogin />} />
        <Route path='/dashboard' element={<UserRoute>
          <Dashboard />
          </UserRoute>} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/forgotpassword' element={<OtpForgot />} />
        <Route path='/updatepassword' element={<UpdatePassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
