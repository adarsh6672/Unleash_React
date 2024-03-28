
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/LoginSignup/Login';
import Home from './Pages/Home/Home';
import UserSignup from './Pages/LoginSignup/UserSignup';
import CounselorSignUp from './Pages/LoginSignup/CounselorSignUp';
import OtpLogin from './Pages/LoginSignup/OtpLogin';
import Dashboard from './Pages/Dashboard/Dashboard';
import Profile from './Pages/Dashboard/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes >
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/counselorSignup' element={<CounselorSignUp />} />
        <Route path='/otp' element={<OtpLogin />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
