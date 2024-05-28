import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import { AxiosInstance } from '../../Utils/AxiosInstance';


function UpdatePassword({ closeModal }) {
    const [data , setData]= useState({
        currentPassword : '',
        newPassword : '',
        confirmNewPassword: ''
    })

    const passwordValidation = () =>{
        if(data.newPassword!==data.confirmNewPassword ){
            failed('New Password And Confirm Password Does Not Match ... Try Again..!')
            return false
        }
        var pass = data.confirmNewPassword;
        var reg = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        
        if (reg.test(pass)===false) {
            failed("Password must contain at least one uppercase letter, one lowercase letter, and one digit");
            return false
        }
        return true
    }

    const success=(message)=>{
        toast.success(message)
    }
    const failed=(message) =>{
        toast.error(message)
    }

    const handleChange=(e)=>{
        setData({
            ...data,
            [e.target.name]: e.target.value
          });
    }

    const handleUpdate = async() =>{
        if(passwordValidation()){
            const obj = {
                oldPassword: data.currentPassword,
                newPassword: data.newPassword
            }
            await AxiosInstance.put('/user/update-password',obj)
            .then(res=>{
                console.log(res)
                success('Password Updated Successfully..')
                closeModal()
            }).catch(err=>{
                console.log(err)
                failed('Incorrect Current Password... Try Again.!')
            })
        }
    }

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-10 rounded shadow-md w-2/4">
                    <h1 className='text-xl text-orange-500 font-bold text-center'>Change Password </h1>
                    <div>
                        <label className="block text-sm font-medium  text-gray-900">
                            Current Password
                        </label>
                        <div className="mt-2">
                            <input
                                id="currentPassword"
                                name="currentPassword"
                                type="password"
                                onChange={handleChange}
                                value={data.currentPassword}
                                required
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium  text-gray-900">
                            New Password
                        </label>
                        <div className="mt-2">
                            <input
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                onChange={handleChange}
                                value={data.newPassword}
                                required
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium  text-gray-900">
                            Confirm New Password
                        </label>
                        <div className="mt-2">
                            <input
                                 id="confirmNewPassword"
                                 name="confirmNewPassword"
                                 type="password"
                                 onChange={handleChange}
                                 value={data.confirmNewPassword}
                                required
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
                            />
                        </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <button className="mr-2 bg-orange-400 hover:bg-orange-500 text-white px-2 py-1 rounded" onClick={handleUpdate}>Update</button>
                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-2 py-1 rounded" onClick={closeModal}>Cancel</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdatePassword
