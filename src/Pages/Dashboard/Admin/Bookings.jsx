import React, { useEffect, useState } from 'react'
import DashHeader from '../../../Components/SidePanel/DashHeader'
import AdminSidepanal from '../../../Components/SidePanel/AdminSidePanal'
import { AxiosInstance } from '../../../Utils/AxiosInstance';
import moment from 'moment';
import ReactPaginate from 'react-paginate';

function Bookings() {

    const [TABLE_ROWS, setTableRows] = useState([]);
    const [pageNo, setPageNo] = useState(0)
    const [recData, setRecData] = useState();
    const TABLE_HEAD = ['SL.NO','BOOKING ID', 'COUNSELOR ID', 'COUNSELOR NAME ', 'USER ID', 'BOOKED AT' ,'SESSION TIME' , 'STATUS']


    useEffect(() => {
        AxiosInstance.get(`/consultation/admin/get-all-bookings/${pageNo}`)
            .then(res => {
                setTableRows(res.data.response)
                setRecData(res.data)
                console.log(res.data)
            }).catch(err => {
                console.log(err)
            })
    }, [pageNo])

    const dateConvert = (dateStr) => {
        const date = moment(dateStr);
        return date.format('YYYY-MM-DD | HH:mm');
    }

    const handlePageChange = (selectedPage) => {
        setPageNo(selectedPage.selected)
    };

    return (
        <>
            <DashHeader />
            <div className='flex '>
                <AdminSidepanal />
                <div className='sm:w-full  p-1'>

                    <div className=" w-full  rounded-2xl  shadow-orange-200 shadow-sm  min-h-[70%]">
                        <table className="w-full min-w-max px-3 table-auto text-center ">
                            <thead>
                                <tr>
                                    {TABLE_HEAD.map((head) => (
                                        <th key={head} className="border-b border-gray-100 bg-orange-300  p-4">
                                            <div
                                                variant="small"
                                                color="blue-gray"
                                                className="font-bold  leading-none opacity-70"
                                            >
                                                {head}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {TABLE_ROWS.map((item, index) => (
                                    <tr key={item.id} className="even:bg-blue-gray-50/50">
                                        <td className="p-4">
                                            <div variant="small" color="blue-gray" className="font-normal">
                                                {pageNo * 10 + index + 1}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div variant="small" color="blue-gray" className="font-normal">
                                                SID{item.sessionBooking.id}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div variant="small" color="blue-gray" className="font-normal">
                                                ULCID{item.counselorId}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div as="a" href="#" variant="small" color="blue-gray" className="font-normal">
                                                {item.counselorName}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div as="a" href="#" variant="small" color="blue-gray" className="font-normal">
                                               ULPID {item.sessionBooking.patientId}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div as="a" href="#" variant="small" color="blue-gray" className="font-normal">
                                            {dateConvert(item.sessionBooking.bookingTime)}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div as="a" href="#" variant="small" color="blue-gray" className="font-normal">
                                                {dateConvert(item.sessionBooking.avilability.slot)}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div as="a" href="#" variant="small" color="blue-gray" 
                                            className={`font-bold ${
                                                item.sessionBooking.status === 'BOOKED'
                                                  ? 'text-green-500'
                                                  
                                                  : item.sessionBooking.status === 'CANCELED'
                                                  ? 'text-red-500'
                                                  : 'text-blue-gray-500'
                                              }`}>
                                                {item.sessionBooking.status}
                                            </div>
                                        </td>


                                    </tr>
                                ))}

                            </tbody>
                        </table>
                        {!TABLE_ROWS[0] && (
                            <div className='text-center text-orange-500 font-bold text-2xl mt-20'>
                                <h1 className=''>NO DATA AVAILABLE</h1>
                            </div>
                        )}
                    </div>
                    {recData && (
                        <ReactPaginate
                            pageCount={recData.totalPage}
                            pageRangeDisplayed={10}
                            marginPagesDisplayed={2}
                            onPageChange={handlePageChange}
                            containerClassName="flex justify-end gap-10   p-3 text-indigo-800"
                            activeClassName="text-orange-500 font-bold"
                        />
                    )}

                </div>
            </div>

        </>
    )
}

export default Bookings
