import React, { useEffect, useState } from 'react'
import { AxiosInstance } from '../../../Utils/AxiosInstance';
import DashHeader from '../../../Components/SidePanel/DashHeader';
import AdminSidepanal from '../../../Components/SidePanel/AdminSidePanal';
import { toast } from 'react-hot-toast';
import ReactPaginate from 'react-paginate'

function PaymentProcess() {
    const [TABLE_ROWS, setTableRows] = useState([]);
    const TABLE_HEAD = ['SL.NO', 'COUNSELOR ID', 'NAME', 'NO OF SESSION', 'AMOUNT IN RS.', 'ACTION']
    const [update, setUpdate] = useState(false);
    const [selected, setSelected] = useState([])
    const [pageNo, setPageNo] = useState(0)
    const [recData, setRecData] = useState()
    const [loading, setLoading] = useState(false)


    const notify = (text) => {
        toast.error(text);
    };


    useEffect(() => {
        AxiosInstance.get(`/consultation/payment/get-lastweek-pendings/${pageNo}`)
            .then(res => {
                console.log(res)
                setTableRows(res.data.content)
                setRecData(res.data)
            }).catch(err => {
                console.log(err)
            })
    }, [update, pageNo])



    const processPayment = async (id) => {
        console.log('payment started')
        await AxiosInstance.post(`/consultation/payment/process/${id}`)
            .then(res => {
                setUpdate(!update)
            }).catch(err => {
                console.log(err)
            })
    }



    const processSelected = async () => {
        if (!selected[0]) {
            notify("Select Atleast One Process..!")
            return
        }
        setLoading(true)
        await AxiosInstance.post('/consultation/payment/process/selected', selected)
            .then(res => {
                console.log(res)
                setUpdate(!update)
                setLoading(false)
                
            }).catch(err => {
                console.log(err)
                setLoading(false)
            })
            setSelected([])
    }

    const handleSelection = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            // Add the number to the array if the checkbox is checked
            setSelected([...selected, parseInt(value)]);
        } else {
            // Remove the number from the array if the checkbox is unchecked
            setSelected(selected.filter((num) => num !== parseInt(value)));

        }
        

    }

    const handleAllSelection = (event) => {
        const { checked } = event.target
        if (checked) {
            TABLE_ROWS.forEach(item => {
                if (!selected.includes(item.id) && !item.payed) {
                    setSelected(prevSelected => [...prevSelected, item.id]);
                }
            });
        } else {
            setSelected([])
        }

    }

    const handlePageChange = (selectedPage) => {
        setPageNo(selectedPage.selected)
    };

    useEffect(() => {
        console.log(selected)
    }, [selected])
    return (
        <>
            <>
                {loading && (
                    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full text-orange-500 border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]">
                        <span className="hidden">Loading...</span>
                    </div>
                </div>
                )}
                <DashHeader />
                <div className='flex '>
                    <AdminSidepanal />
                    <div className='sm:w-full  p-4'>

                        <div className='m-2 flex justify-between'>
                            <h1 className='text-xl font-bold text-orange-500 '>Last Week Payments</h1>
                            <button className='bg-indigo-800 rounded-lg font-bold p-2 text-white' onClick={processSelected}>
                                Process Selected
                            </button>
                        </div>
                        <div className="min-h-[85%] w-full  rounded-2xl  shadow-orange-200 shadow-sm">
                            <table className="w-full min-w-max px-3 table-auto text-center ">
                                <thead>
                                    <tr>
                                        <th className="border-b border-blue-gray-100 bg-orange-300  p-4">
                                            <input type="checkbox" onChange={handleAllSelection} className='text-orange-500 outline-none' />
                                        </th>
                                        {TABLE_HEAD.map((head) => (
                                            <th key={head} className="border-b border-blue-gray-100 bg-orange-300  p-4">
                                                <div
                                                    variant="small"
                                                    color="blue-gray"
                                                    className=" leading-none opacity-70 font-bold"
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
                                            <td>
                                                <input type="checkbox" checked={selected.includes(item.id)} disabled={item.payed === true} className='text-orange-500 outline-none' value={item.id} onChange={handleSelection} />
                                            </td>
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
                        {recData && (
                            <ReactPaginate
                                pageCount={recData.totalPages}
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
        </>
    )
}

export default PaymentProcess
