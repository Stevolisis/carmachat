import { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom"
import Header from "../components/Header";
import { io } from 'socket.io-client';
import Swal from "sweetalert2";

const token=localStorage.getItem('token');
let socket=io.connect('http://localhost:8888', { 
    secure: true,
    query: {
        token: JSON.parse(token),
    },
});
// let socket="";
export default function Chatroom(){
    const query=useSearchParams();
    const targetId=query[0].get('targetId')
    const targetName=query[0].get('targetName').replace(/_/g, ' ');
    const [message,setMessage] = useState('');
    const [chats,setChats] = useState(null);
    const [me,setMe] = useState(null);
    const [chatwith,setChatwith] = useState(null);
    const chatContainerRef = useRef();
    const once = useRef(true);
    const once2 = useRef(true);
    const scrollToBottom = () => {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    };

    const sendMessage = (e)=>{
        e.preventDefault();
        once2.current && socket.emit('group-chat',message);
        once2.current=false;
        setMessage('');
        once2.current=true;
    }

    useEffect(()=>{
        if(once.current){
            socket.emit('join-room',{targetId:targetId,targetName:targetName});
            once.current = false;
        }
    },[targetId, socket]);
    
    useEffect(()=>{
        socket.on("connect", () => {
            console.log('ggg',socket.id);
        });
        socket.on('connect_error', (error) => {
            console.error('Socket connection error:', error.message);
            Swal.fire(
                "Socket Connection Error",
                error.message,
                "error"
            );
        });
        socket.on('me',(arg)=>{
            console.log('meme',arg);
            setMe({id:arg.id,name:arg.name});
        });
        socket.on('chats',(arg)=>{
            console.log('cchttss',arg);

            setChats(arg);
        });
        socket.on('room_users', (arg) => {
            const toChatUser = arg.find(user => user === targetId);
        
            if (toChatUser) {
                setChatwith(targetName); // Assuming that the user object has a property named full_name
            }
        
            console.log('roomusers', arg);
        });
        socket.on('message',(msg)=>{
            console.log("msg: ",msg);
            setChats((prevChats) => [...prevChats, msg]);
        });
        
        return ()=> {
            socket.off('message');
            socket.off('chats');
            socket.off('room_users');
            socket.off('me');
            socket.off('connect');
        }
    },[me,socket]);

    useEffect(() => {
        scrollToBottom();
    }, [chats]);


    return(
        <>
            <Header/>
            <section className="px-5 sm:px-12 pt-0 relative">
                <div className="bg-bgSecondary px-5 py-2 text-white">
                    <h2 className="text-sm">{chatwith&&chatwith}</h2>
                </div>
                <div ref={chatContainerRef} className=" rounded-[4px] bg-gray-100 px-3 flex flex-col text-[9px] md:text-[11px] text-txtSecondary overflow-y-auto h-[65vh]"> 
                    {
                        !chats ? <p>...loading</p> : 
                        chats.map((chat,i)=>{
                            return chat.uid == me.id ?
                            <div className='flex justify-end bottom-0 right-0' key={i}>
                                <p className="p-1.5 md:p-2 w-fit text-sm text-white text-right bg-bgSecondary rounded-tr-md rounded-bl-md my-2"><span className='text-[10px]'>{me.name}, {chat.time}</span><br/>{chat.text}</p>
                            </div>
                            :
                            <div className='flex justify-start left-0 bottom-0' key={i}>
                                <p className="p-1.5 md:p-2 w-fit bg-gray-500 rounded-tr-md rounded-bl-md my-2 text-white"><span className='text-[10px]'>{targetName}, {chat.time}</span><br/>{chat.text}</p>
                            </div>
                        })
                    }
                </div>
                <div className="bg-bgSecondary py-3 w-full text-txtSecondary text-center text-xs my-3 px-3 bottom-0">
                    <form onSubmit={(e)=>sendMessage(e)}>
                        <input value={message} onChange={(e)=>setMessage(e.target.value)} className="bg-gray-100 w-full py-2 px-3 outline-none border-none rounded-md text-bgTertiary" type='text' placeholder="Send a message"/>
                    </form>
                </div>
            </section>
        </>
    )
}