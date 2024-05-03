import React, { useEffect, useState } from 'react'
import DashHeader from '../../../Components/SidePanel/DashHeader'
import AdminSidepanal from '../../../Components/SidePanel/AdminSidePanal'
import { AxiosInstance } from '../../../Utils/AxiosInstance';
import moment from 'moment';

function Transactions() {
    const [TABLE_ROWS, setTableRows] = useState([]);
    const TABLE_HEAD = ['SL.NO', 'COUNSELOR ID', 'TRANSACTION ID', 'DATE & TIME', 'AMOUNT IN RS.']


    useEffect(() => {
        AxiosInstance.get('/consultation/payment/admin/get-alltransaction')
            .then(res => {
                setTableRows(res.data)
                console.log(res.data)
            }).catch(err => {
                console.log(err)
            })
    }, [])

    const dateConvert = (dateStr) => {
        const date = moment(dateStr);
        return date.format('YYYY-MM-DD | HH:mm');
    }

    return (
        <>
            <DashHeader />
            <div className='flex '>
                <AdminSidepanal />
                <div className='sm:w-full  p-4'>
                    
                    <div className=" w-full  rounded-2xl  shadow-orange-200 shadow-sm">
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
                                                {item.payoutId}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div as="a" href="#" variant="small" color="blue-gray" className="font-normal">
                                                {dateConvert(item.payedOn)}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                                                {item.amount}
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
                </div>
            </div>
        </>
    )
}

export default Transactions
