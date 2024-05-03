import React, { useEffect, useState } from 'react'
import { AxiosInstance } from '../../../Utils/AxiosInstance';
import DashHeader from '../../../Components/SidePanel/DashHeader';
import AdminSidepanal from '../../../Components/SidePanel/AdminSidePanal';

function PaymentProcess() {
    const [TABLE_ROWS, setTableRows] = useState([]);
    const TABLE_HEAD = ['SL.NO', 'COUNSELOR ID', 'NAME', 'NO OF SESSION', 'AMOUNT IN RS.', 'ACTION']
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        AxiosInstance.get('/consultation/payment/get-lastweek-pendings')
            .then(res => {
                console.log(res)
                setTableRows(res.data)
            }).catch(err => {
                console.log(err)
            })
    }, [update])



    const processPayment = async (id) => {
        console.log('payment started')
        await AxiosInstance.post(`/consultation/payment/process/${id}`)
            .then(res => {
                setUpdate(!update)
            }).catch(err => {
                console.log(err)
            })
    }
    return (
        <>
            <>
                <DashHeader />
                <div className='flex '>
                    <AdminSidepanal />
                    <div className='sm:w-full  p-4'>
                        <div className='p-5 flex justify-between'>
                            <h1 className='text-2xl text-orange-500 '>Last Week Payments</h1>
                            <button className='bg-indigo-800 p-2 text-white'>
                                Process All
                            </button>
                        </div>
                        <div className="h-full w-full  rounded-2xl  shadow-orange-200 shadow-sm">
                            <table className="w-full min-w-max px-3 table-auto text-center ">
                                <thead>
                                    <tr>
                                        {TABLE_HEAD.map((head) => (
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
                                <tbody>
                                    {TABLE_ROWS.map((item, index) => (
                                        <tr key={item.id} className="even:bg-blue-gray-50/50">
                                            <td className="p-4">
                                                <div variant="small" color="blue-gray" className="font-normal">
                                                    {index + 1}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div variant="small" color="blue-gray" className="font-normal">
                                                    ULCID{item.userId}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div variant="small" color="blue-gray" className="font-normal">
                                                    {item.userName}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                                                    {item.count}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                                                    {item.amount}
                                                </div>
                                            </td>
                                            <td className="p-4 ">
                                                {item.payed && (
                                                    <div as="a" href="#" variant="small" className="cursor-pointer font-medium text-white rounded-2xl  bg-indigo-700" value={item.id} >
                                                        PAID
                                                    </div>
                                                )}

                                                {!item.payed && (
                                                    <div as="a" href="#" variant="small" className="cursor-pointer bg-green-700 rounded-2xl font-medium text-white" value={item.id} onClick={(e) => processPayment(item.id)}>
                                                        PROCESS
                                                    </div>
                                                )}


                                            </td>
                                        </tr>
                                    ))}
                                    {!TABLE_ROWS[0] && (
                                        <div className='text-center text-orange-500 font-bold text-2xl mt-20'>
                                            <h1 className=''>NO DATA AVAILABLE</h1>
                                        </div>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        </>
    )
}

export default PaymentProcess
