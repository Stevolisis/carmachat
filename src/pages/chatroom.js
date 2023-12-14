import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom"
import Header from "../components/Header";
import { io } from 'socket.io-client';

const token=localStorage.getItem('token');
let socket=io.connect('http://localhost:80', { 
    secure: true,
    query: {
        token: JSON.parse(token),
    },
 });

export default function Chatroom(){
    const { id } = useParams();
    const [message,setMessage] = useState('');
    const [chats,setChats] = useState(null);
    const [me,setMe] = useState(null);
    const [chatwith,setChatwith] = useState(null);
    const chatContainerRef = useRef();
    const once = useRef(true);

    const scrollToBottom = () => {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    };

    const sendMessage = (e)=>{
        e.preventDefault();
        console.log('message',message||'ppppp');
        socket.emit('group-chat',message);
        setMessage('');
    }

    socket.on("connect", () => {
        console.log('ggg',socket.id);
    });

    socket.on('me',(arg)=>{
        setMe(arg);
    });
    socket.on('chats',(arg)=>{
        console.log('chatschatschats',arg);
        setChats(arg);
    });
    socket.on('room_users',(arg)=>{
        const tochat = arg.filter(user=>user._id!==me);
        setChatwith(tochat[0].full_name);
    });

    useEffect(()=>{
        console.log('once: ',once);
        if(once.current){
            socket.emit('join-room',{target:id});
            once.current = false;
        }
    },[id, socket]);

    useEffect(()=>{
        socket.on('message',(msg)=>{
            setChats((prevChats) => [...prevChats, msg]);
        });
        console.log('Listening to message emit');
        return ()=> socket.off('message');
    },[]);


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
                            return chat.uid == me ?
                            <div className='flex justify-end bottom-0 right-0' key={i}>
                                <p className="p-1.5 md:p-2 w-fit text-sm text-white text-right bg-bgSecondary rounded-tr-md rounded-bl-md my-2"><span className='text-[10px]'>{chat.userName}, {chat.time}</span><br/>{chat.text}</p>
                            </div>
                            :
                            <div className='flex justify-start left-0 bottom-0' key={i}>
                                <p className="p-1.5 md:p-2 w-fit bg-gray-500 rounded-tr-md rounded-bl-md my-2 text-white"><span className='text-[10px]'>{chat.userName}, {chat.time}</span><br/>{chat.text}</p>
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