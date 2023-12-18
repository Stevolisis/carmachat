import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../components/Header";
import api from "../utils/axiosConfig";


export default function Bookings(){
  const [data,setData] = useState([]);
  const query=useSearchParams();
  const session_id = query[0].get("session_id");

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

    function getBookings(){
        const token = localStorage.getItem('token');
        api.get('/bookings/getUserBookings',{headers:{Authorization:`Bearer ${JSON.parse(token)}`}})
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
                title: err.message
            });
        });
    }

    function confirmPayment(){
        const token = localStorage.getItem('token');
        api.post('/payments/confirmPayment',{session_id:session_id},{headers:{Authorization:`Bearer ${JSON.parse(token)}`}})
        .then(res=>{
            console.log(res.data);
            const status = res.data.status;
            const data = res.data.data;
    
            if(status === 'success'){
                Toast.fire({
                    icon: 'success',
                    title: data
                });
                getBookings();
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
        });
    }

    useEffect(()=>{
        getBookings();
        if(session_id){
            confirmPayment();
        }
    },[])

    return(
        <>
            <Header/>

            <section className="p-3 sm:p-12">
                <table className="w-full">
                <thead>
                  <tr>
                    <td>S/N</td>
                    <td>Service</td>
                    <td>Mechanic</td>
                    <td>Status</td>
                  </tr>
                </thead>
                  <tbody>
                    {
                      !data ? (
                        <tr>
                          <td colSpan="4">...loading</td>
                        </tr>
                      ) : (data.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="text-gray-600 text-xl font-semibold">No Ticket Found</td>
                        </tr>
                      ) : (
                        data.map((book, i) => {
                          return (
                            <tr key={i} className='bg-gray-100 rounded-[5px] w-full h-auto mb-12 p-3'>
                              <td className="p-3">{i+1}</td>
                              <td className="p-3">{book.svid.name}</td>
                              <td className="p-3">{book.sid.full_name}</td>
                              <td className="p-3">{book.complete ? "Verified" : "Not Verified"}</td>
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
