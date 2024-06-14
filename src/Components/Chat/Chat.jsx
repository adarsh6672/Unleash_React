import React, { useState, useEffect, useRef, useContext } from 'react';
import DashHeader from '../SidePanel/DashHeader';
import UserSidebar from '../SidePanel/UserSidebar';
import { AxiosInstance } from '../../Utils/AxiosInstance';
import InitialsAvatar from 'react-initials-avatar';
import 'react-initials-avatar/lib/ReactInitialsAvatar.css';
import ChatMessage from './ChatComp';
import { WebSocketContext } from '../../Context/WebSocket';

function Chat() {

    const [connectedUsers, setConnectedUsers] = useState([]);

    const chatEndRef = useRef(null);

    const { sendMessage, setSelectedUserId, selectedUserId, messageContent, setMessageContent, history, setHistory, myId } = useContext(WebSocketContext);

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
        if (selectedUserId) {
            AxiosInstance.get(`/ws/messages/${myId}/${selectedUserId}`)
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
    const handleSendMessage = (event) => {
        event.preventDefault()
        const chatMessage = {
            senderId: myId,
            recipientId: selectedUserId,
            content: messageContent,
            timestamp: new Date()
        }
        sendMessage(chatMessage);
    };





    return (
        <>
            <DashHeader />
            <div className='flex '>
                <UserSidebar />
                <div className='w-full  p-4  '>
                    {/* <div className=''> */}
                    <div className='  sm:grid grid-cols-12 rounded-t-lg bg-slate-100  rounded-lg  shadow-md shadow-slate-400  '>
                        <div className='col-span-3 mx-auto'>
                            <div className='text-center border-r-2 p-3 border-slate-300 bg-orange-200 shadow-md rounded-t-lg shadow-slate-400'>
                                <h1>Counselors</h1>
                            </div>
                            <div className='block'>
                                {connectedUsers && connectedUsers.map((item) => (
                                    <div key={item.counselorId}
                                        className={`border-b-2 flex border-white p-3 cursor-pointer ${item.counselorId === selectedUserId ? 'bg-orange-400' : ''}`}
                                        onClick={() => handleUserSelection(item.counselorId)}>
                                        <InitialsAvatar name={item.counselorName} />
                                        <h1 className='font-bold my-auto pl-4'>{item.counselorName}</h1>
                                    </div>
                                ))}

                            </div>
                        </div>
                        <div className='col-span-9 '>
                            <div className='text-center  p-3 border-slate-300 bg-orange-200 shadow-md rounded-t-lg shadow-slate-400'>
                                <h1>Chat</h1>
                            </div>
                            <div className='bg-white h-[30rem] overflow-y-auto scrollbar-hide' >
                                <div className="p-4">
                                    {history.map((message, index) => (
                                        <ChatMessage key={index} message={message} sender={message.senderId == myId ? 'You' : 'Other'} />
                                    ))}
                                    <div ref={chatEndRef} />
                                </div>
                            </div>
                            <form>
                                <div className='bottom-auto p-3 mb-3'>
                                    <input type="text" className='w-5/6 rounded-3xl ' value={messageContent} onChange={(e) => setMessageContent(e.target.value)} />
                                    <button type='submit' className='bg-indigo-900 text-white font-bold w-1/6 p-2 rounded-xl ' onClick={(e) => handleSendMessage(e)}>Send</button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* </div> */}
                </div>
            </div>

        </>
    );
}

export default Chat;
