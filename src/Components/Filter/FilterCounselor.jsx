import React, { useState } from 'react'
import { Datepicker } from "flowbite-react";
import axios from 'axios';
import { useEffect } from 'react';
import { BASE_URL } from '../../Utils/const';

function FilterCounselor() {
    const token = localStorage.getItem("token")
    const [date , setDate] = useState('');
    const [selection , setSelection] = useState();
    const [specialization , setSpecialization]= useState();


    useEffect(()=>{
        
        axios.get(BASE_URL+'/counselor/getselectiondata',{
          headers: {
              'Authorization':`Bearer ${token}`
          }
      }).then(resp=>{
          setSelection(resp.data)
          console.log(resp.data)
      }).catch(err=>{
          console.log(err)
      })
    },[]);

    const handleDate =(d)=>{
      setDate(d);
      
    }

    const handleLanguage=()=>{
      
    }
  return (
    <>
        <h1 className='bg-slate-300 text-2xl font-bold px-6 pt-6'>Filter</h1>
        <div className='bg-slate-300 p-16  gap-3 sm:grid grid-cols-8'>
        
            <div className='col-span-1'>
             <Datepicker  onSelectedDateChanged={e=>handleDate(e)} />
            </div>
            <div className='col-span-1'>
            <select id="countries" 
                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                    <option selected>Gender </option>
                    <option value='1'>Male</option>
                    <option value='2'>Female</option>
                    <option value='3'>Other</option>
                </select>
            </div>
            <div className='col-span-1'>
            <select id="countries"  onChange={(e)=>handleLanguage(e.target.value)}
                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                    <option selected>Language</option>
                    {selection && selection.languages.map((language) => (
                    <option key={language.id} value={language.id}>
                        {language.language}
                    </option>
                ))}
                </select>
            </div>
            <div className='col-span-1'>
            <select id="countries" onChange={e=>setSpecialization(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                    <option selected>Specialization</option>
                    {selection && selection.specializations.map((specialization) => (
                    <option key={specialization.id} value={specialization.id}>
                        {specialization.specilization}
                    </option>
                ))}
                </select>
            </div>
            <div className='col-span-3 text-right '>
                <input type="text" name="" id="" className='rounded-lg border-none ' />
            </div>
            <div className='col-span-1 text-center'>
                    <button className='bg-orange-500 p-2 px-10 text-white font-bold rounded-lg'>
                            Filter
                    </button>
            </div>
        </div>
    </>
  )
}

export default FilterCounselor