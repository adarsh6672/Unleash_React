import React, { useContext, useEffect, useRef, useState } from 'react'
import CounselorSidebar from '../../../Components/SidePanel/CounselorSidebar'
import DashHeader from '../../../Components/SidePanel/DashHeader'
import ChatMessage from '../../../Components/Chat/ChatComp';
import InitialsAvatar from 'react-initials-avatar';
import 'react-initials-avatar/lib/ReactInitialsAvatar.css';
import { AxiosInstance } from '../../../Utils/AxiosInstance';
import { WebSocketContext } from '../../../Context/WebSocket';


function ChatCounselor() {


    
    const [connectedUsers, setConnectedUsers] = useState([]);
    const chatEndRef = useRef(null);

    const { sendMessage, setSelectedUserId, selectedUserId, messageContent, setMessageContent, history, setHistory, myId } = useContext(WebSocketContext);


    useEffect(() => {


        AxiosInstance.get('/consultation/session/get-allbookings-ofcounselor')
            .then(resp => {
                
                console.log(resp.data)
                makeUserList(resp.data)
            }).catch(error => {
                console.log('error in fetching data' + error)
            })
        

    }, [])



    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
     }, [history]);




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

    const makeUserList = (resp) => {
        
        const counselorDataArray = resp.map(response => ({
            patientId: response.userDto.id,
            patientName: response.userDto.fullname,
            slot: response.sessionBooking.avilability.slot,
            status: response.sessionBooking.status
        }));
        

        const uniqueUserDataArray = counselorDataArray.filter((value, index, self) =>
            index === self.findIndex((t) => t.patientId === value.patientId && value.status === 'BOOKED')
        );

        console.log(uniqueUserDataArray)
        setConnectedUsers(uniqueUserDataArray)
    }

    const handleUserSelection = (id) => {
        if (id === selectedUserId) {
            return;
        }
        setSelectedUserId(id)

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
        <CounselorSidebar />
        <div className='w-full  p-4  '>
            
            <div className='  sm:grid grid-cols-12 rounded-t-lg bg-slate-100  rounded-lg  shadow-md shadow-slate-400  '>
                <div className='col-span-3 '>
                    <div className='text-center border-r-2 p-3 border-slate-300 bg-orange-200 shadow-md rounded-t-lg shadow-slate-400'>
                        <h1>Patients</h1>
                    </div>
                    <div className='   block'>
                        {connectedUsers && connectedUsers.map((item) => (
                            <div key={item.patientId}
                            className={`border-b-2 flex border-white p-3 cursor-pointer ${item.patientId === selectedUserId ? 'bg-orange-400' : ''}`}
                            onClick={() => handleUserSelection(item.patientId)}>
                                <InitialsAvatar name={item.patientName} />
                                <h1 className='font-bold my-auto pl-4'>{item.patientName}</h1>
                            </div>
                        ))}

                    </div>

                </div>
                <div className='col-span-9 '>
                    <div className='text-center  p-3 border-slate-300 bg-orange-200 shadow-md rounded-t-lg shadow-slate-400'>
                        <h1>Chat</h1>
                    </div>
                    <div className=' bg-white h-[30rem] overflow-y-auto scrollbar-hide' >
                        <div className="p-4 ">
                            {history.map((message, index) => (
                                <ChatMessage key={index} message={message} sender={message.senderId == myId ? 'You' : 'Other'} />
                            ))}
                            <div ref={chatEndRef} />
                        </div>

                    </div>
                    <div className='bottom-auto p-3 mb-3'>
                        <input type="text" className='w-5/6 rounded-3xl ' value={messageContent} onChange={(e) => setMessageContent(e.target.value)} />
                        <button className='bg-indigo-900 text-white font-bold w-1/6 p-2 rounded-xl ' onClick={(e) => handleSendMessage(e)}>Send</button>
                    </div>

                </div>
            </div>

         
        </div>
    </div>

</>
  )
}

export default ChatCounselor
