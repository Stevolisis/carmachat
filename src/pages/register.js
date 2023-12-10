import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import { PiWarningFill } from 'react-icons/pi';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Swal from 'sweetalert2';
import Header from '../components/Header';

export default function Register() {
  const [first_name,setFirst_name] = useState('');
  const [last_name,setLast_name] = useState('');
  const [email,setEmail] = useState('');
  const [phone_number,setPhone_number] = useState('');
  const [age_range,setAge_range] = useState('');
  const [gender,setGender] = useState('');
  const [password,setPassword] = useState('');
  const [validphone_number,setValidphone_number] = useState(true);
  const [validEmail,setValidemail] = useState(true);
  const [showPassword,setShowpassword] = useState(false);
  const [validpassword,setValidpassword] = useState(false);
  const [loading,setLoading] = useState(false);

  function isValidEmail(e) {
    setEmail(e.target.value);
    if(/\S+@\S+\.\S+/.test(e.target.value)){
      setValidemail(true);
    }else{
      setValidemail(false);
    }
  }

  function isValidatePassword(e){
    setPassword(e.target.value);
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]+$/;
    console.log(passwordRegex.test(e.target.value));
    if(passwordRegex.test(e.target.value)){
      setValidpassword(true);
    }else{
      setValidpassword(false);
    }
  };

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
    customClass:'toaster'
  });

  function handleSubmit(e){
    e.preventDefault();
    if(isValidEmail && isValidatePassword && phone_number.length === 13){

    }
  }

  return (
    <>
    <Header/>
      <main className=" pt-12 sm:pt-20 flex justify-center items-center flex-col text-txtPrimary">
        
        <div className='absolute -z-10 right-[8vw] top-[7vh] sm:right-[20vw] sm:top-[10vh]'>
          <img
            src='/blue_circle.png'
            alt='blue_circle'
            width={90}
            height={90}
          />
        </div> 
  
        <div className='absolute -z-10 left-[2vw] sm:left-[10vw] sm:top-[50vh]'>
          <img
            src='/yellow_circle.png'
            alt='yellow_circle'
            width={40}
            height={40}
            className='w-5 h-5 sm:w-10 sm:h-10'
          />
        </div> 
  
        <div className='absolute -z-10 right-[3vw] bottom-[1vh] sm:right-[27vw] sm:bottom-[1%]'>
          <img
            src='/pink_circle.png'
            alt='pink_circle'
            width={20}
            height={20}
          />
        </div> 
  
        <div className='text-center'>
          <h2 className='text-3xl font-semibold pb-5'>
            Create Account
          </h2>
          <p className='text-sm w-[234px]'>
            Are you ready to take the next step towards a succesful future?
          </p>
        </div>
  
        <form className='pt-2 text-xs w-[80vw] sm:w-[60vw] md:w-[40vw]' onSubmit={(e)=>handleSubmit(e)}>
          <div className='pt-5 flex justify-between gap-2'>
            <div className='flex-1'>
              <p className='text-left pb-1'>First Name</p>
              <input className='w-full p-3 border border-txtinput rounded-[5px]' name='first_name' value={first_name} required='required' onChange={(e)=>setFirst_name(e.target.value)} type='text' placeholder='Newton Adeola'/>
            </div>
  
            <div className='flex-1'>
              <p className='text-left pb-1'>Last Name</p>
              <input className='w-full p-3 border border-txtinput rounded-[5px]' name='last_name' value={last_name} required='required' onChange={(e)=>setLast_name(e.target.value)} type='text' placeholder='Idowu'/>
            </div>
          </div>
          
          <div className='pt-5'>
            <p className='text-left pb-1'>Email Address</p>
            <input className='w-full p-3 border border-txtinput rounded-[5px]' name='text' value={email} onChange={(e)=>isValidEmail(e)} type='email' required='required' placeholder='e.g: Samuel John'/>
            <div className='flex items-center mt-1 text-[10px] text-red-600'>
              { email && !validEmail &&
                <>
                  <span className='mr-1'><PiWarningFill/></span>
                  <p>Your Email Address must be unique</p>
                </>
              }
            </div>
          </div>
  
          <div className={`${ validEmail ? 'pt-5' : 'pt-1'}`}>
            <p className='text-left pb-1'>Phone Number</p>
            <PhoneInput
              country={'ng'}
              value={phone_number}
              onChange={(e)=>setPhone_number(e)}
              inputProps={{
                required:true
              }}
              className='w-full'
              defaultMask='... ... ....'
            />
              <div className='flex items-center mt-1 text-[10px] text-red-600'>
                {phone_number && phone_number.length < 13 &&
                  <>
                    <span className='mr-1'><PiWarningFill/></span>
                    <p>Your Phone Number must be unique</p>
                  </>
                }
              </div>
          </div>
  
          <div className={`${validphone_number ? 'pt-5' : 'pt-1'} flex justify-between gap-2`}>
            <div className='flex-1'>
              <p className='text-left pb-1'>Age Range</p>
              <select name='age_range' value={age_range} onChange={(e)=>setAge_range(e.target.value)} required='required' className='w-full p-3 border border-txtinput rounded-[5px]'>
                <option defaultValue></option>
                <option>10 - 17</option>
                <option>18 - 25</option>
                <option>16 - 32</option>
                <option>Above 32</option>
              </select>
            </div>
  
            <div className='flex-1'>
              <p className='text-left pb-1'>Gender</p>
              <select name='gender' value={gender} onChange={(e)=>setGender(e.target.value)} required='required' className='w-full p-3 border border-txtinput rounded-[5px]'>
                <option defaultValue></option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
          </div>
  
          <div className='pt-5'>
            <p className='text-left pb-1'>Password</p>
            <div className='flex items-center'>
              <input className='w-full p-3 border border-txtinput rounded-[5px]' name='password' value={password} 
                onChange={(e)=>isValidatePassword(e)} type={showPassword ? 'text' : 'password'} 
                required='required' placeholder='Your Password'/>
              <span className='relative right -ml-9'>{showPassword ? 
                <AiFillEye className='text-xl cursor-pointer' onClick={()=>setShowpassword(!showPassword)}/> : 
                <AiFillEyeInvisible className='text-xl cursor-pointer' onClick={()=>setShowpassword(!showPassword)}/>}</span>
            </div>
            <div className='flex items-center mt-1 text-[10px] text-red-600'>
              { password && password.length < 8 &&
                <>
                  <span className='mr-1'><PiWarningFill/></span>
                  <p>Must be at least 8 characters</p>
                </>
              }
            </div>
            <div className='flex items-center mt-1 text-[10px] text-red-600'>
              { password && !validpassword &&
                <>
                  <span className='mr-1'><PiWarningFill/></span>
                  <p>Must contain a capital letter, small letter, a number and a symbol</p>
                </>
              }
            </div>
          </div>
  
          <button className={`bg-bgSecondary text-bgPrimary w-full mt-5 py-3 rounded-[5px] px-4 font-semibold ${loading && 'opacity-30'}`} disabled={loading ? true : false}>Sign Up</button>
  
        </form>
  
  
        <div className='text-xs p-16'>
          <p>Already have an account? <a className='text-bgSecondary font-medium' href='/'>Log In</a></p>
        </div>
  
      </main>
    </>
  )
}
