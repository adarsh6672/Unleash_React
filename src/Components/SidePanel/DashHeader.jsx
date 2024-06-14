import { Link } from 'react-router-dom'
import logo from './../../Assets/imgs/logo.png'
import { IoLogOut } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../../Redux/Slice/AuthSlice';
import { useNavigate } from 'react-router-dom'


function DashHeader() {
    const userData = useSelector(state => state.userData.userData)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(userLogout());
        navigate("/")
    }

    return (
        <>
         <div className=' fixed w-lvw  bg-white min-h-24'></div>
            <div className='min-h-24 sm:grid gap-4 fixed sm:sticky grid-cols-12  bg-white'>

                <div className='col-span-6 sm:col-span-2'>
                    <Link to="/">
                        <img
                            className="mx-auto h-20 w-auto"
                            src={logo}
                            alt="Unleash"
                        />
                    </Link>

                </div>
                <div className='hidden sm:block sm:col-span-8'>

                    <div className='text-end font-bold text-indigo-800 pt-7 text-xl'>
                        <span >{userData.fullname} </span>

                    </div>
                </div>

                <div className='hidden sm:block sm:col-span-2 '>
                    <div className='flex justify-evenly pt-6'>
                        {/* <Link to="/notification" className='text-4xl text-orange-500'>
                            <IoMdNotifications />
                        </Link> */}
                        <div className='text-4xl text-orange-500 cursor-pointer' onClick={logout}>
                            <IoLogOut />
                        </div>

                    </div>
                </div>

            </div>
            <div className='sm:hidden min-h-24  gap-4   grid-cols-12  bg-white'>

            </div>
           
        </>
    )
}

export default DashHeader