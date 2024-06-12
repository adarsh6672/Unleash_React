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
    const[date , setDate]= useState(new Date());
    const[newSlot , setNewSlot] = useState(null)
    const[avilable ,setAvailable] = useState([]);
    const navigate = useNavigate();
    const [error , setError] =useState();
    
    
    

    useEffect(()=>{
        date.setHours(0)
        console.log(date)
        axios.get(BASE_URL+'/consultation/counselor/get-time-slots',{
            params: {
                date: date.toLocaleString('en-IN', { hour12: false }),
                counselorId: counselorId
              },
            headers :{
                'Authorization':`Bearer ${token}`
            }
        }).then(res=>{
            console.log(res.data);
            setAvailable(res.data);
        }).catch(err=>{
            console.log(err)
        })
        
    },[updated])

    const handleDate=(d)=>{
        setDate(d)
        console.log(d.toISOString())
        setNewSlot()
        setError()
        setUpdated(!updated)

    }

    const handleTime=(i)=>{
        setError();
        if(avilable[i].booked===true){
            setError("Already Booked By SomeOne")
            return;
        }
        setNewSlot(i);
        console.log(avilable[i])
        date.setHours(0)
        
    }
    const handleSubmit=async()=>{
        setError()
        if(!newSlot){
            setError("Select One Slot....!")
            return;
        }

        await axios.post(BASE_URL+'/consultation/session/book-slot',null,{
            params: {
                slotId : avilable[newSlot].id
              },
            headers :{
                'Authorization':`Bearer ${token}`
            }
        }).then(res=>{
            console.log(res.data)
            const data= res.data;
            navigate('/user/booked',{state:data})
        }).catch(err=>{
            console.log(err)
        })


        
        
    }
    function formatTime(datestring) {
        const date = new Date(datestring);
        const options = { hour: "2-digit", minute: "2-digit", hour12: true };
        const formattedTime = date.toLocaleString("en-US", options);
        return formattedTime;
      }

      if(avilable){
        avilable.sort((a, b) => {
            const dateA = new Date(a.slot);
            const dateB = new Date(b.slot);
            return dateA - dateB;
          });
      }
      

    
        

    return (
        <>
            <Header />
            <div className='bg-slate-100 '>
                <button className='bg-orange-500 mt-10 ml-10 p-2 px-10 rounded-2xl text-white'
                onClick={()=>navigate(-1)}>Back</button>
            </div>
            <h1 className='font-bold text-center text-3xl  text-indigo-800 pb-5 bg-slate-100'>STIME SLOTS AVILABLE</h1>
            {error && (
                        <h1 className='text-center text-xl m-5  text-red-500 '>{error}</h1>
                    )}
            <div className='sm:w-full  p-4 sm:grid grid-cols-12 px-10 bg-slate-100 pb-20 '>
                <div className='col-span-3 mx-auto'>
                    <Datepicker minDate={new Date()}  showTodayButton={false} showClearButton={false}  inline onSelectedDateChanged={e=>handleDate(e)} />
                </div>
               
                <div className='col-span-9   bg-white rounded-lg shadow-md shadow-slate-300 p-10 m-1'>
                
                {!avilable[0] && (
                        <h1 className='text-center text-xl mt-10 text-red-500'>No Time Slots Avilable On This Date</h1>
                    )}
                    <div className='sm:grid lg:grid-cols-6 md:grid-cols-2 col-span-6 gap-6'>
                    {avilable[0] && avilable.map((item, index) => (
                    <div key={index} className={item.booked === true ? 'text-black border bg-slate-300 text-center max-h-10 p-2 cursor-pointer' 
                    : newSlot === index ? 'bg-orange-400 text-white text-center max-h-10 p-2 cursor-pointer'
                    : 'text-orange-500 border border-orange-500 text-center max-h-10 p-2 cursor-pointer'
                    }
                    onClick={()=>handleTime(index)}>
                       {formatTime(item.slot)}
                    </div>
                    ))}
                    </div>
                    
                    
                   
                </div>
                <div className='mx-auto col-span-12'>
                    

                    {avilable && (
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
