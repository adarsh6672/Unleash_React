import React, { useEffect, useState } from 'react'
import DashHeader from '../../../Components/SidePanel/DashHeader'
import AdminSidepanal from '../../../Components/SidePanel/AdminSidePanal'
import { useNavigate } from 'react-router-dom'
import { AxiosInstance } from '../../../Utils/AxiosInstance'

import { FaTrash } from "react-icons/fa";

function ManageArticles() {
    const navigate = useNavigate()
    const [articles, setArticles] = useState([])
    const [isOpen, setOpen] = useState(false)
    const [articleId, setDeleteId] = useState()
    const [update, setUpdate] = useState(false)


    useEffect(() => {
        AxiosInstance.get('/article/get-all-articles')
            .then(res => {
                setArticles(res.data)
            })
    }, [update])

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

    const deleteArticle = async () => {
        const formData = new FormData();
        formData.append('articleId', articleId);
        await AxiosInstance.delete('/article/delete', {
            params: {
                articleId: articleId
            }
        })
            .then(res => {
                console.log(res)
                setUpdate(!update)
                setOpen(false)
            }).catch(err => {
                console.log(err)
                setOpen(false)
            })
    }
    const handleDelete = (id) => {
        setDeleteId(id)
        setOpen(true)

    }
    return (
        <>
            <DashHeader />
            <div className='flex '>
                <AdminSidepanal />
                <div className='sm:w-full  p-4'>
                    <div className='p-5 '>
                        {articles[0] && (articles.map(item => (
                            <div className='mt-10'>
                                <div className='min-h-48 p-5 w-3/4 mx-auto flex sm:grid grid-cols-3 bg-slate-100 rounded-lg shadow-lg shadow-slate-300'>
                                    <div className='col-span-2 my-auto '>
                                        <h1 className='text-2xl font-medium'>{item.title}</h1>

                                        <div className='mt-5 flex justify-between text-slate-600'>
                                            <p>{item.counselorName}</p>
                                            <p>{formatDateTime(item.uploadedOn)}</p>
                                        </div>
                                        <div className='flex justify-end gap-10 '>
                                            <button className=' text-lg text-orange-400 ' onClick={() => { handleView(item) }}>View</button>
                                            
                                            <button className='text-red-400 ' onClick={() => handleDelete(item.id)}><FaTrash /></button>
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
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded shadow-md">
                        <p>Are you sure you want to remove Your Article ? </p>
                        <div className="mt-4 flex justify-end">
                            <button className="mr-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded" onClick={() => deleteArticle()}>Confirm</button>
                            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded" onClick={() => setOpen(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}

export default ManageArticles
