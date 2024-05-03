
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
import Plans from './Pages/Dashboard/Admin/Plans';
import PlanPricing from './Pages/Home/PlanPricing';
import Payment from './Pages/Dashboard/User/Payment';
import SubscribedRoutes from './PrivateRoutes/SubscribedRoutes';
import SessionBooked from './Pages/Dashboard/User/SessionBooked';
import SessionPage from './Pages/Dashboard/User/SessionPage';
import Chat from './Components/Chat/Chat';
import ChatCounselor from './Pages/Dashboard/Counselor/ChatCounselor';
import SessionCounselor from './Pages/Dashboard/Counselor/SessionCounselor';
import CounselorPayment from './Pages/Dashboard/Counselor/CounselorPayment';
import VideoCall from './Pages/Dashboard/User/VideoCall';
import CounselorVideoCall from './Pages/Dashboard/Counselor/CounselorVideoCall';
import EndCallUser from './Pages/Dashboard/User/EndCallUser';
import EndCall from './Pages/Dashboard/Counselor/EndCall';
import ArticleCounselor from './Pages/Dashboard/Counselor/ArticleCounselor';
import NewArticle from './Pages/Dashboard/Counselor/NewArticle';
import { Toaster} from 'react-hot-toast'
import ArticleEdit from './Pages/Dashboard/Counselor/ArticleEdit';
import Articles from './Pages/Home/Articles';
import ArticleHub from './Pages/Home/ArticleHub';
import ManageArticles from './Pages/Dashboard/Admin/ManageArticles';
import PaymentProcess from './Pages/Dashboard/Admin/PaymentProcess';
import Transactions from './Pages/Dashboard/Admin/Transactions';


function App() {
  return (
    
    <BrowserRouter>
    <Toaster />
      <Routes >
        <Route path='/' element={<Home />} />
        <Route path='/counsellors' element={<CounsellorsList/>} />
        <Route path='/open-profile' element={<OpenProfile />} />
        <Route path='/plan-pricing' element={<PlanPricing />} />
        <Route path='/articles/open' element={<Articles />} />
        <Route path='/articlehub' element={<ArticleHub />} />



        <Route path='/login' element={<Unautherized><Login /></Unautherized>} />
        <Route path='/signup' element={<Unautherized><UserSignup /></Unautherized>} />
        <Route path='/counselorSignup' element={<Unautherized><CounselorSignUp /></Unautherized>} />
        <Route path='/otp' element={<Unautherized><OtpLogin /></Unautherized>} />
        <Route path='/forgotpassword' element={<Unautherized><OtpForgot /></Unautherized>} />
        <Route path='/updatepassword' element={<Unautherized><UpdatePassword /></Unautherized>} />
        
        <Route path='/user/dashboard' element={<UserRoute> <Dashboard /> </UserRoute>} />
        <Route path='/user/profile' element={<UserRoute> <Profile /> </UserRoute>} />
        <Route path='/user/counselor-slot' element={<SubscribedRoutes> <CounselorSlots /> </SubscribedRoutes>} />
        <Route path='/user/payment' element={<UserRoute> <Payment /> </UserRoute>} />
        <Route path='/user/booked' element={<UserRoute> <SessionBooked /> </UserRoute>} />
        <Route path='/user/sessions' element={<UserRoute> <SessionPage /> </UserRoute>} />
        <Route path='/user/chat' element={<UserRoute> <Chat /></UserRoute>} />
        <Route path='/user/videocall' element={<UserRoute> <VideoCall /></UserRoute>} />
        <Route path='/user/end-call' element={<UserRoute> <EndCallUser /></UserRoute>} />





        <Route path='/admin/dashboard' element={<AdminRoutes> <AdminDashboard /> </AdminRoutes>} />
        <Route path='/admin/patients' element={<AdminRoutes> <Patients /> </AdminRoutes>} />
        <Route path='/admin/counsellors' element={<AdminRoutes> <Cousellors /> </AdminRoutes>} />
        <Route path='/admin/newrequests' element={<AdminRoutes> <NewRequest /> </AdminRoutes>} />
        <Route path='/admin/request/viewprofile/:userId' element={<AdminRoutes> <ViewProfile /> </AdminRoutes>} />
        <Route path='/admin/updation-requests' element={<AdminRoutes> <UpdationRequest/> </AdminRoutes>} />
        <Route path='/admin/request/view-updation/' element={<AdminRoutes> <OpenUpdation /> </AdminRoutes>} />
        <Route path='/admin/plans/' element={<AdminRoutes><Plans /></AdminRoutes>} />
        <Route path='/admin/article/manage' element={<AdminRoutes><ManageArticles /></AdminRoutes>} />
        <Route path='/admin/payments' element={<AdminRoutes><PaymentProcess /></AdminRoutes>} />
        <Route path='/admin/transactions/counselor' element={<AdminRoutes><Transactions /></AdminRoutes>} />










        
        <Route path='/counselor/profileVerification' element={<Unverified> <Unverifiedform /> </Unverified>} />
        <Route path='/counselor/submitted' element={<Unverified> <Submitted /> </Unverified>} />



        <Route path='counselor/dashboard' element={<CounselorRoute> <CounselorDashboard /> </CounselorRoute>} />
        <Route path='counselor/time-schedule' element={<CounselorRoute> <TimeSchedule /> </CounselorRoute>} />
        <Route path='counselor/profile' element={<CounselorRoute> <CounselorProfile /> </CounselorRoute>} />
        <Route path='counselor/chat' element={<CounselorRoute> <ChatCounselor /> </CounselorRoute>} />
        <Route path='counselor/sessions' element={<CounselorRoute> <SessionCounselor /> </CounselorRoute>} />
        <Route path='counselor/payment' element={<CounselorRoute> <CounselorPayment /> </CounselorRoute>} />
        <Route path='counselor/videocall' element={<CounselorRoute> <CounselorVideoCall /> </CounselorRoute>} />
        <Route path='counselor/end-call' element={<CounselorRoute> <EndCall /> </CounselorRoute>} />
        <Route path='counselor/article' element={<CounselorRoute> <ArticleCounselor /> </CounselorRoute>} />
        <Route path='counselor/new-article' element={<CounselorRoute> <NewArticle /> </CounselorRoute>} />
        <Route path='counselor/article/edit' element={<CounselorRoute> <ArticleEdit /> </CounselorRoute>} />









      </Routes>
    </BrowserRouter>
  );
}

export default App;
