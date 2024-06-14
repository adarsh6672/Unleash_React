import React, { useState } from 'react'
import { AxiosInstance } from '../../Utils/AxiosInstance';
import { toast} from 'react-hot-toast';
import UpdatePassword from './UpdatePassword';


function ProfileData(props) {
    const { profileData } = props;
    const [data, setData] = useState(profileData);
    const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

    const success = (message) => {
        toast.success(message);
     };

     const failed = (message) => {
        toast.error(message);
     };
  
    const handleChange=(e)=>{
        setData({
            ...data,
            [e.target.name]: e.target.value
          });
    }

    const handleUpdate = async()=>{
       const obj ={
            fullName : data.fullname,
            phone : data.phone
        }
        console.log(obj)

        await AxiosInstance.put('/user/update-profile-data',obj)
        .then(res=>{
            console.log(res.data)
            success('Successfully Updated')
        }).catch(err=>{
            console.log(err)
            failed('Updation Failed')
        })
    }


    return (
        <>
            <div className="flex justify-center px-6  lg:px-8">
                <div className="mx-auto w-full sm:max-w-xl">
                    <div className='text-end py-3'>
                        <button className='text-white bg-orange-500 font-bold rounded-md px-2 py-1'
                        onClick={toggleModal}>Change Password</button>
                    </div>
                    <div>
                        <label className="block text-sm font-medium  text-gray-900">
                            Full Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="fullname"
                                name="fullname"
                                type="text"
                                onChange={handleChange}
                                value={data.fullname}
                                required
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
                            />
                        </div>
                    </div>
                    <div className="my-5  mx-auto">
                        <label for="countries" className="block mb-2 text-sm font-medium text-gray-900 ">Mail Id</label>
                        <div
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                            {data.email}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium  text-gray-900">
                            Phone Number
                        </label>
                        <div className="mt-2">
                            <input
                                id="fullname"
                                name="phone"
                                type="number"
                                onChange={handleChange}
                                value={data.phone}
                                required
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
                            />
                        </div>
                    </div>

                    <div className='py-3 text-end'>
                        <button className='px-2 py-1 bg-orange-500 font-bold text-white rounded-lg'
                        onClick={handleUpdate}>Update</button>
                    </div>
                </div>
            </div>
            {showModal && <UpdatePassword closeModal={toggleModal}/>}
        </>
    )
}

export default ProfileData
