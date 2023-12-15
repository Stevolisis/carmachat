import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2";
import Header from "../components/Header";
import Reply from "../components/Reply";
import api from "../utils/axiosConfig";


export default function TicketInfo(){
    const { id } = useParams();
    const [data,setData] = useState(null);
    const [show,setShow] = useState(false);
    const [msg,setMsg] = useState("");
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

    function handleReply(){
        const token = localStorage.getItem('staff_token');
        api.post(`/tickets/reply_ticket/${id}/staff`,{msg:msg,user:data.creator._id},{headers:{Authorization:`Bearer ${JSON.parse(token)}`}})
        .then(res=>{
            console.log(res.data);
            const status = res.data.status;
    
            if(status === 'success'){
              fetchTicket();  
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
            setShow(false);
          })      
    }

    function updateTicketStatus(status){
        const token = localStorage.getItem('staff_token');
        api.patch(`/tickets/ticket_status/${id}`,{status:status},{headers:{Authorization:`Bearer ${JSON.parse(token)}`}})
        .then(res=>{
            console.log(res.data);
            const repstatus = res.data.status;
    
            if(repstatus === 'success'){
              if(status === "In Progress"){
                handleReply();
                console.log('1111111111')
              }else{
                // console.log('2222222222')
                Toast.fire({
                    icon: 'success',
                    title: repstatus
                });
                fetchTicket();  
              }
            }else{
              Toast.fire({
                icon: 'error',
                title: repstatus
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

    function fetchTicket(){
        const token = localStorage.getItem('staff_token');
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
    }

    useEffect(()=>{
        fetchTicket();
    },[]);

    return(
        <>
            <Header/>
            {show && <Reply updateTicketStatus={updateTicketStatus} setShow={setShow} msg={msg} setMsg={setMsg}/>}
            <section className="pt-12 sm:pt-20 flex justify-center items-center flex-col text-txtPrimary">
           
            <div className='p-10 rounded-[4px] w-[85vw] sm:w-[70vw] md:w-[60vw] bg-bgSecondary text-white'>
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
                        <div className="flex items-center">
                            {
                                data.replies.length === 0 ? " " : 
                                <>
                                    <p className="text-lg font-semibold pr-4">replies: </p>
                                    <button onClick={() => navigate(`/ticket_replies/${data._id}`)} className='bg-white text-bgSecondary px-5 py-2 rounded-[3px] w-full'>
                                        View
                                    </button>
                                </>
                            }
                        </div>
                    </>
                    }
                </div>
            </section>

            <section className="mb-20 gap-4 pt-5 flex flex-wrap justify-center items-center text-txtPrimary">
                {
                    data && (data.status === "Closed" ? "" : data.status === "In Progress" || data.status === "Close" || data.status === "Resolved" ? " " : 
                    <button onClick={()=>setShow(true)} className='bg-bgSecondary text-white px-5 py-2 rounded-[3px] w-[220px]'>
                        Attend To
                    </button>)
                }
               {
                    data && (data.status === "Closed" ? "" : data.status === "Resolved" ? " " : 
                    <button onClick={()=>updateTicketStatus("Resolved")} className='bg-bgSecondary text-white px-5 py-2 rounded-[3px] w-[220px]'>
                        Resolved
                    </button>)
                }
               {
                    data && (data.status === "Closed" ? " " : 
                    <button onClick={()=>updateTicketStatus("Closed")} className='bg-bgSecondary text-white px-5 py-2 rounded-[3px] w-[220px]'>
                        Close
                    </button>)
                }
            </section>
        </>
    )
}