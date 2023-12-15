import { MdOutlineCancel } from "react-icons/md";

export default function Reply({updateTicketStatus,setShow,msg,setMsg}){
    
    return(
        <div className="absolute h-[100%] w-full bg-[rgba(0,0,0,0.8)] flex flex-col justify-center items-center">
            <div  className="pt-2 text-xs w-[80vw] sm:w-[60vw] md:w-[40vw]">
                <textarea value={msg} onChange={(e)=>setMsg(e.target.value)} className='mb-6 w-full h-[220px] p-3 border border-txtinput rounded-[5px]' name='description' type='text' required='required' placeholder='Type here'/>
                <button onClick={()=>updateTicketStatus("In Progress")} className='bg-bgSecondary text-white px-5 py-2 rounded-[3px] w-full'>
                    Reply
                </button>
            </div>
            <div>
                <button onClick={()=>setShow(false)} className='bg-bgSecondary p-1 text-white mt-6 rounded-[3px] w-full rounded-full'>
                    <MdOutlineCancel size={30}/>
                </button>
            </div>
        </div>
    )
}