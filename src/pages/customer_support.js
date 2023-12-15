import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../components/Header";
import api from "../utils/axiosConfig";


export default function CustomerSupport(){
  const [data,setData] = useState([]);
  const [filtered_data,setFiltered_data] = useState(null);
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

    function filter(key){
      if(key === "all"){
        setFiltered_data(data);
        return;
      }
      setFiltered_data(data.filter(item=>item.status===key));
    }
    useEffect(()=>{
        const token = localStorage.getItem('token');
        api.get('/tickets/getTickets',{headers:{Authorization:`Bearer ${JSON.parse(token)}`}})
        .then(res=>{
            console.log(res.data);
            const status = res.data.status;
            const data = res.data.data;
    
            if(status === 'success'){
              setData(data);   
              setFiltered_data(data);   
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
                <button onClick={()=>filter("all")} className="bg-gray-200 text-bgSecondary px-4 py-1 rounded-[3px] w-[200px]">All Tickets</button>
                <button onClick={()=>filter("Open")} className="bg-gray-200 text-bgSecondary px-4 py-1 rounded-[3px] w-[200px]">Open Tickets</button>
                <button onClick={()=>filter("In Progress")} className="bg-gray-200 text-bgSecondary px-4 py-1 rounded-[3px] w-[200px]">In Progress Tickets</button>
                <button onClick={()=>filter("Resolved")} className="bg-gray-200 text-bgSecondary px-4 py-1 rounded-[3px] w-[200px]">Resolved Tickets</button>
                <button onClick={()=>filter("Closed")} className="bg-gray-200 text-bgSecondary px-4 py-1 rounded-[3px] w-[200px]">Closed Tickets</button>
              </div>
              <div className="flex justify-end px-20">
              <button onClick={()=>navigate(`/open_ticket`)} className="bg-bgSecondary text-white px-5 py-2 rounded-[3px] h-auto w-[200px] flex items-center justify-center">Open a Ticket <FiPlus/></button>
              </div>
            </section>

            <section className="p-3 sm:p-12">
                <table className="w-full">
                <thead>
                  <tr>
                    <td>Id</td>
                    <td>Subject</td>
                    <td>Status</td>
                    <td>View</td>
                  </tr>
                </thead>
                  <tbody>
                    {
                      !filtered_data ? (
                        <tr>
                          <td colSpan="4">...loading</td>
                        </tr>
                      ) : (filtered_data.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="text-gray-600 text-xl font-semibold">No Ticket Found</td>
                        </tr>
                      ) : (
                        filtered_data.map((ticket, i) => {
                          return (
                            <tr key={i} className='bg-gray-100 rounded-[5px] w-full h-auto mb-12 p-3'>
                              <td className="p-3">{ticket._id}</td>
                              <td className="p-3">{ticket.subject}</td>
                              <td className="p-3">{ticket.status}</td>
                              <td className="p-3">
                                <button onClick={() => navigate(`/ticket_info2/${ticket._id}`)} className='bg-bgSecondary text-white px-5 py-2 rounded-[3px] w-full'>
                                  View
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      ))
                    }
                  </tbody>
                </table>
            </section>
        </>
    )
}
