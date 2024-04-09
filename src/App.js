
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
import Unverified from './PrivateRoutes/Unverified';
import Unverifiedform from './Pages/Dashboard/Unverified/Unverifiedform';
import CounselorRoute from './PrivateRoutes/CounselorRoute';
import CounselorDashboard from './Pages/Dashboard/Counselor/CounselorDashboard';
import AdminRoutes from './PrivateRoutes/AdminRoutes';
import AdminDashboard from './Pages/Dashboard/Admin/AdminDashboard';
import Patients from './Pages/Dashboard/Admin/Patients';
import Cousellors from './Pages/Dashboard/Admin/Cousellors';
import Unautherized from './PrivateRoutes/Unautherized';
import NewRequest from './Pages/Dashboard/Admin/NewRequest';
import ViewProfile from './Pages/Dashboard/Admin/ViewProfile';
import CounsellorsList from './Pages/Home/CounsellorsList';
import Submitted from './Pages/Dashboard/Unverified/Submitted';
import OpenProfile from './Pages/Home/OpenProfile';
import TimeSchedule from './Pages/Dashboard/Counselor/TimeSchedule';
import CounselorSlots from './Pages/Dashboard/User/CounselorSlots';
import CounselorProfile from './Pages/Dashboard/Counselor/CounselorProfile';
import UpdationRequest from './Pages/Dashboard/Admin/UpdationRequest';
import OpenUpdation from './Pages/Dashboard/Admin/OpenUpdation';


function App() {
  return (
    <BrowserRouter>
      <Routes >
        <Route path='/' element={<Home />} />
        <Route path='/counsellors' element={<CounsellorsList/>} />
        <Route path='/open-profile' element={<OpenProfile />} />

        <Route path='/login' element={<Unautherized><Login /></Unautherized>} />
        <Route path='/signup' element={<Unautherized><UserSignup /></Unautherized>} />
        <Route path='/counselorSignup' element={<Unautherized><CounselorSignUp /></Unautherized>} />
        <Route path='/otp' element={<Unautherized><OtpLogin /></Unautherized>} />
        <Route path='/forgotpassword' element={<Unautherized><OtpForgot /></Unautherized>} />
        <Route path='/updatepassword' element={<Unautherized><UpdatePassword /></Unautherized>} />
        
        <Route path='/user/dashboard' element={<UserRoute> <Dashboard /> </UserRoute>} />
        <Route path='/user/profile' element={<UserRoute> <Profile /> </UserRoute>} />
        <Route path='/user/counselor-slot' element={<UserRoute> <CounselorSlots /> </UserRoute>} />


        <Route path='/admin/dashboard' element={<AdminRoutes> <AdminDashboard /> </AdminRoutes>} />
        <Route path='/admin/patients' element={<AdminRoutes> <Patients /> </AdminRoutes>} />
        <Route path='/admin/counsellors' element={<AdminRoutes> <Cousellors /> </AdminRoutes>} />
        <Route path='/admin/newrequests' element={<AdminRoutes> <NewRequest /> </AdminRoutes>} />
        <Route path='/admin/request/viewprofile/:userId' element={<AdminRoutes> <ViewProfile /> </AdminRoutes>} />
        <Route path='/admin/updation-requests' element={<AdminRoutes> <UpdationRequest/> </AdminRoutes>} />
        <Route path='/admin/request/view-updation/' element={<AdminRoutes> <OpenUpdation /> </AdminRoutes>} />





        
        <Route path='/counselor/profileVerification' element={<Unverified> <Unverifiedform /> </Unverified>} />
        <Route path='/counselor/submitted' element={<Unverified> <Submitted /> </Unverified>} />



        <Route path='counselor/dashboard' element={<CounselorRoute> <CounselorDashboard /> </CounselorRoute>} />
        <Route path='counselor/time-schedule' element={<CounselorRoute> <TimeSchedule /> </CounselorRoute>} />
        <Route path='counselor/profile' element={<CounselorRoute> <CounselorProfile /> </CounselorRoute>} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
