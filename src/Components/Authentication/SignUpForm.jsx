import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../Utils/const';
import { Link, useNavigate } from 'react-router-dom';


function SignUpForm({isCounselor}) {
    const [counselor , setCounselor]= useState("USER SIGN UP");
    const [err, setErr]= useState('');
    const navigate = useNavigate();
    const [loading , setLoading] = useState(false);
    const [formData , setFormData]=useState({
        fullname :'',
        email : '',
        phone : '',
        password : '',
        role : 'USER'
      });
  
    useEffect(()=>{
        if(isCounselor){
            setCounselor("COUNSELOR SIGN UP FORM")
            setFormData({
              ...formData,
              role : 'COUNSELOR'
            })
        }
    },[]);

    
      const handleChange=(e)=>{
        const {name , value} = e.target;
        setFormData({
          ...formData,
          [name]:value
        });
        
      };
  
      const handleSubmit=(e) =>{
        e.preventDefault();
        setErr('');
        setLoading(true);
        console.log(formData)
        localStorage.setItem("email",formData.email);
        
          axios.post(BASE_URL+'/register',formData).then(resp =>{
            console.log(resp.data)
            navigate("/otp" ,{state:formData.email})
          }).catch(error =>{
            console.log(error.response)
            setErr(error.response.data)
            setLoading(false);

          });
        
      }
    

  return (
    <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
         
          <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-indigo-800">
            {counselor} 
          </h2>
          <h2 className="mt-3 text-center text-2xl font-bold leading-8 tracking-tight text-gray-500">
            Already Have An Unleash Account ? <Link className=' text-orange-500' to="/login">Log In</Link>
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className='bg-red-100 text-red-700 text-center font-bold'>
            {err && (
              <h2>{err}</h2>
            )}
          </div>
          
          <form className="space-y-6" >
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="fullname"
                  name="fullname"
                  type="text"
                  value={formData.fullname}
                  onChange={handleChange}
                  required
                  className="block w-full p-4 rounded-2xl border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-orange-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-2xl border-0 p-4 py-1.5 text-gray-900 shadow-sm ring-1  ring-inset ring-orange-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="number"
                  value={formData.phone}
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
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-2xl border-0 p-4 py-1.5 text-gray-900 shadow-sm ring-1  ring-inset ring-orange-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
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
                  
                  onClick={handleSubmit}
                  className="flex w-full cursor-pointer justify-center rounded-2xl bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                >
                  Sign Up
                </button>
                )}
              
              
                
            </div>
          </form>

          
        </div>
      </div>
    </>
  )
}

export default SignUpForm