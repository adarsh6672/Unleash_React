import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import DashHeader from '../SidePanel/DashHeader';
import UserSidebar from '../SidePanel/UserSidebar';
import { AxiosInstance } from '../../Utils/AxiosInstance';
import InitialsAvatar from 'react-initials-avatar';
import 'react-initials-avatar/lib/ReactInitialsAvatar.css';
import ChatMessage from './ChatComp';
import { CHAT_URL } from '../../Utils/const';

var stompClient = null;
function Chat() {

    const [nickId, setnickId] = useState();
    const [fullname, setFullname] = useState();
    const [selectedUserId, setSelectedUserId] = useState();
    const [connectedUsers, setConnectedUsers] = useState([]);
    const [messageContent, setMessageContent] = useState();
    const [history, setHistory] = useState([])
    const count = useRef(1);
    const chatEndRef = useRef(null);

    useEffect(() => {


        AxiosInstance.get('/consultation/session/get-allbookings')
            .then(resp => {

                console.log(resp.data)
                makeUserList(resp.data)
            }).catch(error => {
                console.log('error in fetching data' + error)
            })


    }, [])

    useEffect(() => {
        if (count.current !== 0) {

            connect();
        }
        count.current++;
    }, [nickId])





    useEffect(() => {
        if (selectedUserId) {
            AxiosInstance.get(`/ws/messages/${nickId}/${selectedUserId}`)
                .then(res => {
                    console.log(res)
                    setHistory(res.data)
                }).catch(err => {
                    console.log(err)
                })
        }

    }, [selectedUserId])

    useEffect(() => {
        // Scroll to the bottom of the chat container
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
     }, [history]);

    const makeUserList = (resp) => {

        setnickId(resp[0].sessionBooking.patientId)
        const counselorDataArray = resp.map(response => ({
            counselorId: response.counselorId,
            counselorName: response.counselorName,
            slot: response.sessionBooking.avilability.slot,
            status: response.sessionBooking.status
        }));


        const uniqueCounselorDataArray = counselorDataArray.filter((value, index, self) =>
            index === self.findIndex((t) => t.counselorId === value.counselorId && value.status === 'BOOKED')
        );

        console.log(uniqueCounselorDataArray)
        setConnectedUsers(uniqueCounselorDataArray)
    }

    const handleUserSelection = (id) => {
        if (id === selectedUserId) {
            return;
        }
        setSelectedUserId(id);

    }

    const onConnected = () => {
        console.log("on connected")
        stompClient.subscribe(`/user/${nickId}/queue/messages`, onMessageReceived);
        console.log('subscibed')

    };

    const onMessageReceived = (payload) => {
        console.log('recieved')
        console.log('Message received', payload);
        const message = JSON.parse(payload.body);
        console.log(selectedUserId , typeof(selectedUserId))
        console.log(message.senderId , typeof(message.senderId))
        
            console.log('passing the condition ')
            setHistory(prev => [...prev,message])   
       
    };

    const fetchAndDisplayConnectedUsers = async () => {
        const connectedUsersResponse = await fetch('/users');
        const connectedUsersData = await connectedUsersResponse.json();
        const filteredUsers = connectedUsersData.filter(user => user.nickId !== nickId);
        setConnectedUsers(filteredUsers);
    };

  
    const onError = () => {
        console.log('Could not connect to WebSocket server. Please refresh this page to try again!');
    };

    const connect = () => {

        console.log("connecting")

        let Sock = new SockJS(CHAT_URL+'/ws');
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);


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
            setHistory(prev => [...prev,chatMessage])
        }
        setMessageContent('')
        
    };

    const logout = () => {
        stompClient.send("/app/user.disconnectUser", {}, JSON.stringify({ nickId: nickId, fullName: fullname, status: 'OFFLINE' }));
        window.location.reload();
    };

    return (
        <>
            <DashHeader />
            <div className='flex '>
                <UserSidebar />
                <div className='sm:w-full  p-4  '>
                    {/* <div className=''> */}
                    <div className='  sm:grid grid-cols-12 rounded-t-lg bg-slate-100  rounded-lg  shadow-md shadow-slate-400  '>
                        <div className='col-span-3 '>
                            <div className='text-center border-r-2 p-3 border-slate-300 bg-orange-200 shadow-md rounded-t-lg shadow-slate-400'>
                                <h1>Counselors</h1>
                            </div>
                            <div className='   block'>
                                {connectedUsers && connectedUsers.map((item) => (
                                    <div className='border-b-2 flex border-white p-3 cursor-pointer ' onClick={() => handleUserSelection(item.counselorId)}>
                                        <InitialsAvatar name={item.counselorName} />
                                        <h1 className='font-bold my-auto pl-4'>{item.counselorName}</h1>
                                    </div>
                                ))}

                            </div>

                        </div>
                        <div className='col-span-9 '>
                            <div className='text-center  p-3 border-slate-300 bg-orange-200 shadow-md rounded-t-lg shadow-slate-400'>
                                <h1>Name</h1>
                            </div>
                            <div className='bg-white h-[30rem] overflow-y-auto scrollbar-hide' >
                                <div className="p-4">
                                    {history.map((message, index) => (  
                                        <ChatMessage key={index} message={message} sender={message.senderId == nickId ? 'You' : 'Other'} />
                                    ))}
                                    <div ref={chatEndRef} />
                                </div>
                            </div>
                            <div className='bottom-auto p-3 mb-3'>
                                <input type="text" className='w-5/6 rounded-3xl ' value={messageContent} onChange={(e) => setMessageContent(e.target.value)} />
                                <button className='bg-indigo-900 text-white font-bold w-1/6 p-2 rounded-xl ' onClick={(e) => sendMessage(e)}>Send</button>
                            </div>

                        </div>
                    </div>

                    {/* </div> */}
                </div>
            </div>

        </>
    );
}

export default Chat;
