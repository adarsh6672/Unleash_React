import React, { useEffect, useState } from 'react'
import DashHeader from '../../../Components/SidePanel/DashHeader'
import UserSidebar from '../../../Components/SidePanel/UserSidebar'
import ProfilePhoto from '../../../Components/profile/ProfilePhoto';
import { AxiosInstance } from '../../../Utils/AxiosInstance';
import ProfileData from '../../../Components/profile/ProfileData';
function Profile() {
  const [profileData, setProfileData] = useState()
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    AxiosInstance.get('/user/get-user-data')
      .then(res => {
        setProfileData(res.data)
        console.log(res.data)
      }).catch(err => {
        console.log(err)
      })

  }, [update])

  const handleProfilePicUpdate = () => {
    setUpdate(!update)
  }
  return (
    <>
      <DashHeader />
      <div className='flex '>
        <UserSidebar />
        <div className='sm:w-full  p-4'>
          {profileData && (
            <div>
              <ProfilePhoto profileName={profileData.fullname} profilePic={profileData.profilePic} onProfilePicUpdate={handleProfilePicUpdate} />

              <ProfileData profileData={profileData} />
            </div>
          )}

        </div>
      </div>
    </>
  )
}

export default Profile