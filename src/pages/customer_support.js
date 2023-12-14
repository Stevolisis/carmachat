import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../components/Header";
import api from "../utils/axiosConfig";


export default function CustomerSupport(){
    const [data,setData] = useState([]);
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

    useEffect(()=>{
        const token = localStorage.getItem('token');
        api.get('/tickets/getTickets',{headers:{Authorization:`Bearer ${JSON.parse(token)}`}})
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

    return(
        <>
            <Header/>
            <section className="p-3 sm:p-12 flex">
              <div className="flex flex-wrap gap-1 justify-center items-center p-2">
                <button className="bg-gray-200 text-bgSecondary px-4 py-1 rounded-[3px] w-[200px]">All Tickets</button>
                <button className="bg-gray-200 text-bgSecondary px-4 py-1 rounded-[3px] w-[200px]">Open Tickets</button>
                <button className="bg-gray-200 text-bgSecondary px-4 py-1 rounded-[3px] w-[200px]">In Progress Tickets</button>
                <button className="bg-gray-200 text-bgSecondary px-4 py-1 rounded-[3px] w-[200px]">Resolved Tickets</button>
                <button className="bg-gray-200 text-bgSecondary px-4 py-1 rounded-[3px] w-[200px]">Closed Tickets</button>
              </div>
              <div className="flex justify-end px-20">
                <button onClick={()=>navigate(`/open_ticket`)} className="bg-bgSecondary text-white px-5 py-2 rounded-[3px] h-auto w-[200px] flex items-center justify-center">Open a Ticket <FiPlus/></button>
              </div>
            </section>
            <section className="p-3 sm:p-12 flex flex-wrap gap-2 justify-center items-center">
                {
                    data && (data.length === 0 ? <p className="text-gray-600 text-xl font-semibold">No Ticket Found</p> :
                    data && data.map((user,i)=>{
                        return(
                            <div key={i} className='bg-gray-100 rounded-[5px] w-[150px] h-auto'>
                                <div>
                                    <p className="py-9 text-center">{user.full_name}</p>
                                </div>
                                <div>
                                    <button onClick={()=>navigate(`/chatroom/${user._id}`)} className='bg-bgSecondary text-white px-5 py-2 rounded-[3px] w-full'>Chat</button>
                                </div>
                            </div>
                        )
                    }))
                }
            </section>
        </>
    )
}
