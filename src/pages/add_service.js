"use client"
import Header from '../components/Header';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import api from '../utils/axiosConfig';

export default function AddService() {
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);
    const [show,setShow] = useState(false);

    function packageType(type){
        const toCheck = type.split("-")[1];
        if(toCheck==="basic"){
            setShow(true);
        }else{
            setShow(false);
        }
    }

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


    useEffect(()=>{
        const token = localStorage.getItem('staff_token');
        api.get('/packages/getPackages',{headers:{Authorization:`Bearer ${JSON.parse(token)}`}})
        .then(res=>{
            console.log(res.data);
            const status = res.data.status;
            const data = res.data.data;
    
            if(status === 'success'){
              setData(data);   
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
          });
    },[])


    function handleSubmit(e){
        e.preventDefault();
        const formdata = new FormData(e.target);
        const token = localStorage.getItem('staff_token');
        setLoading(true);
        api.post('/services/addService',formdata,{withCredentials:true,headers:{Authorization:`Bearer ${JSON.parse(token)}`}})
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
                Add a Service
            </h2>
            <p className='text-sm w-[234px]'>
                Create a service today and get appointments and start earning!!!
            </p>
            </div>
    
            <form className='pt-2 pb-20 text-xs w-[80vw] sm:w-[60vw] md:w-[40vw]' onSubmit={(e)=>handleSubmit(e)}>
            <div className='pt-5'>
                <p className='text-left pb-1'>Name</p>
                <input className='w-full p-3 border border-txtinput rounded-[5px]' name='name' type='text' required='required' placeholder='type here'/>
            </div>

            <div className='pt-5'>
                <p className='text-left pb-1'>type</p>
                <select name='package' onChange={(e)=>packageType(e.target.value)} required='required' className='w-full p-3 border border-txtinput rounded-[5px]'>
                <option value=''>Select package type</option>
                {
                    data.map((pack,i)=>{
                        return <option key={i} value={pack._id + "-"+ pack.name}>{pack.name}</option>
                    })
                }
                </select>
            </div>

            <div className='pt-5'>
                <p className='text-left pb-1'>Details</p>
                <textarea className='w-full h-[250px] p-3 border border-txtinput rounded-[5px]' name='details' type='text' required='required' placeholder='Type here'/>
            </div>

            {show && <div className='pt-5'>
                <p className='text-left pb-1'>Pricing ( $ )</p>
                <input className='w-full p-3 border border-txtinput rounded-[5px]' name='pricing' type='number' step="0.01" placeholder='Type here'/>
            </div>}
    
            <button className={`bg-bgSecondary text-bgPrimary w-full mt-5 py-3 rounded-[5px] px-4 font-semibold ${loading && 'opacity-30'}`} disabled={loading ? true : false}>Submit</button>
    
            </form>

    
        </main>
        </>
    )
    }
