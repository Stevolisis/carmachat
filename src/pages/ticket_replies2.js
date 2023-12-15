import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { MdReply } from "react-icons/md";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../components/Header";
import Reply from "../components/Reply";
import api from "../utils/axiosConfig";


export default function TicketReplies2(){
    const [data,setData] = useState({replies:[]});
    const [show,setShow] = useState(false);
    const [msg,setMsg] = useState("");
    const { id } = useParams();

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

    function handleReply(status){
        const token = localStorage.getItem('token');
        api.post(`/tickets/reply_ticket/${id}/user`,{msg:msg,user:data.creator._id},{headers:{Authorization:`Bearer ${JSON.parse(token)}`}})
        .then(res=>{
            console.log(res.data);
            const status = res.data.status;
    
            if(status === 'success'){
                Toast.fire({
                    icon: 'success',
                    title: status
                });  
                setMsg("");
                getTicket();
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

    function getTicket(){
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
          }).finally(fin=>{
            setShow(false);
          })
    }

    useEffect(()=>{
        getTicket();
    },[]);


    return(
        <>
            <Header/>
            {show && <Reply updateTicketStatus={handleReply} setShow={setShow} msg={msg} setMsg={setMsg}/>}
            <section className="p-3 sm:p-12 flex">
              <div className="flex justify-end">
                <button onClick={()=>setShow(true)} className="bg-bgSecondary text-white px-5 py-2 rounded-[3px] h-auto w-[200px] flex items-center justify-center">Reply <MdReply/></button>
              </div>
            </section>
            <section className="p-3 sm:p-12">
            {
                    data.replies.length === 0 ? <p>...loading</p> :
                    data.replies.map((msg,i)=>{
                        return(
                            <div key={i} className={`${msg.from==="user"? "bg-gray-600 text-white" : "bg-gray-100 text-black"} my-2 p-5 rounded-[5px] w-full`}>
                                <p className={`${msg.from==="user"? "text-white" : "text-gray-600"} text-xs`}>{msg.time}</p>
                                <p className="py-3">{msg.text}</p>
                            </div>
                        )
                    })
                }
            </section>
        </>
    )
}