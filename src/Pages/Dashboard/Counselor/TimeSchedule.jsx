import React, { useEffect, useState } from 'react';
import DashHeader from '../../../Components/SidePanel/DashHeader';
import CounselorSidebar from '../../../Components/SidePanel/CounselorSidebar';
import { Datepicker } from "flowbite-react";
import  axios  from 'axios';
import { BASE_URL } from '../../../Utils/const';

const TimeSchedule = () => {
    const[selected , setSelected]= useState();
    const token = localStorage.getItem("token")
    const[slot , setSlot]= useState([]);
    const[date , setDate]= useState(new Date());
    const[localDateArray , setLocalDateArray]=useState([])
    const time=["6 AM",'7 AM','8 AM','9 AM','10 AM','11 AM','12 PM','1 PM','2 PM','3 PM','4 PM','5 PM','6 PM','7 PM','8 PM' ,'9 PM' ,'10 PM']
    
    const options = { timeZone: 'Asia/Kolkata' };
    // const date= new Date();
    //     date.setHours(10);
    // date.setMinutes(0);
    // date.setSeconds(0);
    // date.setMilliseconds(0);

    useEffect(()=>{
        axios.get(BASE_URL+'/counselor/get-my-slots',{
            headers :{
                'Authorization':`Bearer ${token}`
            }
        }).then(res=>{
            console.log(res.data)
            setSelected(res.data)
            isoToLocal(res.data);
        }).catch(err=>{
            console.log(err)
        })
        
    },[])

    const handleDate=(d)=>{
        setDate(d)
        console.log(d)
        setSlot([]);
    }

    const handleTime=(index)=>{
        const cpdate= date;
        cpdate.setHours(index+6);
        cpdate.setMinutes(0);
        cpdate.setSeconds(0);
        cpdate.setMilliseconds(0);
        console.log(cpdate.toISOString());
        console.log(cpdate)
        // const formattedDate = cpdate.toLocaleString('en-US', options);
        const isodate= new Date(cpdate.toISOString())
        console.log(isodate)
        console.log(isodate.getHours()+'---------------------------')
        
        setSlot(prev=>([...prev,isodate]))
        
    }
    const handleSubmit=async()=>{
        console.log(slot)
        await axios.post(BASE_URL+'/counselor/schedule-time-slot',slot,{
            headers :{
                'Authorization':`Bearer ${token}`
            }
        })
    }

    const isoToLocal=(datas)=>{
       
            
            const array = datas.map(isoDate => {
                const date = new Date(isoDate.slot);
                
                date.setTime(date.getTime() + (5 * 60 * 60 * 1000) + (30 * 60 * 1000))
                return date.getHours();
            });
    
            setLocalDateArray(array);
            console.log(localDateArray)
        }
        
    
    return (
        <>
            <DashHeader/>
            <div className='flex gap-3'>
            <CounselorSidebar/>
            <div className='sm:w-full  p-4 sm:grid grid-cols-12'>
                <div className='col-span-4'>
                    <Datepicker  inline onSelectedDateChanged={e=>handleDate(e)} />
                </div>
                <div className='col-span-8 grid grid-cols-6 gap-6 max-h-60'>
                    {time.map((tm,index)=>(
                        <div className='bg-orange-500 text-center max-h-10 p-2 cursor-pointer'
                        onClick={()=>handleTime(index)}
                        >{tm}</div>
                    ))}
                </div>
                <div className='col-span-8 grid grid-cols-6 gap-6 max-h-60'>
                {time.map((item, index) => (
                    <div key={index} className={localDateArray.includes(index+6) ? 'bg-slate-300 text-center max-h-10 p-2 cursor-pointer' : 'bg-orange-500 text-center max-h-10 p-2 cursor-pointer'}
                    onClick={()=>handleTime(index)}>
                       {item}
                    </div>
                    ))}
                </div>
                <button 
                    onClick={handleSubmit}>Submit</button>  
            </div>
                    
            </div>
            
        </>
    );
}

export default TimeSchedule;
