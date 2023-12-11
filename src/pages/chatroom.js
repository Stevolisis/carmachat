import { useParams } from "react-router-dom"

export default function Chatroom(){
    const { room } = useParams();

    return(
        <>
            <div>
                Chatroom - {room}
            </div>
        </>
    )
}