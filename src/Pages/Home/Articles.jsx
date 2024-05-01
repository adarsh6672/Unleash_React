import React from 'react'
import Header from '../../Components/Header'
import { useLocation, useNavigate } from 'react-router-dom'
import Footer from '../../Components/Footer';

function Articles() {
    const navigate = useNavigate()
    const location = useLocation()
    const data = location.state
    console.log(data.content)

    const lines = data.content.split('\n');
   
    return (
        <>
            <Header />
            <div className=' '>
                <button className='bg-orange-500 m-5 px-10 rounded-2xl text-white text-sm'
                    onClick={() => navigate(-1)}>-Back</button>
            </div>
            <div className='p-5'>
                <h1 className='text-center text-3xl font-bold  p-2'>{data.title}</h1>

                <div className='p-5 px-10'>
                    <img src={data.image} alt="" className='object-cover  rounded-xl w-screen h-96 shadow-md shadow-slate-300' />
                </div>
               
                <div className='text-lg text-justify p-10 border-b-2  border-orange-500'>
                    {lines.map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            <br />
                        </React.Fragment>
                    ))}
                </div>
                <div className='text-center '>
                <button className='bg-orange-500 m-5 p-2 px-10 rounded-2xl text-white text-sm'
                    onClick={() => navigate(-1)}>-Back</button>
            </div>
            </div>

                    <Footer />

        </>
    )
}

export default Articles
