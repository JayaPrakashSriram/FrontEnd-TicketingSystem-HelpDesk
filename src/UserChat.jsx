import io from 'socket.io-client';
import { useEffect, useState } from "react";
// const socket = io.connect("http://localhost:3001", {
//   transports: ['websocket'],
// });

export default function UserChat(){
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] =useState("");
  const sendMessage = () => {
    socket.emit("send_message", {message});
  };

  useEffect(() => {
    socket.io("receive_message", (data) => {
      // alert(data.message);
      setMessageReceived(data.message)
    });
  }, [socket]);
  return(
    <div>
      <h1 className='testing'>Creating a Chat App.</h1>
        <input placeholder="Message..." onChange={(event) => {setMessage(event.target.value)}}/>
        <button onClick={sendMessage}> SendMessage </button>
        <h1> Message: </h1>
        {messageReceived}
    </div>
  );
}