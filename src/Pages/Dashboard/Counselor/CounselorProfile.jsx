import React, { useEffect, useState } from 'react'
import DashHeader from '../../../Components/SidePanel/DashHeader'
import CounselorSidebar from '../../../Components/SidePanel/CounselorSidebar'
import { useNavigate } from 'react-router-dom';
import { IoIosClose } from "react-icons/io";
import { BASE_URL } from '../../../Utils/const';
import axios from 'axios'
import ProfilePhoto from '../../../Components/profile/ProfilePhoto';
import { AxiosInstance } from '../../../Utils/AxiosInstance';
import Profile from '../User/Profile';
import UpdatePassword from '../../../Components/profile/UpdatePassword';
import toast from 'react-hot-toast';


function CounselorProfile() {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [profileData, setProfileData] = useState();
  const [fullname, setFullname] = useState(null);
  const [selection, setSelection] = useState();
  const [qualification, setQualification] = useState();
  const [laguages, setLanguages] = useState([]);
  const [yoe, setYoe] = useState();
  const [specialization, setSpecialization] = useState([]);
  const [gender, setGender] = useState();
  const [qaulfile, setQualfile] = useState();
  const [expfile, setExpfile] = useState();
  const [photo, setPhoto] = useState();
  const [loading, setLoading] = useState(false)
  const [qualupdate, setQualupdate] = useState(false);
  const [yoeupdate, setYoeUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toastSuccess = (message)=>{
    toast.success(message)
  }


  useEffect(() => {
    AxiosInstance.get('/user/counselor/get-profile-data')
      .then(res => {
        console.log(res)
        setProfileData(res.data)
        initialSet(res.data)
      }).catch(err => {
        console.log(err)
      })
  }, [])


  useEffect(() => {

    axios.get(BASE_URL + '/user/counselor/getselectiondata', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(resp => {
      setSelection(resp.data)

      console.log(resp.data)
    }).catch(err => {
      console.log(err)
    })
  }, []);

  const initialSet = (data) => {
    setFullname(data.user.fullname)
    data.languages.map((item) => {
      handleLanguage(item.id)
    })

    data.specializations.map((item) => {
      handleSpecialization(item.id)
    })

    setGender(data.gender.id)
    setYoe(data.yoe)
    setQualification(data.qualification.id)
  }

  const handleLanguage = (e) => {
    if (!laguages.includes(e)) {
      setLanguages(prevLang => [...prevLang, e]);
    }

  };

  const removeLanguage = (index) => {
    setLanguages(prevLang => prevLang.filter((_, i) => i !== index))
  }

  const handleSpecialization = (e) => {
    if (!specialization.includes(e)) {
      setSpecialization(prev => [...prev, e])
    }
  }

  const removeSpecialization = (index) => {
    setSpecialization(prev => prev.filter((_, i) => i !== index))
  }

  const handleQualification = (e) => {
    setQualupdate(true)
    setQualification(e)
  }

  const handleYoe = (e) => {
    setYoeUpdate(true)
    setYoe(e)
  }


  const handleUpload = async () => {
    setLoading(true)

    await axios.post(BASE_URL + '/user/counselor/profile-data-updation', {
      qualificationId: qualification,
      fullname: fullname,
      languages: laguages,
      yoe: yoe,
      specializations: specialization
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(resp => {
      console.log(resp.data)
      setLoading(false)
      toastSuccess('Updation Request Submitted')
    }).catch(err => {
      console.log(err)
      setLoading(false)
    })
    if (yoeupdate || qualupdate) {
      const formData = new FormData();
      formData.append('qualification', qaulfile);
      formData.append('experience', expfile);
      await axios.post(BASE_URL + '/counselor/documentUpdation', formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(resp => {
        console.log(resp.data)
        navigate('/counselor/submitted')
        toastSuccess('Updation Request Submitted')
      }).catch(err => {
        console.log(err)
        setLoading(false)
      })
    }

  }


  return (
    <>
      <DashHeader />
      <div className='flex gap-3'>
        <CounselorSidebar />
        <div className='sm:w-full  p-4 '>
          {profileData && (
            <ProfilePhoto profileName={profileData.user.fullname} profilePic={profileData.user.profilePic} />
          )}



          <div className="flex min-h-full  justify-center px-6  lg:px-8">

            <div className="sm:mx-auto sm:w-full sm:max-w-xl">
              <div className='text-end py-3'>
                <button className='text-white bg-orange-500 font-bold rounded-md px-2 py-1'
                  onClick={toggleModal}>Change Password</button>
              </div>
              {profileData && (
                <div>
                  <label className="block text-sm font-medium  text-gray-900">
                    Full Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="fullname"
                      name="fullname"
                      type="text"
                      onChange={(e) => setFullname(e.target.value)}
                      value={fullname}
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
                    />
                  </div>
                </div>

              )}

              {profileData && (
                <div className="my-5  mx-auto">
                  <label for="countries" className="block mb-2 text-sm font-medium text-gray-900 ">Mail Id</label>
                  <div
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                    {profileData.user.email}
                  </div>
                </div>
              )}



              {profileData && (
                <div className="my-5  mx-auto">
                  <label for="countries" className="block mb-2 text-sm font-medium text-gray-900 ">Gender</label>
                  <div
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                    {profileData.gender.gender}
                  </div>
                </div>
              )}

              <div className="my-5  mx-auto">
                <label for="countries" className="block mb-2 text-sm font-medium text-gray-900 ">Language</label>
                {laguages && (
                  <ul className='flex gap-5'>
                    {laguages.map((item, index) => (
                      <li className='flex' key={index} onClick={() => removeLanguage(index)}>{selection.languages[item - 1].language}<IoIosClose /></li>

                    ))}
                  </ul>
                )}
                <select id="countries" onChange={(e) => handleLanguage(e.target.value)}
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
                <label for="countries" className="block mb-2 text-sm font-medium text-gray-900 ">Specialization</label>
                {laguages && (
                  <ul className='flex gap-5'>
                    {specialization.map((item, index) => (
                      <li className='flex' key={index} onClick={() => removeSpecialization(index)}>{selection.specializations[item - 1].specilization}<IoIosClose /></li>

                    ))}
                  </ul>
                )}
                <select id="countries" onChange={e => handleSpecialization(e.target.value)}
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
                <label className="block text-sm font-medium  text-gray-900">
                  Year Of Experience
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="number"
                    value={yoe}
                    onChange={(e) => handleYoe(e.target.value)}
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
                  />
                </div>
              </div>
              <div className="my-5  mx-auto">
                <label for="countries" className="block mb-2 text-sm font-medium text-gray-900 ">Qualification</label>
                <select id="countries" value={qualification} onChange={(e) => handleQualification(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                  <option selected> Qualification</option>
                  {selection && selection.qualifications.map((qualification) => (
                    <option key={qualification.id} value={qualification.id}>
                      {qualification.qualification}
                    </option>
                  ))}
                </select>
              </div>


              {qualupdate && (
                <div>
                  <label className=" my-5 block mb-2 text-sm font-medium text-gray-900 " for="file_input">Upload Proof Of Qualification</label>
                  <input onChange={e => setQualfile(e.target.files[0])}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-1" id="file_input" type="file" />

                </div>
              )}

              {yoeupdate && (
                <div>
                  <label className="my-5 block mb-2 text-sm font-medium text-gray-900 " for="file_input">Upload Proof Of Work Experience</label>
                  <input onChange={e => setExpfile(e.target.files[0])}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-1" id="file_input" type="file" />

                </div>
              )}



              {loading && (
                <button
                  type="submit"
                  className="flex w-1/2 mx-auto mt-5 justify-center rounded-2xl bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
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
                  className="flex w-1/2 mx-auto mt-5 cursor-pointer justify-center rounded-2xl bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                >
                  Request For Updation
                </button>
              )}
            </div>
          </div>


        </div>
      </div>
      {showModal && <UpdatePassword closeModal={toggleModal} />}
    </>
  )
}

export default CounselorProfile
