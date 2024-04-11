import React, { useEffect, useState } from 'react';
import DashHeader from '../../../Components/SidePanel/DashHeader';
import CounselorSidebar from '../../../Components/SidePanel/CounselorSidebar';
import { Datepicker } from "flowbite-react";
import  axios  from 'axios';
import { BASE_URL } from '../../../Utils/const';

const TimeSchedule = () => {
    
    
    const[updated , setUpdated]= useState(false)
    const token = localStorage.getItem("token")
    const[slot , setSlot]= useState([]);
    const[date , setDate]= useState(new Date());
    const[localDateArray , setLocalDateArray]=useState([])
    const[newSlot , setNewSlot] = useState([])
    
    const time=["6 AM",'7 AM','8 AM','9 AM','10 AM','11 AM','12 PM','1 PM','2 PM','3 PM','4 PM','5 PM','6 PM','7 PM','8 PM' ,'9 PM' ,'10 PM']
    
    

    useEffect(()=>{
        date.setHours(0)
        console.log(date)
        axios.get(BASE_URL+'/consultation/counselor/get-my-slots',{
            params: {
                date: date.toLocaleString()
              },
            headers :{
                'Authorization':`Bearer ${token}`
            }
        }).then(res=>{
            console.log(res.data)
            
            isoToLocal(res.data);
        }).catch(err=>{
            console.log(err)
        })
        
    },[updated])

    const handleDate=(d)=>{
        setDate(d)
        console.log(d.toISOString())
        setSlot([]);
        setNewSlot([])
        setUpdated(!updated)

    }

    const handleTime=(index)=>{
        const cpdate= date;
        cpdate.setHours(index+6);
        cpdate.setMinutes(0);
        cpdate.setSeconds(0);
        cpdate.setMilliseconds(0);
        console.log(cpdate.toLocaleDateString())
        const isodate= cpdate.toLocaleString()
       
        if(newSlot.includes(index)){
            var temp= newSlot.filter((item, i) => item !== index);
            setNewSlot(temp)
            temp=slot.filter((item, i) => item !==isodate)
            setSlot(temp)
            console.log(newSlot)
            console.log(slot)
        }else{
            if(localDateArray.includes(index+6)){
                alert("already selected")
            }else{
                setSlot(prev=>([...prev,isodate]))
                setNewSlot(prev=>([...prev,index]))
            }
           
        }
        
        date.setHours(0)
        
    }
    const handleSubmit=async()=>{
        console.log(slot)
        
        await axios.post(BASE_URL+'/consultation/counselor/schedule-time-slot',slot,{
            headers :{
                'Authorization':`Bearer ${token}`
            }
        }).then(res=>{
            console.log(res)
            setNewSlot([])
            setSlot([])
            setUpdated(!updated)
        }).catch(err=>{
            console.log(err)
        })
    }

    const isoToLocal=(datas)=>{
       
            
            const array = datas.map(isoDate => {
                const dat = new Date(isoDate.slot);
                
                
                return dat.getHours();
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
                    <Datepicker minDate={new Date()}  inline onSelectedDateChanged={e=>handleDate(e)} />
                </div>
               
                <div className='col-span-8 grid grid-cols-6 gap-6 max-h-60'>
                {time.map((item, index) => (
                    <div key={index} className={localDateArray.includes(index+6) ? 'bg-slate-300 text-center max-h-10 p-2 cursor-pointer' 
                    : newSlot.includes(index) ? 'bg-orange-400 text-white text-center max-h-10 p-2 cursor-pointer'
                    : 'text-orange-500 border border-orange-500 text-center max-h-10 p-2 cursor-pointer'
                    }
                    onClick={()=>handleTime(index)}>
                       {item}
                    </div>
                    ))}
                    <div className='col-span-6 flex justify-center max-h-7'>
                        <button className='bg-green-600 px-3 text-white font-bold ' onClick={handleSubmit}>Submit</button>  
                    </div>
                </div>
                
            </div>
                    
            </div>
            
        </>
    );
}

export default TimeSchedule;
