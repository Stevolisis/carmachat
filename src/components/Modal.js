import { MdOutlineCancel } from "react-icons/md";

export default function Modal({children}){
    
    return(
        <div className="absolute h-[100%] w-full bg-[rgba(0,0,0,0.8)] flex flex-col justify-center items-center">
            {
                children
            }
        </div>
    )
}