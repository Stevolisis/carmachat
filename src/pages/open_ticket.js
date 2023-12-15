"use client"
import Header from '../components/Header';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axiosConfig';

export default function OpenTicket() {
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

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
    className:'w-[100px]'
  });


  function handleSubmit(e){
    e.preventDefault();
    const formdata = new FormData(e.target);
    const token = localStorage.getItem('token');
    setLoading(true);
    api.post('/tickets/addTicket',formdata,{withCredentials:true,headers:{Authorization:`Bearer ${JSON.parse(token)}`}})
    .then(res=>{
      const status = res.data.status;
      if(status === 'success'){
        Toast.fire({
          icon: 'success',
          title: status
        });    
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
        title: err.message
      });
    }).finally(fin=>{
      setLoading(false);
    });
  }

  return (
    <>
    <Header/>
    <main className=" pt-12 sm:pt-20 flex justify-center items-center flex-col text-txtPrimary">
  
        <div className='text-center'>
          <h2 className='text-3xl font-semibold pb-5'>
            Open Ticket
          </h2>
          <p className='text-sm w-[234px]'>
            Open ticket and recieve immediate response
          </p>
        </div>
  
        <form className='pt-2 pb-20 text-xs w-[80vw] sm:w-[60vw] md:w-[40vw]' onSubmit={(e)=>handleSubmit(e)}>
          <div className='pt-5'>
            <p className='text-left pb-1'>Subject</p>
            <input className='w-full p-3 border border-txtinput rounded-[5px]' name='subject' type='text' required='required' placeholder='Faulty Alternator'/>
          </div>

          <div className='pt-5'>
            <p className='text-left pb-1'>Category</p>
            <select name='category' required='required' className='w-full p-3 border border-txtinput rounded-[5px]'>
              <option defaultValue='selected' value='technical_issue'>Technical Issue</option>
              <option value='billing_inquiry'>Billing Inquiry</option>
              <option value='general_question'>General Question</option>
            </select>
          </div>

          <div className='pt-5'>
            <p className='text-left pb-1'>Priority</p>
            <select name='priority' required='required' className='w-full p-3 border border-txtinput rounded-[5px]'>
              <option defaultValue='selected' value='low'>Low</option>
              <option value='medium'>Medium</option>
              <option value='high'>High</option>
            </select>
          </div>

          <div className='pt-5'>
            <p className='text-left pb-1'>Description</p>
            <textarea className='w-full h-[250px] p-3 border border-txtinput rounded-[5px]' name='description' type='text' required='required' placeholder='Type here'/>
          </div>

          <div className='pt-5'>
            <p className='text-left pb-1'>Attachments (optonal) </p>
            <input className='w-full p-3 border border-txtinput rounded-[5px]' name='attachments' type='file' multiple placeholder='Type here'/>
          </div>
  
          <button className={`bg-bgSecondary text-bgPrimary w-full mt-5 py-3 rounded-[5px] px-4 font-semibold ${loading && 'opacity-30'}`} disabled={loading ? true : false}>Submit</button>
  
        </form>

  
      </main>
    </>
  )
}
