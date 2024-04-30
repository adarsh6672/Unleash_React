import React, { useEffect, useState } from 'react'
import DashHeader from '../../../Components/SidePanel/DashHeader'
import CounselorSidebar from '../../../Components/SidePanel/CounselorSidebar'
import { AxiosInstance } from '../../../Utils/AxiosInstance';
import { toast} from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function NewArticle() {
    

    const [image, setImage] = useState(null)
    const [selection, setSelection] = useState()
    const [error, setError] = useState(null)
    const [title, setTitle] = useState(null)
    const [content, setContent] = useState(null)
    const [relatedTo, setRelatedTo] = useState(null)
    const [upload, setUpload] = useState(false)

    const navigate = useNavigate()

    const userData = useSelector(state => state.userData.userData)

    const notify = () => {
        toast.success('Your Post Uploaded Successfully');
     };

    useEffect(() => {

        AxiosInstance.get('/user/counselor/getselectiondata').then(resp => {
            setSelection(resp.data)
            console.log(resp.data)
        }).catch(err => {
            console.log(err)
        })
    }, []);

    const dataValidation = () => {
        if (content == null) {
            setError('Cannot Upload Empty Content')
            return false
        }
        if (relatedTo == null) {
            setError('Cannot Upload Without Related Topic.')
            return false
        }
        if (title == null) {
            setError('Cannot Upload Without title for the  Topic.')
            return false
        }
        return true
    }

    const handlePost = async () => {
        setError()
        if (dataValidation()) {
            setUpload(true)
            const data = {
                title,
                relatedTo,
                content
            }
            const formData = new FormData();
            formData.append('image', image);
            formData.append('title', title)
            formData.append('content', content)
            formData.append('relatedTo', relatedTo)
            formData.append('counselorName', userData.fullname)

            AxiosInstance.post('article/add', formData)
                .then(res => {
                    console.log(res)
                    notify();
                    navigate(-1)
                        
                }).catch(err => {
                            console.log(err)
                            setUpload(false)
                        })
        }
    }

    return (
        <>
            <DashHeader />
            <div className='flex '>
                <CounselorSidebar />
                <div className='sm:w-full  px-4  '>
                    <div id='section2' className=" mt-6 px-5 lg:mt-0 rounded shadow bg-white">
                        {error && (
                            <p className=' text-xl text-red-500 text-center'>{error}</p>
                        )}
                       
                        <form>
                            {!image && (
                                <div className="md:flex mb-6 mt-6">
                                    <div className="md:w-1/6">
                                        <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4" for="my-textfield">
                                            Select Image
                                        </label>
                                    </div>
                                    <div className="md:w-3/4">
                                        <input onChange={(e) => setImage(e.target.files[0])}
                                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-1" id="file_input" type="file" />
                                        <p className="py-2 text-sm text-gray-600">Add Cover Photo For Your Post .</p>
                                    </div>
                                </div>

                            )}
                            {image && (
                                <div className="md:flex mb-6 relative">
                                    <div className="md:w-1/6">
                                        <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4" for="my-textfield">
                                            Image
                                        </label>
                                    </div>
                                    <div className='md:w-3/4 relative'>
                                        <img src={URL.createObjectURL(image)} alt="" className='object-cover rounded-xl w-full h-52 mb-5' />
                                        <button
                                            className="absolute top-0 right-0 px-2 m-3 cursor-pointer font-bold text-red-600 bg-white rounded-full"
                                            onClick={() => setImage(null)}
                                        >
                                            x
                                        </button>
                                    </div>
                                </div>


                            )}



                            <div className="md:flex mb-6">
                                <div className="md:w-1/6">
                                    <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4" for="my-textfield">
                                        Article Title
                                    </label>
                                </div>
                                <div className="md:w-3/4">
                                    <input onChange={e => setTitle(e.target.value)} className="form-input block w-full focus:bg-white rounded-lg" id="my-textfield" type="text" value={title} />
                                    <p className="py-2 text-sm text-gray-600">Add title for your post <span className='text-red-600'>*</span></p>
                                </div>
                            </div>

                            <div className="md:flex mb-6">
                                <div className="md:w-1/6">
                                    <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4" for="my-select">
                                        Related To
                                    </label>
                                </div>
                                <div className="md:w-3/4">
                                    <select onChange={e => setRelatedTo(e.target.value)} className="form-select block w-full focus:bg-white rounded-lg" id="my-select">
                                        <option selected>Choose</option>
                                        {selection && selection.specializations.map((specialization) => (
                                            <option key={specialization.id} value={specialization.id}>
                                                {specialization.specilization}
                                            </option>
                                        ))}
                                    </select>

                                    <p className="py-2 text-sm text-gray-600">Select The Article Related To Which Topic <span className='text-red-600'>*</span></p>
                                </div>
                            </div>

                            <div className="md:flex mb-6">
                                <div className="md:w-1/6">
                                    <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4" for="my-textarea">
                                        Content
                                    </label>
                                </div>
                                <div className="md:w-3/4">
                                    <textarea className="form-textarea block w-full focus:bg-white rounded-lg" id="my-textarea" value={content} rows="8" onChange={e => setContent(e.target.value)}></textarea>
                                    <span className='text-red-600'>*</span>
                                </div>
                            </div>

                            <div className="md:flex pb-5">
                                <div className="md:w-1/6"></div>
                                <div className="md:w-3/4">
                                    {!upload && (
                                        <button className="shadow bg-orange-500 hover:bg-yellow-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button" onClick={handlePost}>
                                            Post
                                        </button>
                                    )}
                                    {upload && (
                                        <button
                                            type="submit"
                                            className="shadow bg-orange-500 hover:bg-yellow-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                        >
                                            <div
                                                className="inline-block h-8 w-8 animate-spin rounded-full text-white border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                                role="status">
                                                <span
                                                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap  !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                                >Loading...</span>
                                            </div>
                                        </button>
                                    )}

                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}

export default NewArticle
