import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../components/Header";
import api from "../utils/axiosConfig";


export default function StaffPackages(){
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

    return(
        <>
            <Header/>
            <section className="p-3 sm:p-12 flex">
                <div className="flex justify-end px-20">
                    <button onClick={()=>navigate(`/add_package`)} className="bg-bgSecondary text-white px-5 py-2 rounded-[3px] h-auto w-[200px] flex items-center justify-center">Create a Package<FiPlus/></button>
                </div>
            </section>

            <section className="p-3 sm:p-12">
                <table className="w-full">
                <thead>
                  <tr>
                    <td>Id</td>
                    <td>Name</td>
                    <td>Type</td>
                    <td>Pricing</td>
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
                        data.map((pack, i) => {
                          return (
                            <tr key={i} className='bg-gray-100 rounded-[5px] w-full h-auto mb-12 p-3'>
                              <td className="p-3">{pack._id}</td>
                              <td className="p-3">{pack.name}</td>
                              <td className="p-3">{pack.type}</td>
                              <td className="p-3">{pack.pricing}</td>
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
