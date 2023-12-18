import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2";
import Header from "../components/Header";
import Modal from "../components/Modal";
import api from "../utils/axiosConfig";
import { MdOutlineCancel } from "react-icons/md";


export default function Service(){
    const { id } = useParams();
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(false);
    const [show,setShow] = useState(false);
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

    function getServices(){
        const token = localStorage.getItem('token');
        api.get(`/services/getService/${id}`,{headers:{Authorization:`Bearer ${JSON.parse(token)}`}})
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
    }

    function addBooking(){
        const token = localStorage.getItem('token');
        setLoading(true);
        api.post('/bookings/addBooking',{service:data},{withCredentials:true,headers:{Authorization:`Bearer ${JSON.parse(token)}`}})
        .then(res=>{
            const status = res.data.status;
            if(status === 'success'){
                Toast.fire({
                icon: 'success',
                title: status
                });    
                window.location.href=res.data.data;
            }else{
                Toast.fire({
                icon: 'error',
                title: status
                });
            }

        }).catch(err=>{
            if(err.request.status === 401){
                setShow(true);
            }
            console.log(err);
            Toast.fire({
                icon: 'error',
                title: err.request.statusText
            });
        }).finally(fin=>{
            setLoading(false);
        });
    }
    

    function subscribePackage(){
        const token = localStorage.getItem('token');
        api.post(`/packages/subscribeToPackage`,{package:data.pid.name},{headers:{Authorization:`Bearer ${JSON.parse(token)}`}})
        .then(res=>{
            console.log(res.data);
            const status = res.data.status;
            const data = res.data.data;
    
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
              title: err.response.data.status || err.request.statusText
            });
          });
    }

    useEffect(()=>{
        getServices();
    },[]);

    return(
        <>
            <Header/>
            {show &&
                <Modal>
                    <div  className="pt-2 text-xs w-[80vw] sm:w-[60vw] md:w-[40vw]">
                        <button onClick={()=>subscribePackage()} className='bg-bgSecondary text-white px-5 py-5 rounded-[3px] w-full'>
                            Subscribe to {data.pid.name} package
                        </button>
                    </div>
                    <div>
                        <button onClick={()=>setShow(false)} className='bg-bgSecondary p-1 text-white mt-6 rounded-[3px] w-full rounded-full'>
                            <MdOutlineCancel size={30}/>
                        </button>
                    </div>
                </Modal>
            }
            <section className="pt-12 sm:pt-20 flex justify-center items-center flex-col text-txtPrimary">
           
            <div className='p-10 mb-20 rounded-[4px] w-[85vw] sm:w-[70vw] md:w-[60vw] bg-bgSecondary text-white'>
                <div className="flex justify-center items-center mb-16">
                    <h2 className="text-2xl font-semibold">Service Info</h2>
                </div>
                {
                    !data ? <p>...loading</p> : 
                    <>
                        <div className="flex py-2 items-center">
                            <p className="text-lg font-semibold pr-4">Service: </p>
                            <p className="text-sm">{data.name}</p>
                        </div>
                        <div className="flex py-2 items-center">
                            <p className="text-lg font-semibold pr-4">Package: </p>
                            <p className="text-sm">{data.pid.name}</p>
                        </div>
                        <div className="flex py-2 items-center">
                            <p className="text-lg font-semibold pr-4">Details: </p>
                            <p className="text-sm">{data.details}</p>
                        </div>
                        <div className="flex py-2 items-center">
                            <p className="text-lg font-semibold pr-4">Price: </p>
                            <p className="text-sm">{data.pid.name === "basic" ? data.pricing : "Subscriptions"}</p>
                        </div>
                        <div className="flex py-2 items-center">
                            <p className="text-lg font-semibold pr-4">Date Created: </p>
                            <p className="text-sm">{data.createdAt}</p>
                        </div>
                        <div className="flex items-center">
                            <button onClick={() => addBooking()} className={`bg-white text-bgSecondary px-5 py-2 rounded-[3px] w-full ${loading && 'opacity-30'}`} disabled={loading ? true : false}>
                                Book Service
                            </button>
                        </div>
                    </>
                    }
                </div>
            </section>
        </>
    )
}