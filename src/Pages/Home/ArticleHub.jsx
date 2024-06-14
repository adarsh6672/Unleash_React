import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header'
import { AxiosInstance } from '../../Utils/AxiosInstance'
import { useNavigate } from 'react-router-dom'
import Footer from '../../Components/Footer'
import { IoSearch } from "react-icons/io5";

function ArticleHub() {
    const [update, setUpdate] = useState()
    const [articles, setArticles] = useState([])
    const navigate = useNavigate()
    const [selection, setSelection] = useState([])
    const [filter, setFilter] = useState({
        heading: null,
        keywordId: 0
    })


    useEffect(() => {
         AxiosInstance.post('/article/public/filter-all-articles', filter).then(res => {
            setArticles(res.data)
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [filter.keywordId])

    useEffect(() => {

        AxiosInstance.get('/public/selection-data').then(resp => {
            setSelection(resp.data.specializations)
            console.log(resp.data.specializations)
        }).catch(err => {
            console.log(err)
        })

    }, []);

    function formatDateTime(timestamp) {
        const date = new Date(timestamp);

        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };

        return date.toLocaleString('en-US', options);
    }

    const handleView = (data) => {
        navigate('/articles/open', { state: data })
    }

    const handleViewCounselor = (id) => {
        navigate('/open-profile', { state: id })
    }
    const handleSearch = (e) => {
        setFilter({
            heading: e,
            keywordId: 0
        })
    }
    const handleKeyword = async (id) => {
        setFilter({
            heading: null,
            keywordId: id
        })
        
    }

    const handleFilter = async () => {
        console.log(filter)
        await AxiosInstance.post('/article/public/filter-all-articles', filter).then(res => {
            setArticles(res.data)
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })

    }

    return (
        <>
            <Header />
            <div className='flex justify-center '>
                <h1 className='font-bold sm:text-3xl text-center border-b-4 border-orange-400 pb-2  max-w-lg mt-4 sm:mt-8'>Article Hub</h1>
            </div>

            <div className='sm:grid grid-cols-12 gap-10 py-1 sm:px-10 px-3'>
                <div className='col-span-9  '>
                    {articles[0] && (articles.map(item => (
                        <div className='mt-2 sm:m-5 cursor-pointer ' >
                            <div className='min-h-48 p-5  mx-auto  sm:grid grid-cols-3 bg-slate-100 rounded-lg shadow-lg shadow-slate-300'>
                                <div className='sm:col-span-2 my-auto ' >
                                    <h1 className='sm:text-2xl font-medium hover:text-indigo-800' onClick={() => { handleView(item) }}>{item.title}</h1>

                                    <div className='sm:mt-5 m-2  text-slate-600'>
                                        <p className='text-indigo-900 hover:font-bold' onClick={() => handleViewCounselor(item.counselorId)} >{item.counselorName}</p>
                                        <p className='text-orange-500 text-sm'>{formatDateTime(item.uploadedOn)}</p>
                                    </div>

                                </div>
                                <div className=' sm:col-span-1 flex justify-center sm:justify-end '>
                                    <img src={item.image} alt="" className='object-cover rounded-xl w-52  ' />
                                </div>

                            </div>
                        </div>
                    ))

                    )}
                </div>

                {/* filter */}
                <div className='hidden sm:block col-span-3 pt-10' >
                    <div className='  text-right flex gap-4'>
                        <input type="text" placeholder='Search ...' onChange={(e) => handleSearch(e.target.value)} className='w-max rounded-lg border ' />
                        <button className='bg-orange-500 p-3  text-white font-bold rounded-lg' onClick={handleFilter}>
                            <IoSearch />
                        </button>
                    </div>
                    <h1 className='text-orange-500 mt-10 '>Choose From Keywords</h1>
                    <div className=' gap-10 mt-5 flex flex-wrap'>
                        {selection && selection.map((item) => (
                            <div className='w-fit'>
                                <h1 className={item.id === filter.keywordId ? 'bg-orange-500 px-2 rounded-3xl cursor-pointer shadow-md shadow-slate-400 text-white' : 'bg-slate-200 px-2 rounded-3xl cursor-pointer shadow-md shadow-slate-400'}
                                    onClick={() => handleKeyword(item.id)}>{item.specilization}</h1>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default ArticleHub
