import React, { useEffect, useState } from 'react'
import DashHeader from '../../../Components/SidePanel/DashHeader'
import CounselorSidebar from '../../../Components/SidePanel/CounselorSidebar'
import img from '../../../Assets/imgs/article.webp'
import sample from '../../../Assets/imgs/sample.jpg'
import { FaPenToSquare } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import { AxiosInstance } from '../../../Utils/AxiosInstance'

function ArticleCounselor() {
    const navigate = useNavigate()
    const [articles, setArticles] = useState([])

    useEffect(() => {
        AxiosInstance.get('/article/get-my-article')
            .then(res => {
                setArticles(res.data)
            })
    }, [])

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
    return (
        <>
            <DashHeader />
            <div className='flex '>
                <CounselorSidebar />
                <div className='sm:w-full  p-4  '>

                    <div className=' p-5 w-3/4 mx-auto flex sm:grid grid-cols-3 bg-gradient-to-r from-orange-300 to-indigo-300 rounded-lg shadow-lg shadow-slate-300'>
                        <div className='col-span-2 my-auto text-center'>
                            <h1 className='text-4xl font-medium'>Share Your Thoughts Here</h1>
                            <button className='p-2 bg-indigo-800 rounded-xl mt-3 text-white font-bold' onClick={() => navigate('/counselor/new-article')}>Click To Write</button>
                        </div>
                        <div className=' col-span-1 flex justify-end'>
                            <img src={img} alt=""
                                className='object-cover rounded-xl w-52  ' />
                        </div>
                    </div>

                    {/* my articles  */}

                    <div className='p-5 mt-10'>
                        <h1 className='text-2xl text-orange-500 font-bold text-center'>My Articles</h1>
                        {articles[0] && ( articles.map(item=>(
                            <div className='mt-10'>
                            <div className=' p-5 w-3/4 mx-auto flex sm:grid grid-cols-3 bg-slate-100 rounded-lg shadow-lg shadow-slate-300'>
                                <div className='col-span-2 my-auto '>
                                    <h1 className='text-2xl font-medium'>{item.title}</h1>

                                    <div className='mt-5 flex justify-between text-slate-600'>
                                        <p>{item.counselorName}</p>
                                        <p>{formatDateTime(item.uploadedOn)}</p>
                                    </div>
                                    <div className='flex justify-end gap-10 text-xl'>
                                        <button className=' text-lg text-orange-500 '>View</button>
                                        <button className='text-indigo-800'><FaPenToSquare /></button>
                                        <button className='text-red-600 '><FaTrash /></button>
                                    </div>
                                </div>
                                <div className=' col-span-1 flex justify-end '>
                                    <img src={item.image} alt="" className='object-cover rounded-xl w-52  ' />
                                </div>

                            </div>
                        </div>
                        ))
                            
                        )}
                        {!articles[0] && (
                            <div className='mt-10'>
                                <h1 className='text-3xl text-indigo-900 font-bold text-center'>You Have 0 Articles</h1>
                            </div>
                        )}

                    </div>

                </div>
            </div>
        </>
    )
}

export default ArticleCounselor


