import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../components/Header";
import api from "../utils/axiosConfig";


export default function Dashboard(){
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
        api.get('/users/getUsers',{headers:{Authorization:`Bearer ${JSON.parse(token)}`}})
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
            <section className="p-3 sm:p-12 flex flex-wrap gap-2 justify-center items-center">
                {
                    data && data.length === 0 ? <p>...loading</p> :
                    data.map((user,i)=>{
                        return(
                            <div key={i} className='bg-gray-100 rounded-[5px] w-[150px] h-auto'>
                                <div>
                                    <p className="py-9 text-center">{user.full_name}</p>
                                </div>
                                <div>
                                    <button onClick={()=>navigate(`/chatroom/${user._id}`)} href={`/chatroom/${user._id}`} className='bg-bgSecondary text-white px-5 py-2 rounded-[3px] w-full'>Chat</button>
                                </div>
                            </div>
                        )
                    })
                }
            </section>
        </>
    )
}
