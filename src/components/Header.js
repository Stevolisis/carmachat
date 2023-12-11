import { IoMdClose } from 'react-icons/io'
import { FiMenu } from 'react-icons/fi';

export default function Header({page,auth,userInfo,signOut,menuStatus,setMenuStatus}){

  return(
    <>
      
      { page !== 'home' ? <header className=' p-7 pb-5'>
        <h1 className='text-bgSecondary text-2xl'>
          <a href='/' className='font-extrabold'>CarmChat</a>
        </h1>
      </header> 
      
      : 

      <header className="flex justify-between items-center px-7 py-5">
        <div>
            <h1 className='text-bgSecondary text-2xl'>
              <a href='/' className='font-extrabold'>CarmChat</a>
            </h1>
        </div>

        <div className="hidden text-xs font-medium sm:flex gap-7 md:gap-16">
            <a href='/' className="border-b-2 border-bgSecondary">Home</a>
            <a href='/#jobs'>Jobs</a>
            <a href='/#courses'>Courses</a>
            <a href='/#blog'>Blog</a>
        </div>

        <div className="hidden sm:flex gap-3">
          { auth ?
            <div onClick={()=>setMenuStatus(!menuStatus)}><p className="bg-bgSecondary rounded-full text-bgPrimary w-8 h-8 cursor-pointer flex justify-center items-center">{userInfo&&userInfo?.firstName.charAt(0)}</p></div>
            :
              <>
                <a href='/sign_up' className="font-semibold text-xs py-2 px-9 md:px-12 border border-gray-700 rounded-[4px]">Sign Up</a>
                <a href='/log_in' className="font-semibold text-sm py-2 px-9 md:px-12 rounded-[4px] bg-bgSecondary text-bgPrimary">Sign In</a>
              </>
          }
        </div>

        <div className="block sm:hidden">
        { auth ?
          <div onClick={()=>setMenuStatus(!menuStatus)}><p className="bg-bgSecondary rounded-full text-bgPrimary w-8 h-8 cursor-pointer flex justify-center items-center">{userInfo&&userInfo?.firstName.charAt(0)}</p></div>
          :
          (menuStatus ? 
          <IoMdClose size={22} onClick={()=>setMenuStatus(!menuStatus)} className='cursor-pointer'/> 
          : <FiMenu size={22} onClick={()=>setMenuStatus(!menuStatus)} className='cursor-pointer'/>)
        }
        </div>

        {
          menuStatus &&
          <div className="z-20 absolute right-2 top-24 text-bgPrimary font-medium bg-bgSecondary p-7 pt-10 w-[200px] rounded-md text-[13px]">
            { auth &&
              <>
                <div className="block mt-3 mb-3 py-2 px-3 -mx-1 text-center bg-bgPrimary text-bgSecondary rounded">{userInfo.firstName + ' ' + userInfo.lastName}</div>
              </>
            }
            <a href='/' className="block sm:hidden"> Home </a>
            <a href='/' className="block sm:hidden my-3 "> Jobs </a>
            <a href='/' className="block sm:hidden my-3 "> Courses </a>
            <a href='/' className="block sm:hidden my-3 "> Blog </a>
            {auth && <div onClick={()=>signOut()} className="cursor-pointer block mt-3 mb-3 py-2 px-3 -mx-1 text-center bg-red-600 text-bgPrimary rounded">Sign Out</div>}
            { !auth &&
              <>
                <a href='/sign_up' className="block mt-3 py-2 px-3 -mx-1 text-center bg-bgPrimary text-bgSecondary rounded">Sign Up</a>
                <a href='/log_in' className="block mt-3 py-2 px-3 -mx-1 text-center bg-bgPrimary text-bgSecondary rounded">Sign In</a>
              </>
            }
          </div>
        }

      </header>
      }

    </>
  )
}