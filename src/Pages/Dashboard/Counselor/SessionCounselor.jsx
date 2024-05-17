import React, { useEffect, useState } from 'react'
import DashHeader from '../../../Components/SidePanel/DashHeader'
import CounselorSidebar from '../../../Components/SidePanel/CounselorSidebar'
import { AxiosInstance } from '../../../Utils/AxiosInstance'
import img from '../../../Assets/imgs/Frame-11-768x479.webp'
import moment from 'moment'
import SessionBooked from '../User/SessionBooked';
import { useNavigate } from 'react-router-dom'

function SessionCounselor() {
    const [bookings, setBookings] = useState([]);
    const [TABLE_ROWS, setTableRows] = useState([]);
    const TABLE_HEAD = ['NAME', 'PHONE', 'SCHEDULED ON', 'VIEW', 'STATUS']
    const [now, setNow] = useState(true)
    const [matchingSlot , setMatchingSlot] = useState()
    const navigate = useNavigate();

    useEffect(() => {
        AxiosInstance.get('/consultation/session/get-allbookings-ofcounselor')
            .then(res => {
                console.log(res.data)
                setBookings(res.data)

                const matchingSlots = res.data.map(item => 
                    isSlotWithinOneHour(item.sessionBooking.avilability.slot)? item : null
                ).filter(Boolean); // Filter out null values
                
                // Then, check if there are any matching slots and update your state
                if (matchingSlots.length > 0) {
                    setMatchingSlot(matchingSlots[0]); // Or however you want to handle multiple matching slots
                }

                // Set matching slots
                
                console.log(matchingSlots)
               
            })
            .catch(err => console.log(err))
    }, [])

    const isSlotWithinOneHour = (slotTime) => {


        const slotTimeObj = moment(slotTime, 'YYYY-MM-DDTHH:mm:ss');

        const currentTime = moment();
        const differenceInHours = slotTimeObj.diff(currentTime, 'minutes');

        return Math.abs(differenceInHours) >= -60 && Math.abs(differenceInHours) <= 0;
    };

    function formatTime(timeString) {
        const date = new Date(timeString);
        const options = { hour: "2-digit", minute: "2-digit", hour12: true };
        const formattedTime = date.toLocaleString("en-US", options);
        return formattedTime;
    }

    function formatDate(timeString) {
        const date = new Date(timeString);
        const options = { month: "long", day: "numeric", year: "numeric" };
        const formattedDate = date.toLocaleDateString("en-US", options);
        return formattedDate;
    }

    function isItToday(dateString) {
        const date = new Date(dateString);
        const today = new Date();
        if (date.getDate() == today.getDate()) {
            return true
        }
        return false;
    }
   

    const handleSession = (id) => {
        navigate('/counselor/videocall', { state: id })
    }
    return (
        <>
            <DashHeader />
            <div className='flex gap-3'>
                <CounselorSidebar />
                <div className='sm:w-full  p-4 '>
                    <div>
                        <h1 className='text-orange-500 font-bold text-center text-2xl'>Sheduled Bookings</h1>
                        <div className='w-2/3 border-2 border-slate-100 shadow-lg shadow-slate-300 rounded-lg mx-auto m-5 flex justify-around'>
                            <img className='h-2/6 w-2/6 opacity-45' src={img} alt="images" />
                            <div className=' text-indigo-900 text-center rounded-lg my-auto h-fit'>
                                {/* {bookings && bookings.map((booking) => (
                                     (isSlotWithinOneHour(booking.sessionBooking.avilability.slot))?(
                                        <div>
                                                <h1 className='pt-5 font-bold text-2xl text-indigo-800'>{booking.userDto.fullname}</h1>
                                                <h1 className='py-5  text-indigo-800'>Time : {formatTime(booking.sessionBooking.avilability.slot)}</h1>
                                                <button className='bg-orange-500 p-2 rounded-lg text-white'>Start Now</button>
                                            </div>
                                     ):(
                                        <div></div>
                                     ) 
    
                                )
                                )} */}

                                {matchingSlot && (
                                    <div>
                                        <h1 className='pt-5 font-bold text-2xl text-indigo-800'>{matchingSlot.userDto.fullname}</h1>
                                                <h1 className='py-5  text-indigo-800'>Time : {formatTime(matchingSlot.sessionBooking.avilability.slot)}</h1>
                                                <button className='bg-orange-500 p-2 rounded-lg text-white'>Start Now</button>
                                    </div>
                                )}
                                {now && (
                                    <div>
                                        <h1 className='text-2xl font-bold text-indigo-800'>NO SESSION ON THIS TIME ..!</h1>
                                    </div>
                                )}

                            </div>
                        </div>
                        <h1 className=' text-xl font-bold text-orange-500 p-5'>Todays Bookings</h1>
                        <div className='max-h-[20rem] overflow-y-auto scrollbar-hide'>
                            <table className="w-full min-w-max px-3 table-auto text-center ">
                                <thead>
                                    <tr>
                                        {TABLE_HEAD && TABLE_HEAD.map((head) => (
                                            <th key={head} className="border-b border-blue-gray-100 bg-orange-200  p-4">
                                                <div
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal leading-none opacity-70"
                                                >
                                                    {head}
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className=''>
                                    {bookings.map((booking, index) => (
                                        isItToday(booking.sessionBooking.avilability.slot) && (
                                            <tr key={booking.sessionBooking.id} className="even:bg-blue-gray-50/50">
                                                <td className="p-4">
                                                    <div variant="small" color="blue-gray" className="font-normal">
                                                        {booking.userDto.fullname}
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <div variant="small" color="blue-gray" className="font-normal">
                                                        {booking.userDto.phone}
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <div variant="small" color="blue-gray" className="font-normal">
                                                        {formatTime(booking.sessionBooking.avilability.slot)}
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <div className="font-medium text-orange-500" onClick={() => handleSession(booking.userDto.id)}>
                                                        view
                                                    </div>
                                                </td>
                                                <td className="p-4 ">
                                                    <div as="a" href="#" variant="small" color="blue-gray" className="font-medium text-indigo-900">
                                                        {booking.sessionBooking.status}
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    ))}

                                </tbody>
                            </table>
                        </div>

                        <h1 className=' text-xl font-bold text-orange-500 p-5'>All Other Bookings</h1>
                        <div className='max-h-[20rem] overflow-y-auto scrollbar-hide'>
                            <table className="w-full min-w-max px-3 table-auto text-center ">
                                <thead>
                                    <tr>
                                        {TABLE_HEAD && TABLE_HEAD.map((head) => (
                                            <th key={head} className="border-b border-blue-gray-100 bg-orange-200  p-4">
                                                <div
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal leading-none opacity-70"
                                                >
                                                    {head}
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className=''>
                                    {bookings.map((booking, index) => (
                                        !isItToday(booking.sessionBooking.avilability.slot) && (
                                            <tr key={booking.sessionBooking.id} className="even:bg-blue-gray-50/50">
                                                <td className="p-4">
                                                    <div variant="small" color="blue-gray" className="font-normal">
                                                        {booking.userDto.fullname}
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <div variant="small" color="blue-gray" className="font-normal">
                                                        {booking.userDto.phone}
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <div variant="small" color="blue-gray" className="font-normal">
                                                        {formatDate(booking.sessionBooking.avilability.slot)} - {formatTime(booking.sessionBooking.avilability.slot)}
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <div className="font-medium text-orange-500 cursor-pointer" onClick={() => handleSession(booking.userDto.id)}>
                                                        view
                                                    </div>
                                                </td>
                                                <td className="p-4 ">
                                                    <div as="a" href="#" variant="small" color="blue-gray" className="font-medium text-indigo-900">
                                                        {booking.sessionBooking.status}
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default SessionCounselor
