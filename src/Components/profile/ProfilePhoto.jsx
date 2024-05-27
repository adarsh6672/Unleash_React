import React, { useRef } from 'react'
import profilepicPlaceHolder from '../../Assets/imgs/profilePic.jpg'
import camicon from '../../Assets/imgs/camicon.png'
import { FaCamera } from "react-icons/fa";
import { AxiosInstance } from '../../Utils/AxiosInstance';

function ProfilePhoto({ profilePic, profileName , onProfilePicUpdate }) {
  const fileInputRef = useRef(null);

  const handleCameraIconClick = () => {
    fileInputRef.current.click();
  };

  const handleProfilePicUpdate=async(event)=>{
    const formData = new FormData();
    formData.append('profilePic', event.target.files[0]);

    await AxiosInstance.post('/user/update-profile-photo',formData)
    .then(res=>{
      console.log('profile photo updated ')
      onProfilePicUpdate()
    })
    .catch(err=>console.log(err))
  }

  return (

    <>

      <div className="w-2/3 mx-auto flex sm:grid grid-cols-3 bg-gradient-to-r from-orange-300 to-indigo-300 rounded-lg shadow-lg shadow-slate-300">
        <div className="p-5 col-span-1 relative inline-block">
          {profilePic ? (
            <img
              src={profilePic}
              alt=""
              className="object-cover rounded-full w-40 h-40 hover:bg-opacity-40"
            />
          ) : (
            <img
              src={profilepicPlaceHolder}
              alt=""
              className="object-cover rounded-full w-40 h-40"
            />
          )}
          <div className="absolute top-0 cursor-pointer w-full h-full text-5xl bg-gray-800 bg-opacity-0 flex items-center justify-center transition-opacity duration-300 rounded-full opacity-0 hover:opacity-60"
          onClick={handleCameraIconClick}>
            <input type="file"ref={fileInputRef}
        onChange={handleProfilePicUpdate}
        className="hidden" />
          <FaCamera />
          </div>
        </div>
        <div className="col-span-2 my-auto">
          <h1 className="text-5xl font-medium">Hello, {profileName}</h1>
        </div>
      </div>

    </>

  )
}

export default ProfilePhoto
