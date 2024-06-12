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
    const[isOpen , setIsOpen]= useState(false);
    const[isDeleting ,setIsDeleting]= useState(false)
    const [delDate , setDeldate] = useState();
    
    const time=["6 AM",'7 AM','8 AM','9 AM','10 AM','11 AM','12 PM','1 PM','2 PM','3 PM','4 PM','5 PM','6 PM','7 PM','8 PM' ,'9 PM' ,'10 PM']
    
    

    useEffect(()=>{
        date.setHours(0)
        console.log(date)
        axios.get(BASE_URL+'/consultation/counselor/get-my-slots',{
            params: {
                date: date.toLocaleString('en-IN', { year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false })
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
        console.log(d.toISOString('en-IN', { year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false }))
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
                setDeldate(isodate)
                setIsDeleting(true)
                
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

  

    const removeAll=async()=>{
        date.setHours(0)
        console.log(date.toLocaleString())
        await axios.delete(BASE_URL+'/consultation/counselor/remove-slots',{
            params:{
                date : date.toLocaleString()
            },
            headers :{
                'Authorization':`Bearer ${token}`
            }
        }).then(res=>{
            setUpdated(!updated)
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
        setIsOpen(false)
    }

    const isoToLocal=(datas)=>{
       
            
            const array = datas.map(isoDate => {
                const dat = new Date(isoDate.slot);
                
                
                return dat.getHours();
            });
    
            setLocalDateArray(array);
            console.log(localDateArray)
        }

    const removeAvailability=async()=>{
        await axios.delete(BASE_URL+'/consultation/counselor/remove-slot',{
            params:{
                date : delDate.toLocaleString()
            },
            headers :{
                'Authorization':`Bearer ${token}`
            }
        }).then(res=>{
            setUpdated(!updated)
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
         setIsDeleting(false)
    }
   
    
    
        
    
    return (
        <>
            <DashHeader/>
            <div className='flex gap-3'>
            <CounselorSidebar/>
            <div className='sm:w-full  p-4 sm:grid grid-cols-12 bg-slate-100'>
                <div className='col-span-3 mx-auto'>
                    <Datepicker minDate={new Date()}  showTodayButton={false} showClearButton={false} inline onSelectedDateChanged={e=>handleDate(e)} />
                </div>
                <div className='col-span-9   bg-white rounded-lg shadow-md shadow-slate-300 p-10 m-1 max-h-80 mt-3'>
                
                    <div className='sm:grid lg:grid-cols-6 md:grid-cols-2 col-span-6 gap-6'>
                    {time.map((item, index) => (
                    <div key={index} className={localDateArray.includes(index+6) ? 'bg-slate-300 text-center max-h-10 p-2 cursor-pointer' 
                    : newSlot.includes(index) ? 'bg-orange-400 text-white text-center max-h-10 p-2 cursor-pointer'
                    : 'text-orange-500 border border-orange-500 text-center max-h-10 p-2 cursor-pointer'
                    }
                    onClick={()=>handleTime(index)}>
                       {item}
                    </div>
                    ))}
                    </div>
               
                </div>
                <div className=' flex  col-span-12 justify-around '>
                        <div className='col-span-6 '>
                            {/* <button className='bg-orange-500 text-white  p-2 rounded-md mx-2' onClick={selectAll}>Select All Slots</button> */}
                            <button className='bg-white border-2 border-red-500 text-red-500  p-2 rounded-md mx-2' onClick={()=>setIsOpen(true)}>Remove All Existing Schedule</button>
                            
                        </div>

                    
                        <div className='col-span-6   '>
                            <button className='bg-indigo-800 p-3 text-white  rounded-md text-md' onClick={handleSubmit}>Make Visible</button>  
                        </div>
                   
                </div>
                
            </div>
                    
            </div>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-4 rounded shadow-md">
                    <p>Are you sure you want to remove all?</p>
                    <div className="mt-4 flex justify-end">
                        <button className="mr-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded" onClick={removeAll}>Confirm</button>
                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded" onClick={()=>setIsOpen(false)}>Cancel</button>
                    </div>
                </div>
            </div>
            )}

            {isDeleting && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-4 rounded shadow-md">
                    <p>Are you sure you want to remove existing slot ? </p>
                    <div className="mt-4 flex justify-end">
                        <button className="mr-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded" onClick={removeAvailability}>Confirm</button>
                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded" onClick={()=>setIsDeleting(false)}>Cancel</button>
                    </div>
                </div>
            </div>
            )}
            
        </>
    );
}

export default TimeSchedule;
