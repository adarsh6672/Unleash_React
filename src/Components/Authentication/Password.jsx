import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../Utils/const';
function Password() {

    const [formData , setFormData]= useState({
        password : '',
        confpassword : ''
      });
      
      const navigate = useNavigate();
      const [err , setErr]= useState('');
      const [loading , setLoading] = useState('');
  
     
  
      const handleChange=(e)=>{
        const {name , value} = e.target;
        setFormData({
          ...formData,
          [name]:value
        });
        
      };
  
  
      const handleSubmit=(e) =>{
        e.preventDefault();
        if(formData.password ==='' || formData.password!==formData.confpassword){
            setErr("Pasword Does Not Matching")
        }else{
            setErr('');
        setLoading(true);
        console.log(formData)
        
          axios.post(BASE_URL+'/password/forgot/newpassword',{
            email : localStorage.getItem("forgotmail"),
            password : formData.password
          }).then(resp =>{
            console.log(resp.data);
            navigate("/login");
            localStorage.removeItem("forgotmail");
          }).catch(error =>{
            console.log(error.response)
            setErr("Internal Error")
            setLoading(false);
  
          });
        }
        
        
      }


  return (
    <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
         
          <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-indigo-900">
            UPDATE PASSWORD
          </h2>
          
        </div>
        <div className=' text-red-500 text-center font-bold pt-3' >
            {err && (
              <h2>{err}</h2>
            )}
          </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                New Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="block w-full p-4 rounded-2xl border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-orange-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confpassword"
                  name="confpassword"
                  type="confpassword"
                  value={formData.confpassword}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-2xl border-0 p-4 py-1.5 text-gray-900 shadow-sm ring-1  ring-inset ring-orange-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
                {!loading && (
                    <button
                    onClick={handleSubmit}
                    className="flex w-full justify-center rounded-2xl bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                  >
                    Update
                  </button>
                )}
                 {loading && (
                    <button
                    className="flex w-full justify-center rounded-2xl bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                  >
                    Update
                  </button>
                )}
              
            </div>
          </form>

          
        </div>
      </div>
    </>
  )
}

export default Password