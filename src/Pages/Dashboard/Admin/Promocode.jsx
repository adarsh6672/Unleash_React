import React, { useEffect, useState } from 'react'
import DashHeader from '../../../Components/SidePanel/DashHeader'
import AdminSidepanal from '../../../Components/SidePanel/AdminSidePanal'
import { Datepicker } from "flowbite-react";
import { AxiosInstance } from '../../../Utils/AxiosInstance';
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import { FaEdit } from "react-icons/fa";




function Promocode() {
    const [promocode, setPromocode] = useState('')
    const [discount, setDiscount] = useState('')
    const [minimumAmount, setMinimumAmount] = useState('')
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [pageNo, setPageNo] = useState(0)
    const [TABLE_ROWS, setTableRows] = useState([]);
    const [recData, setRecData] = useState();
    const TABLE_HEAD = ['SL.NO', 'PROMOCODE', 'DISCOUNT AMOUNT', 'MINIMUM AMOUNT', 'START DATE', 'END DATE', 'STATUS', 'ACTION']
    const [update , setUpdate] = useState(false)


    

    useEffect(() => {
        AxiosInstance.get(`/consultation/admin/getAllPromocode/${pageNo}`)
            .then(res => {
                console.log(res)
                setTableRows(res.data.content)
                setRecData(res.data)
            })
    }, [update])

    const handleStartDateDate = (d) => {
        setStartDate(d)

    }
    const handleEndDate = (d) => {
        setEndDate(d)
    }

    const handlePromocode = async () => {
        const data = {
            promocode: promocode,
            discountAmount: discount,
            minimumAmount: minimumAmount,
            startDate: startDate.toLocaleString(),
            endDate: endDate.toLocaleString()
        }
        console.log(data)
        await AxiosInstance.post('/consultation/admin/add-promocode', data)
            .then(res => {
                console.log(res.data)
                setPromocode('')
                setDiscount('')
                setMinimumAmount('')
                setUpdate(!update)
            }).catch(err => console.log(err))
    }

    const dateConvert = (dateStr) => {
        const date = moment(dateStr);
        return date.format('DD-MM-YYYY');
    }

    const checkDate = (date) => {
        const givenDate = new Date(date);
        const today = new Date();
        return givenDate.getTime() > today.getTime();
    }

    const handlePageChange = (selectedPage) => {
        setPageNo(selectedPage.selected)
    };
    return (
        <>
            <DashHeader />
            <div className='flex '>
                <AdminSidepanal />
                <div className='sm:w-full  p-4'>



                    <div className='bg-slate-200 rounded-md  mx-auto text-center p-4'>
                        <h1 className='text-center text-orange-500 font-bold'>Add New Promo Code</h1>
                        <div className='sm:grid grid-cols-3'>
                            <div className='col-span-1 '>
                                <div className='flex justify-between p-1'>
                                    <label htmlFor="">Promo Code :</label>
                                    <input type="text" className='rounded-xl' value={promocode} onChange={(e) => { setPromocode(e.target.value) }} />
                                </div>
                                <div className='flex justify-between p-1'>
                                    <label htmlFor="">Discount Amount :</label>
                                    <input type="number" className='rounded-xl' value={discount} onChange={(e) => { setDiscount(e.target.value) }} />
                                </div>

                            </div>
                            <div className='col-span-1'>
                                <div className='flex justify-between p-1'>
                                    <label htmlFor="">Start Date :</label>
                                    <Datepicker minDate={new Date()} showTodayButton={false} showClearButton={false} onSelectedDateChanged={e => handleStartDateDate(e)} />
                                </div>
                                <div className='flex justify-between p-1'>
                                    <label htmlFor="">End Date :</label>
                                    <Datepicker minDate={new Date()} showTodayButton={false} showClearButton={false} onSelectedDateChanged={e => handleEndDate(e)} />
                                </div>

                            </div>
                            <div className='col-span-1'>
                                <div className='flex justify-between p-1'>
                                    <label htmlFor="">Minimum Amount :</label>
                                    <input type="number" className='rounded-xl' value={minimumAmount} onChange={(e) => { setMinimumAmount(e.target.value) }} />
                                </div>
                                <div className='text-end'>
                                    <button className='bg-indigo-800 py-1 px-2 m-3 rounded-lg text-white font-bold ' onClick={handlePromocode}>Create</button>
                                </div>
                            </div>
                        </div>
                    </div>



                    {TABLE_ROWS[0] && (
                        <div className='min-h-[60%] w-full  rounded-2xl  shadow-orange-200 shadow-sm mt-5'>
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
                                                    {item.promocode}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div variant="small" color="blue-gray" className="font-normal">
                                                    {item.discountAmount}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div as="a" href="#" variant="small" color="blue-gray" className="font-normal">
                                                    {(item.minimumAmount)}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                                                    {dateConvert(item.startDate)}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                                                    {dateConvert(item.endDate)}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                {checkDate(item.endDate) ? (
                                                    <div as="a" href="#" variant="small" color="blue-gray" className="font-medium  text-green-500">
                                                        ACTIVE
                                                    </div>
                                                ) : (
                                                    <div as="a" href="#" variant="small" color="blue-gray" className="font-medium  text-red-500">
                                                        EXPIRED
                                                    </div>
                                                )}

                                            </td>
                                            <td className='p-4'>
                                                <button className='text-indigo-800 text-lg'>
                                                    <FaEdit />
                                                </button>
                                            </td>


                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    )}

                    {recData && (
                        <ReactPaginate
                            pageCount={recData.totalPages}
                            pageRangeDisplayed={5}
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

export default Promocode
