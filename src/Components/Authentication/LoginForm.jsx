import React, { useState } from 'react'
import axios from 'axios';
import { BASE_URL } from '../../Utils/const';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector , useDispatch } from 'react-redux';
import { setUserData } from '../../Redux/Slice/UserDataSlice';
import { userLogin } from '../../Redux/Slice/AuthSlice';
function LoginForm() {
    const [formData , setFormData]= useState({
      username : '',
      password : ''
    });
    
    const navigate = useNavigate();
    const [err , setErr]= useState('');
    const [loading , setLoading] = useState('');

    const dispatch= useDispatch();
   

    const handleChange=(e)=>{
      const {name , value} = e.target;
      setFormData({
        ...formData,
        [name]:value
      });
      
    };

    const validateForm = () => {
      let isValid = true;
        
      // Validate email
      if (!formData.username) {
        setErr("Invalid Mail Id")
        isValid = false;
      }
      var re = /\S+@\S+\.\S+/;
      if(!re.test(formData.username)){
        setErr("Invalid Mail Id")
        isValid=false;
      }
  
      // Validate password
      if (formData.password.length<6) {
        setErr("Password Must Be 6 Characters")
        isValid=false;
      }
        var pass = formData.password;
        var reg = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{7,}$/;
        var test = reg.test(pass);
        // if (!test) {
        //     isValid = false;
        //     setErr("Password must contain at least one uppercase letter, one lowercase letter, and one digit");
        // }
        
      
      return isValid;
    };


    const handleSubmit=(e) =>{
      e.preventDefault();
      setErr('');
      console.log(formData)
      if(validateForm()){
          setLoading(true);
          axios.post(BASE_URL+'/auth/login',formData).then(resp =>{
          console.log(resp.data);
          dispatch(setUserData(resp.data))
          localStorage.setItem('token',resp.data.token);
          localStorage.setItem('role',resp.data.role);
          dispatch(userLogin())
          navigate("/")
        }).catch(error =>{
          console.log(error.response)
          setErr("Bad Credentials (Incorrect Email or Password ... !)")
          setLoading(false);

        });
      }
      
        
      
    }

    const forgotPassword= ()=>{
      if(formData.username===''){
        setErr("Enter The Mail Id");
      }else{
        setLoading(true)
        let email = formData.username;
        localStorage.setItem("forgotmail",email);
        axios.post(BASE_URL+'/auth/password/forgot',{
          email
        }).then(resp =>{
          console.log(resp.data);
          navigate("/forgotpassword");
        }).catch(error =>{
          console.log(error.response)
          setErr("Email Not Found... !")
          setLoading(false);

        });
        
      }
      
    }
    
  return (
    <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
         
          <h2 className="sm:mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-indigo-900">
            LOG IN 
          </h2>
          <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-500">
            New To Unleash ? <Link to="/signup" className=' text-orange-500' >Sign Up</Link>
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
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="email"
                  autoComplete="email"
                  value={formData.username}
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
                <div className="text-sm">
                  {!loading && (
                    <div 
                    onClick={forgotPassword}
                   className="font-semibold cursor-pointer text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </div>
                  )}
                  
                </div>
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
              {!loading && (
                <button
                onClick={handleSubmit}
                className="flex w-full justify-center rounded-2xl bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
              >
                Log in
              </button>
              )}
               
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

              
            </div>
          </form>

          
        </div>
      </div>
    </> 
  )
}

export default LoginForm