import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../Utils/const'
function VerificationForm() {

    const token = localStorage.getItem("token");
    const [selection , setSelection] = useState();
    const [formData , setFormData] = useState();
    

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
    },[])
  return (
    <>
         <div className='text-center font-bold text-orange-500 text-2xl'>Upload Details</div>
         <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-xl">


                <div class="my-5  mx-auto">
                <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 ">Select Qualification</label>
                <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                    <option selected>Choose a Qualification</option>
                    {selection && selection.qualifications.map((qualification) => (
                    <option key={qualification.id} value={qualification.id}>
                        {qualification.qualification}
                    </option>
                ))}
                </select>
                </div>

                <div class="my-5  mx-auto">
                <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 ">Select Gender</label>
                <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                    <option selected>Gender </option>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                    <option value="3">Other</option>
                </select>
                </div>

                <div class="my-5  mx-auto">
                <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 ">Select Language</label>
                <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                    <option selected>Choose</option>
                    {selection && selection.languages.map((language) => (
                    <option key={language.id} value={language.id}>
                        {language.language}
                    </option>
                ))}
                </select>
                </div>

                <div class="my-5  mx-auto">
                <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 ">Select Specialization</label>
                <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
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
                  autoComplete="email"
                   required
                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
                />
              </div>
            </div>


            

                <label className=" my-5 block mb-2 text-sm font-medium text-gray-900 " for="file_input">Upload Proof Of Qualification</label>
                <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-1" id="file_input" type="file"/>

                <label className="my-5 block mb-2 text-sm font-medium text-gray-900 " for="file_input">Upload Proof Of Work Experience</label>
                <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-1" id="file_input" type="file"/>

                <label className="my-5 block mb-2 text-sm font-medium text-gray-900 " for="file_input">Upload Profile Photo</label>
                <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-1" id="file_input" type="file"/>

                <button
                className="flex w-1/6  justify-center text-center rounded-xl bg-orange-500 px-3 py-1.5 my-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
              >
                Upload
              </button>
            </div>
        </div>

    </>
  )
}

export default VerificationForm