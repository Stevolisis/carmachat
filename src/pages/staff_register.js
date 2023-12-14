import { useState } from 'react';
import 'react-phone-input-2/lib/style.css'
import { PiWarningFill } from 'react-icons/pi';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Swal from 'sweetalert2';
import Header from '../components/Header';
import api from '../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';

export default function StaffRegister() {
  const [full_name,setFull_name] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [validEmail,setValidemail] = useState(true);
  const [showPassword,setShowpassword] = useState(false);
  const [validpassword,setValidpassword] = useState(false);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

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
    if(isValidEmail && isValidatePassword){
      setLoading(true);
      api.post('/auth/register',{
        full_name:full_name,
        email:email,
        password:password,
        type:"staff",
      })
      .then(res=>{
        console.log(res)
        const status = res.data.status;

        if(status === 'success'){
          Toast.fire({
            icon: 'success',
            title: 'Signed Up Successfully'
          });
          navigate('/');          
        }else{
          Toast.fire({
            icon: 'error',
            title: status
          });
        }
      }).catch(err=>{
        console.log(err);
        Toast.fire({
          icon: 'error',
          title: err.response.data.status
        });
      }).finally(fin=>{
        console.log('finnnnnnnnnn',fin)
        setLoading(false);
      });
    }
  }

  return (
    <>
    <Header/>
      <main className=" pt-12 sm:pt-20 flex justify-center items-center flex-col text-txtPrimary">
  
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
              <p className='text-left pb-1'>Full Name</p>
              <input className='w-full p-3 border border-txtinput rounded-[5px]' name='first_name' value={full_name} required='required' onChange={(e)=>setFull_name(e.target.value)} type='text' placeholder='Newton Adeola'/>
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
          <p>Already have an account? <a className='text-bgSecondary font-medium' href='/staff_login'>Log In</a></p>
        </div>
  
      </main>
    </>
  )
}
