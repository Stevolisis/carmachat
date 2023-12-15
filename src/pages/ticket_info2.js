import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Swal from "sweetalert2";
import Header from "../components/Header";
import api from "../utils/axiosConfig";


export default function TicketInfo2(){
    const { id } = useParams();
    const [data,setData] = useState(null);

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
        const token = localStorage.getItem('token');
        api.get(`/tickets/getTicket/${id}`,{headers:{Authorization:`Bearer ${JSON.parse(token)}`}})
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
    },[]);

    return(
        <>
            <Header/>
            <section className="pt-12 sm:pt-20 flex justify-center items-center flex-col text-txtPrimary">
           
            <div className='p-10 mb-20 rounded-[4px] w-[85vw] sm:w-[70vw] md:w-[60vw] bg-bgSecondary text-white'>
                <div className="flex justify-center items-center mb-16">
                    <h2 className="text-2xl font-semibold">Ticket Info</h2>
                </div>
                {
                    !data ? <p>...loading</p> : 
                    <>
                        <div className="flex py-2 items-center">
                            <p className="text-lg font-semibold pr-4">Ticket ID: </p>
                            <p className="text-sm">{data._id}</p>
                        </div>
                        <div className="flex py-2 items-center ">
                            <p className="text-lg font-semibold pr-4">Creator: </p>
                            <div>
                                <p className="text-sm">Name: {data.creator.full_name}</p>
                                <p>Email: {data.creator.email}</p>
                            </div>
                        </div>
                        <div className="flex py-2 items-center">
                            <p className="text-lg font-semibold pr-4">Subject: </p>
                            <p className="text-sm">{data.subject}</p>
                        </div>
                        <div className="flex py-2 items-center">
                            <p className="text-lg font-semibold pr-4">Category: </p>
                            <p className="text-sm">{data.category}</p>
                        </div>
                        <div className="flex py-2 items-center">
                            <p className="text-lg font-semibold pr-4">Priority: </p>
                            <p className="text-sm">{data.priority}</p>
                        </div>
                        <div className="flex py-2 items-center">
                            <p className="text-lg font-semibold pr-4">Description: </p>
                            <p className="text-sm">{data.description}</p>
                        </div>
                        <div className="flex py-2 items-center">
                            <p className="text-lg font-semibold pr-4"p>Status: </p>
                            <p className="text-sm">{data.status}</p>
                        </div>
                        <div className="flex py-2 items-center">
                            <p className="text-lg font-semibold pr-4">Attachments: </p>
                            <div className="flex flex-wrap items-center gap-2">
                                {
                                    data.attachments.length === 0 ? <p>No attachments</p> :
                                    data.attachments.map((img,i)=>{
                                        return <img className="w-auto h-[50px] rounded-[3px]" src={img.url} alt="attachments" key={i}/>
                                    })
                                }
                            </div>
                        </div>
                        <div className="flex py-2 items-center">
                            <p className="text-lg font-semibold pr-4">Date Created: </p>
                            <p className="text-sm">{data.created_at}</p>
                        </div>
                    </>
                    }
                </div>
            </section>
        </>
    )
}