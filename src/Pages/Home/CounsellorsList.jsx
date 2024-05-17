
import Header from '../../Components/Header'
import image from '../../Assets/imgs/banner2.jpg'
import FilterCounselor from '../../Components/Filter/FilterCounselor'
import Footer from '../../Components/Footer'

function CounsellorsList() {

  

  return (
    <>
        <Header />
        <div className='h-52 pb-14 md:h-auto bg-right bg-no-repeat bg-cover sm:grid grid-cols-12' style={{backgroundImage:`url(${image})`}}>
        
          <div className='hidden ml-10 lg:mt-28 md:block lg:col-span-4 md:col-span-6 py-6  max-h-72 px-12  w-auto6 mt-10 rounded-2xl opacity-85 text-center'>
            
            <h1 className='md:text-md lg:text-2xl font-bold text-left '> We Have Best Professionals -</h1>
            <h1 className='md:text-sm lg:text-2xl font-bold text-left  py-4'>  Licenced And Verified , Who Can Help You Heal !</h1>
            <button
                
                className="flex w-auto p-2  justify-center rounded-xl bg-orange-600  text-lg font-semibold  text-white shadow-sm shadow-white hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
              >
                Get A Recommendation
              </button>
          </div>
        </div>
        <div className='block md:hidden px-5 text-center  text-black py-5  w-full'>
            <h1 className='text-md text-orange-400 font-bold  '> We Have Best Professionals</h1>
            <h1 className='text-md lg:text-lg font-bold  '>  Licenced And Verified , Who Can Help You Heal !</h1>
            <button
                
                className="  justify-center rounded-2xl bg-orange-400  p-2 text-sm font-semibold  text-white shadow-sm shadow-slate-700 hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
              >
                Get A Recommendation
              </button>
          </div>
          <FilterCounselor/>

          <Footer />
    </>
  )
}

export default CounsellorsList