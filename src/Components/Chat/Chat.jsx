import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import Stomp from 'stompjs';

var stompClient = null;
function Chat() {
  
  const [nickId, setnickId] = useState('');
  const [fullname, setFullname] = useState();
  const [selectedUserId, setSelectedUserId] = useState('');
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [messageContent , setMessageContent] = useState();

  
//   useEffect(() => {
//     const socket = new SockJS('http://localhost:8082/ws');
//     const client = Stomp.over(socket);
//     setStompClient(client);
    
//   }, []);


  const onConnected = () => {
    console.log("on connected")
    stompClient.subscribe(`/user/${nickId}/queue/messages`, onMessageReceived);
    console.log('subscibed')
    
  };

  const onMessageReceived=(payload)=>{
    console.log('recieved')
    // fetchAndDisplayConnectedUsers();
    console.log('Message received', payload);
    const message = JSON.parse(payload.body);
    if (selectedUserId && selectedUserId === message.senderId) {
      displayMessage(message.senderId, message.content);
    }

    // if (selectedUserId) {
    //   document.getElementById(selectedUserId).classList.add('active');
    // }
  };

  const fetchAndDisplayConnectedUsers = async () => {
    const connectedUsersResponse = await fetch('/users');
    const connectedUsersData = await connectedUsersResponse.json();
    const filteredUsers = connectedUsersData.filter(user => user.nickId !== nickId);
    setConnectedUsers(filteredUsers);
  };

  const displayMessage = (senderId, content) => {
    console.log(senderId ,'--------', content )
  };

  const onError = () => {
    console.log('Could not connect to WebSocket server. Please refresh this page to try again!');
  };

  const connect = (event) => {
    event.preventDefault();
    console.log("connecting")
    if (nickId && selectedUserId) {
        let Sock = new SockJS('http://localhost:8082/ws');
        stompClient = over(Sock);
        stompClient.connect({},onConnected, onError);
        console.log("connected")
    }
  };

  const sendMessage = (event) => {
    event.preventDefault();
    if (messageContent && stompClient) {
        const chatMessage = {
            senderId: nickId,
            recipientId: selectedUserId,
            content: messageContent,
            timestamp: new Date()
        };
        stompClient.send("/app/chat", {}, JSON.stringify(chatMessage));
        displayMessage(nickId, messageContent);
        
    }
    // chatArea.scrollTop = chatArea.scrollHeight;
    event.preventDefault();
  };

  const logout = () => {
    stompClient.send("/app/user.disconnectUser", {}, JSON.stringify({ nickId: nickId, fullName: fullname, status: 'OFFLINE' }));
    window.location.reload();
  };

  return (
    <div>
      <div className="user-form" id="username-page">
        <h2>Enter Chatroom</h2>
        <form >
          <label htmlFor="nickId">nickId:</label>
          <input type="text" id="nickId" name="nickId" required value={nickId} onChange={(e) => setnickId(e.target.value.trim())} />

          <label htmlFor="nickId">nickId:</label>
          <input type="text" id="nickId" name="nickId" required value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value.trim())} />

          <button type="submit" onClick={e=>connect(e)}>Enter Chatroom</button>
        </form>
      </div>

      <div className="chat-container " id="chat-page">
        <div className="users-list">
          <div className="users-list-container">
            <h2>Online Users</h2>
            <ul id="connectedUsers">
              {connectedUsers.map(user => (
                <li key={user.nickId} className="user-item" id={user.nickId}>
                  {/* User display logic here */}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p id="connected-user-fullname">{fullname}</p>
            <button onClick={logout}>Logout</button>
          </div>
        </div>

        <div className="chat-area">
          <div className="chat-area" id="chat-messages">
            {/* Chat messages display */}
          </div>

          <form onSubmit={sendMessage} id="messageForm" name="messageForm" className="">
            <div className="message-input">
              <input autoComplete="off" type="text" id="message" placeholder="Type your message..."
              value={messageContent} onChange={(e)=>setMessageContent(e.target.value)} />
              <button>Send</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;
