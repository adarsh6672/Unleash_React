import React, { useEffect } from 'react';
import Header from '../../Components/Header';
import { useLocation } from 'react-router-dom'
import Footer from '../../Components/Footer';
import { RiGraduationCapFill } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { IoChatboxEllipses } from "react-icons/io5";
import { useNavigate } from 'react-router-dom'
import moment from 'moment';
import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../Utils/const';
import { AxiosInstance } from '../../Utils/AxiosInstance';
import { InitialsAvatar } from 'react-initials-avatar';


const OpenProfile = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [data, setData] = useState();
    const [pageNo, setPageNo] = useState(0)
    const [reviews, setReviews] = useState([])
    const [res, setRes] = useState()
    const id = location.state;
    console.log(data)
    const token = localStorage.getItem("token")

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        axios.get(BASE_URL + '/public/get-counselor-profile', {
            params: {
                counsId: id
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            console.log(res.data)
            setData(res.data);
        })
    }, [])

    useEffect(() => {
        AxiosInstance.get(`/plan/public/getfeedback/${id}/${pageNo}`)
            .then(res => {
                console.log(res.data)
                setReviews(res.data.content)
                setRes(res.data)
            }).catch(err => {
                console.log(err)
            })
    }, [])

    const handleSessionBooking = () => {
        navigate('/user/counselor-slot', { state: data.user.id })
    }

    const convert = (d) => {
        const dt = new Date(d);
        const date = moment(d, "YYYY-MM-DDTHH:mm");
        return date.format(" h:mm A  - ddd MMMM  YYYY");
    }
    return (
        <>
            <Header />
            <div className=' '>
                <button className='bg-orange-500 mt-3 ml-10  px-10 rounded-2xl text-white'
                    onClick={() => navigate(-1)}>Back</button>
            </div>
            {data && (
                <div className='sm:grid grid-cols-12 p-10 pt-10 gap-5 '>
                    <div className=' col-span-3 '>
                        <div className='bg-slate-200 w-80 rounded-lg content-center pt-8 flex justify-center items-center flex-col'>
                            <img src={data.user.profilePic} alt=""
                                className='h-64 w-64 object-cover rounded-lg' />
                            <h1 className='text-center font-bold pt-5 '>{data.user.fullname}</h1>
                            <h1 className='p-5'>{data.qualification.qualification}</h1>
                            <button className='bg-orange-500 text-white rounded-lg text-center font-bold p-2 mb-10'
                                onClick={handleSessionBooking}>
                                Book A Session
                            </button>
                        </div>
                    </div>
                    <div className=' col-span-9 sm:grid grid-cols-2 gap-10 p-10'>
                        <div className='col-span-1 flex '>
                            <div className='text-orange-500 text-5xl px-10'>
                                <RiGraduationCapFill />
                            </div>
                            <div>
                                <h1 className='font-bold text-xl mb-10'>Qualification</h1>
                                <h1>{data.qualification.qualification}</h1>
                            </div>
                        </div>
                        <div className='col-span-1 flex'>
                            <div className='text-orange-500 text-5xl px-10'>
                                <FaCheckCircle />
                            </div>
                            <div>
                                <h1 className='font-bold text-xl mb-10'>Next Avilable At</h1>
                                {data.nextAvailable && (
                                    <h1>{convert(data.nextAvailable)}</h1>
                                )}
                                {!data.nextAvailable && (
                                    <h1>Not Available</h1>
                                )}

                            </div>
                        </div>
                        <div className='col-span-1 flex'>
                            <div className='text-orange-500 text-5xl px-10'>
                                <FaStar />
                            </div>
                            <div>
                                <h1 className='font-bold text-xl mb-10'>Specializations</h1>
                                {data.specializations.map((sp) => (
                                    <span className='mr-4'>{sp.specilization}</span>
                                ))}
                            </div>

                        </div>
                        <div className='col-span-1 flex'>
                            <div className='text-orange-500 text-5xl px-10'>
                                <IoChatboxEllipses />
                            </div>
                            <div>
                                <h1 className='font-bold text-xl mb-10'>Languages Spoken</h1>
                                {data.languages.map((sp) => (
                                    <span className='mr-4'>{sp.language}</span>
                                ))}
                            </div>

                        </div>
                        <div>
                            <h1 className='text-lg font-bold'>Reviews</h1>
                            <div>
                                { reviews.map(item => (
                                    <div>
                                       
                                        <h1>{item.feedback}</h1>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                    {/* <div className='col-span-3'></div>
                    <div className='col-span-9   h-44'>
                        
                    </div> */}
                </div>

            )}

            <Footer />
        </>
    );
}

export default OpenProfile;
