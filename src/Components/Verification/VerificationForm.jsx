import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../Utils/const'
import { useNavigate } from 'react-router-dom';
import { IoIosClose } from "react-icons/io";
function VerificationForm() {

    const navigate= useNavigate();
    const token = localStorage.getItem("token");
    const [selection , setSelection] = useState();
    const [qualification , setQualification]= useState();
    const [laguages , setLanguages]= useState([]);
    const [yoe , setYoe] = useState();
    const [specialization , setSpecialization]= useState([]);
    const [gender , setGender] = useState();
    const [qaulfile , setQualfile] = useState();
    const [expfile , setExpfile] = useState();
    const [photo , setPhoto]= useState();
    const [loading , setLoading]= useState(false)
    

    useEffect(()=>{
        
         axios.get(BASE_URL+'/user/counselor/getselectiondata',{
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

    const handleLanguage=(e)=>{
        if(!laguages.includes(e)){
            setLanguages(prevLang=> [...prevLang,e]);
        }
        
    };

    const removeLanguage=(index)=>{
        setLanguages(prevLang=> prevLang.filter((_, i) => i !== index))
    }

    const handleSpecialization=(e)=>{
        if(!specialization.includes(e)){
            setSpecialization(prev => [...prev,e])
        }
    }

    const removeSpecialization=(index)=>{
        setSpecialization(prev=> prev.filter((_,i)=> i !== index))
    }


    const handleUpload =async()=>{
        setLoading(true)
        const formData = new FormData();
        formData.append('qualification',qaulfile);
        formData.append('experience',expfile);
        formData.append('profilePic',photo);
        await axios.post(BASE_URL+'/counselor/dataupload',{
            qualificationId : qualification,
            genderId : gender,
            languages : laguages,
            yoe : yoe,
            specializations : specialization
        },{
            headers :{
                'Authorization':`Bearer ${token}`
            }
        }).then(resp=>{
            console.log(resp.data)
        }).catch(err=>{
            console.log(err)
            setLoading(false)
        })

        await axios.post(BASE_URL+'/user/counselor/documentupload',formData,{
            headers :{
                'Authorization':`Bearer ${token}`
            }
        }).then(resp=>{
            console.log(resp.data)
            navigate('/counselor/submitted')
        }).catch(err =>{
            console.log(err)
            setLoading(false)
        })
    }
  return (
    <>
         <div className='text-center font-bold text-orange-500 text-2xl'>Upload Details</div>
         <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-xl">


                <div className="my-5  mx-auto">
                <label for="countries" className="block mb-2 text-sm font-medium text-gray-900 ">Select Qualification</label>
                <select id="countries" value={qualification} onChange={(e)=>setQualification(e.target.value)}
                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                    <option selected>Choose a Qualification</option>
                    {selection && selection.qualifications.map((qualification) => (
                    <option key={qualification.id} value={qualification.id}>
                        {qualification.qualification}
                    </option>
                ))}
                </select>
                </div>

                <div className="my-5  mx-auto">
                <label for="countries" className="block mb-2 text-sm font-medium text-gray-900 ">Select Gender</label>
                <select id="countries" value={gender}  onChange={(e)=>setGender(e.target.value)}
                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                    <option selected>Gender </option>
                    <option value='1'>Male</option>
                    <option value='2'>Female</option>
                    <option value='3'>Other</option>
                </select>
                </div>

                <div className="my-5  mx-auto">
                <label for="countries" className="block mb-2 text-sm font-medium text-gray-900 ">Select Language</label>
                {laguages && (
                    <ul className='flex gap-5'>
                    {laguages.map((item, index) => (
                        <li className='flex' key={index} onClick={()=>removeLanguage(index)}>{selection.languages[item-1].language }<IoIosClose /></li>
                        
                    ))}
                </ul>
                )}
                <select id="countries"  onChange={(e)=>handleLanguage(e.target.value)}
                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                    <option selected>Choose</option>
                    {selection && selection.languages.map((language) => (
                    <option key={language.id} value={language.id}>
                        {language.language}
                    </option>
                ))}
                </select>
                </div>

                <div className="my-5  mx-auto">
                <label for="countries" className="block mb-2 text-sm font-medium text-gray-900 ">Select Specialization</label>
                {laguages && (
                    <ul className='flex gap-5'>
                    {specialization.map((item, index) => (
                        <li className='flex' key={index} onClick={()=>removeSpecialization(index)}>{selection.specializations[item-1].specilization }<IoIosClose /></li>
                        
                    ))}
                </ul>
                )}
                <select id="countries" onChange={e=>handleSpecialization(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                    <option selected>Choose</option>
                    {selection && selection.specializations.map((specialization) => (
                    <option key={specialization.id} value={specialization.id}>
                        {specialization.specilization}
                    </option>
                ))}
                </select>
                </div>

                <div>
              <label  className="block text-sm font-medium  text-gray-900">
                Year Of Experience 
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="number"
                  onChange={(e)=>setYoe(e.target.value)}
                   required
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
                />
              </div>
            </div>


            

                <label className=" my-5 block mb-2 text-sm font-medium text-gray-900 " for="file_input">Upload Proof Of Qualification</label>
                <input onChange={e=>setQualfile(e.target.files[0])}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-1" id="file_input" type="file"/>

                <label className="my-5 block mb-2 text-sm font-medium text-gray-900 " for="file_input">Upload Proof Of Work Experience</label>
                <input onChange={e=>setExpfile(e.target.files[0])}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-1" id="file_input" type="file"/>

                <label className="my-5 block mb-2 text-sm font-medium text-gray-900 " for="file_input">Upload Profile Photo</label>
                <input onChange={e=>setPhoto(e.target.files[0])}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-1" id="file_input" type="file"/>

{loading && (
                <button
                type="submit"
                className="flex w-full justify-center rounded-2xl bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
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
              
                {!loading && (
                  <button
                  
                  onClick={handleUpload}
                  className="flex w-full cursor-pointer justify-center rounded-2xl bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                >
                  Submit
                </button>
                )}
            </div>
        </div>

    </>
  )
}

export default VerificationForm