import React, { useState } from 'react'
import { Datepicker } from "flowbite-react";
import axios from 'axios';
import { useEffect } from 'react';
import { BASE_URL } from '../../Utils/const';
import { FaCircleCheck } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom'
import moment from "moment";
import { AxiosInstance } from '../../Utils/AxiosInstance';


function FilterCounselor() {
    const [date, setDate] = useState('');
    const [selection, setSelection] = useState();
    const [specialization, setSpecialization] = useState();
    const [data, setData] = useState();
    const navigate = useNavigate();
    const [filter, setFilter] = useState({
        name: null,
        gender: 0,
        language: 0,
        specialization: 0,
        dateOfAvailability: null
    })

    useEffect(() => {

        axios.get(BASE_URL + '/public/selection-data').then(resp => {
            setSelection(resp.data)
            console.log(resp.data)
        }).catch(err => {
            console.log(err)
        })


    }, []);



    useEffect(() => {
        axios.get(BASE_URL + '/public/get-available-counsellors').then(res => {
            console.log(res.data)
            setData(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    const convert = (d) => {
        const dt = new Date(d);
        const date = moment(d, "YYYY-MM-DDTHH:mm");
        return date.format(" h:mm A  - ddd MMMM  YYYY");

    }
    const handleDate = (d) => {
        setDate(d);

    }

    const handleLanguage = () => {

    }

    const handleSessionBooking = (id) => {
        navigate('/user/counselor-slot', { state: id })
    }

    const handleViewProfile = (index) => {
        navigate("/open-profile", { state: index })

    }

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilter({
            ...filter,
            [name]: value
        });
    };

    const reset = () => {
        setFilter({
        })
    }

    const submitFilter = async () => {
        console.log(filter)
        axios.post(BASE_URL +'/public/get-filter-counselors', filter).then(resp => {
            setData(resp.data)
            console.log(resp.data)
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <>
            <h1 className='bg-slate-300 text-2xl font-bold px-6 pt-6'>Filter</h1>
            <div className='bg-slate-300 p-16  gap-3 sm:grid grid-cols-8'>

                <div className='col-span-1'>
                    <Datepicker value={filter.dateOfAvailability} onSelectedDateChanged={(date) => setFilter({ ...filter, dateOfAvailability: date.toLocaleString() })} />
                </div>
                <div className='col-span-1'>
                    <select id="gender" value={filter.gender} onChange={handleFilterChange} name="gender"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                        <option selected value='0'>Gender </option>
                        <option value='1'>Male</option>
                        <option value='2'>Female</option>
                        <option value='3'>Other</option>
                    </select>
                </div>
                <div className='col-span-1'>
                    <select id="language" value={filter.language} onChange={handleFilterChange} name="language"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                        <option selected value='0'>Language</option>
                        {selection && selection.languages.map((language) => (
                            <option key={language.id} value={language.id}>
                                {language.language}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='col-span-1'>
                    <select id="specialization" value={filter.specialization} onChange={handleFilterChange} name="specialization"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                        <option selected value='0'>Specialization</option>
                        {selection && selection.specializations.map((specialization) => (
                            <option key={specialization.id} value={specialization.id}>
                                {specialization.specilization}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='col-span-1 sm:col-span-3 text-right '>
                    <input type="text" placeholder='Search Counselor...' className='w-full rounded-lg border-none ' id="name" value={filter.name} onChange={handleFilterChange} name="name" />
                </div>
                <div className='col-span-1 text-center flex'>

                    <button className='bg-orange-500 p-2 px-10 text-white font-bold rounded-lg' onClick={submitFilter}>
                        Filter
                    </button>
                    {/* <button className='bg-yellow-500 p-2 px-2 text-white font-bold rounded-lg' onClick={() =>reset}>
                        Reset
                    </button> */}
                </div>
            </div>

            <div className='sm:grid md:grid-cols-8 lg:grid-cols-12 gap-6 p-10 '>
                {data && data.map((item, index) => (
                    <div className='bg-slate-100 rounded-xl col-span-4 max-h-80 my-2 p-2 shadow-lg shadow-slate-300'>
                        <div className='flex justify-around'>
                            <img src={item.user.profilePic} alt=""
                                className='h-24 w-24 rounded-full object-cover' />
                            <div className='p-3'>
                                <h1 className='font-bold py-3'>{item.user.fullname}</h1>
                                <h1>{item.qualification.qualification}</h1>
                            </div>
                        </div>
                        <div className='p-2 '>
                            <div className='text-orange-500 flex '>
                                <FaCircleCheck />
                                <h1 className='font-bold text-black mx-2 mb-2'>Specialization</h1>
                            </div>
                            {item.specializations.map((sp) => (
                                <span className='ml-6'>{sp.specilization}</span>
                            ))}

                        </div>
                        <div className='p-2 '>
                            <div className='text-orange-500 flex '>
                                <FaCircleCheck />

                                <h1 className='font-bold text-black mx-2 '>Next Avilable At</h1>
                            </div>
                            {item.nextAvailable && (
                                <h1 className='ml-6'>{convert(item.nextAvailable)}</h1>
                            )}
                            {!item.nextAvailable && (
                                <h1 className='ml-6'>Not Available</h1>
                            )}
                        </div>
                        <div className='flex justify-around py-2 '>
                            <button className='bg-white py-1.5 px-2 rounded-lg text-orange-500 shadow-sm shadow-slate-500'
                                onClick={() => { handleViewProfile(data[index].user.id) }}>View Profile</button>
                            <button className='bg-orange-500 py-1.5 px-2 rounded-lg text-white shadow-sm shadow-slate-500'
                                onClick={() => handleSessionBooking(item.user.id)}>Book Session</button>
                        </div>
                    </div>

                ))}



            </div>
        </>
    )
}

export default FilterCounselor