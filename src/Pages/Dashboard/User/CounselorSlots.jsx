import React, { useEffect, useState } from 'react';
import Header from '../../../Components/Header'
import { Datepicker } from 'flowbite-react';
import { BASE_URL } from '../../../Utils/const';
import axios from 'axios'
import Footer from '../../../Components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
const CounselorSlots = () => {


    const location = useLocation()
    const counselorId = location.state;
    const[updated , setUpdated]= useState(false)
    const token = localStorage.getItem("token")
    const[slot , setSlot]= useState(null);
    const[date , setDate]= useState(new Date());
    const[localDateArray , setLocalDateArray]=useState([])
    const[newSlot , setNewSlot] = useState(null)
    const navigate = useNavigate();
    
    const time=["6 AM",'7 AM','8 AM','9 AM','10 AM','11 AM','12 PM','1 PM','2 PM','3 PM','4 PM','5 PM','6 PM','7 PM','8 PM' ,'9 PM' ,'10 PM']
    
    

    useEffect(()=>{
        date.setHours(0)
        console.log(date)
        axios.get(BASE_URL+'/user/get-time-slots',{
            params: {
                date: date.toISOString(),
                counselorId: counselorId
              },
            headers :{
                'Authorization':`Bearer ${token}`
            }
        }).then(res=>{
            console.log(res.data);
            isoToLocal(res.data);
        }).catch(err=>{
            console.log(err)
        })
        
    },[updated])

    const handleDate=(d)=>{
        setDate(d)
        console.log(d.toISOString())
        setSlot();
        setNewSlot()
        setUpdated(!updated)

    }

    const handleTime=(i)=>{
        
        setNewSlot(i);
        console.log(i+'=====================================')
        const cpdate= date;
        cpdate.setHours(i+6);
        cpdate.setMinutes(0);
        cpdate.setSeconds(0);
        cpdate.setMilliseconds(0);
        console.log(date+'-------------------------------------------------------')
        // const formattedDate = cpdate.toLocaleString('en-US', options);
        const isodate= cpdate.toISOString()
        
        setSlot(isodate)
        console.log(slot + '---------------'+newSlot)
        
        date.setHours(0)
        
    }
    const handleSubmit=async()=>{
        console.log(slot)
        
        // await axios.post(BASE_URL+'/counselor/schedule-time-slot',slot,{
        //     headers :{
        //         'Authorization':`Bearer ${token}`
        //     }
        // }).then(res=>{
        //     console.log(res)
        //     setNewSlot()
        //     setSlot()
        //     setUpdated(!updated)
        // }).catch(err=>{
        //     console.log(err)
        // })
    }

    const isoToLocal=(datas)=>{
       
            
            const array = datas.map(isoDate => {
                const dat = new Date(isoDate.slot);
                
                dat.setTime(dat.getTime() + (5 * 60 * 60 * 1000) + (30 * 60 * 1000))
                return dat.getHours();
            });
    
            setLocalDateArray(array);
            console.log(localDateArray)
        }
        

    return (
        <>
            <Header />
            <div className='bg-slate-100 '>
                <button className='bg-orange-500 mt-10 ml-10 p-2 px-10 rounded-2xl text-white'
                onClick={()=>navigate(-1)}>Back</button>
            </div>
            <h1 className='font-bold text-center text-3xl  text-indigo-800 p-10 bg-slate-100'>STIME SLOTS AVILABLE</h1>
            <div className='sm:w-full  p-4 sm:grid grid-cols-12 bg-slate-100 pb-20'>
                <div className='col-span-3'>
                    <Datepicker minDate={new Date()}  inline onSelectedDateChanged={e=>handleDate(e)} />
                </div>
               
                <div className='col-span-8  max-h-60'>
                    <div className='sm:grid lg:grid-cols-6 md:grid-cols-2 col-span-6 gap-6'>
                    {localDateArray && time.map((item, index) => (
                    <div key={index} className={localDateArray.includes(index+6) && newSlot !== index ? 'text-orange-500 border border-orange-500 text-center max-h-10 p-2 cursor-pointer' 
                    : newSlot === index ? 'bg-orange-400 text-white text-center max-h-10 p-2 cursor-pointer'
                    : 'hidden'
                    }
                    onClick={()=>handleTime(index)}>
                       {item}
                    </div>
                    ))}
                    </div>
                    {!localDateArray[0] && (
                        <h1 className='text-center text-xl text-red-500'>No Time Slots Avilable On This Date</h1>
                    )}

                    {localDateArray[0] && (
                        <div className='col-span-6 flex justify-center p-10'>
                            <button className='bg-indigo-800 p-3 text-white font-bold rounded-md text-md' onClick={handleSubmit}>Book Session</button>  
                        </div>
                    )}
                    
                   
                </div>
                
            </div>
            <Footer />
      
            
        </>
    );
}

export default CounselorSlots;
