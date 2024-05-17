import React, { useEffect, useState } from 'react'
import DashHeader from '../../../Components/SidePanel/DashHeader'
import AdminSidepanal from '../../../Components/SidePanel/AdminSidePanal'
import { LineGraph } from '../../../Components/Chart/Line'
import { AxiosInstance } from '../../../Utils/AxiosInstance'
import { BarGraph } from '../../../Components/Chart/Bar'
import { BsBorderWidth } from 'react-icons/bs'

function AdminDashboard() {
  const [dashData, setDashData] = useState()
  const [label , setLabel]= useState([])
  const [dataSet , setDataSet]= useState([])
  const [wise, setWise] = useState('DAILY')

  useEffect(() => {
    AxiosInstance.get('consultation/admin/get-dashboard-data')
      .then(res => {
        setDashData(res.data)
        
        
      }).catch(err => {
        console.log(err)
      })
  },[])

  useEffect(()=>{
    AxiosInstance.get(`/consultation/admin/subscription-data/${wise}`)
    .then(res=>{
      console.log(res.data)
      setDataSet(res.data)
    }).catch(err=>{
      console.log(err)
    })
  },[wise])

  const splitData=(d)=>{
    d.map(item=>(
      
      setDataSet(prev=> [...prev,item.y])
    ))
    console.log(label)
    console.log(dataSet)

  }
  const data = {
    labels: [],
    datasets: [{
      label: 'INCOME',
      borderColor: 'red',
      borderWidth: 1,
      backgroundColor: 'green',
      data: dataSet
    }
    ],

  }
  return (
    <>
      <DashHeader />
      <div className='flex '>
        <AdminSidepanal />
        <div className='sm:w-full  px-4'>
          {dashData && (
            <div className='sm:grid grid-cols-12 min-h-32 gap-10'>
              <div className='col-span-3 rounded-lg bg-slate-100 shadow-lg shadow-slate-400 p-5'>
                <h1 className='text-center text-lg font-medium text-orange-500'>Active Subscribers</h1>
                <h1 className='text-center text-lg font-bold text-indigo-800 p-5'>{dashData.activeSubscribers}</h1>
              </div>
              <div className='col-span-3 rounded-lg bg-slate-100 shadow-lg shadow-slate-400 p-5'>
                <h1 className='text-center text-lg font-medium text-orange-500'>Total Patients</h1>
                <h1 className='text-center text-lg font-bold text-indigo-800 p-5'>{dashData.totalPatients}</h1>
              </div>
              <div className='col-span-3 rounded-lg bg-slate-100 shadow-lg shadow-slate-400 p-5'>
                <h1 className='text-center text-lg font-medium text-orange-500'>Total Counselors</h1>
                <h1 className='text-center text-lg font-bold text-indigo-800 p-5'>{dashData.totalCounselors}</h1>
              </div>
              <div className='col-span-3 rounded-lg bg-slate-100 shadow-lg shadow-slate-400 p-5'>
                <h1 className='text-center text-lg font-medium text-orange-500'>Todays Income</h1>
                <h1 className='text-center text-lg font-bold text-indigo-800 p-5'>₹  {dashData.todayIncome}</h1>
              </div>
            </div>
          )

          }

          <div className='  mx-auto mt-10 bg-slate-100 shadow-lg shadow-slate-200 rounded-md mb-10'>
          <h1 className='text-xl text-orange-500 font-bold p-2'>SUBSCRIPTION DATA</h1>
            <div className='w-3/4  mx-auto mt-10 '>
              <div className='flex justify-between'>
              <h1> SHOWING THE {wise} DATA</h1>
              <button className='bg-orange-300' onClick={()=>setWise('DAILY')}>WEEK DATA</button>
              <button className='bg-orange-300' onClick={()=>setWise('MONTHLY')}>MONTH DATA</button>
              </div>
              
              <BarGraph data={data} />
            </div>

          </div>
        </div>
      </div>


    </>
  )
}

export default AdminDashboard