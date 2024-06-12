import React, { createContext, useState, useEffect, useContext, useRef } from 'react';
import { toast } from 'react-hot-toast';
import SockJS from 'sockjs-client';
import { CHAT_URL } from '../Utils/const';
import { over } from 'stompjs';
import { useSelector } from 'react-redux';
import Peer from 'simple-peer'
import {  useNavigate } from 'react-router-dom'




const WebSocketContext = createContext();

var stompClient = null;
const WebSocketProvider = ({ children }) => {
    const myId = useSelector(state => state.userData?.userData?.id ?? null)
    const userData = useSelector(state => state.userData?.userData ?? null)
    const count = useRef(1);
    const [history, setHistory] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [messageContent, setMessageContent] = useState('');

    // for video call
    const [receivingCall, setReceivingCall] = useState(false)
    const [caller, setCaller] = useState("")
    const [callerSignal, setCallerSignal] = useState()
    const [callAccepted, setCallAccepted] = useState(false)
    const [name, setName] = useState("")
    const [callEnded, setCallEnded] = useState(false)
    const [localStream, setStream] = useState()
    const [dt,setDt ]= useState()
    const navigate = useNavigate()



    const myVideo = useRef()
    const userVideo = useRef()

    const connectionRef = useRef()

    useEffect(() => {
        if (count !== 0) {
            connect();
        }
        count.current++;
    }, [myId]);

    const connect = () => {
        console.log("connecting");

        let Sock = new SockJS(CHAT_URL + '/ws');
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    };

    const onConnected = () => {
        console.log("on connected");
        stompClient.subscribe(`/user/${myId}/queue/messages`, onMessageReceived);
        console.log('subscibed');
    };

    const onMessageReceived = (payload) => {
        console.log('recieved');
        console.log('Message received', payload);
        const message = JSON.parse(payload.body);
        if (message.type) {
            switch (message.type) {
                case "me":
                    console.log('inside me -----------------------------')
                    break
                case "callUser":
                    console.log('inside callUser====================')
                    setReceivingCall(true)
                    setCaller(message.data.from)
                    setName(message.data.name)
                    setCallerSignal(message.data.signalData)
                    toast.success(`call received`);
                    break
                case "callAccepted":
                    console.log('call accepted=====================')
                    setCallAccepted(true)
                    connectionRef.current.signal(message.data.signalData)
                    break
                case "endCall":
                    setCallEnded(true)
                    endCall()
                    navigate('/user/end-call', { state: dt })
                    break
                default:
                    break
            }
        } else {
            toast.success(`Message received`);
            setHistory((prev) => [...prev, message]);
        }



    };

    const onError = (error) => {
        console.log('Error connecting to WebSocket:', error);
    };

    const sendMessage = (chatMessage) => {
        if (messageContent && stompClient) {
            stompClient.send("/app/chat", {}, JSON.stringify(chatMessage));
            setHistory((prev) => [...prev, chatMessage]);
        }
        setMessageContent('');
    };
    const endCall = () => {
        if (localStream) {
            localStream.getTracks().forEach(track => track.stop());
        }

        if (myVideo.current) {
            myVideo.current.pause();
            myVideo.current.srcObject = null;
        }

        if (connectionRef.current) {
            connectionRef.current.destroy();
        }
        // myVideo.current.pause();
        // myVideo.current.srcObject = null;

       
        setCallEnded(true)
        setCallAccepted(false)
        setReceivingCall(false)
        setStream(null);
    }

    const callUser = (id) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: localStream
        })
        peer.on("signal", (data) => {
            stompClient.send("/app/videocall", {}, JSON.stringify({
                type: "callUser",
                data: {
                    userToCall: id,
                    signalData: data,
                    from: userData.id,
                    name: userData.fullname
                }
            }))
        })
        peer.on("stream", (stream) => {
            userVideo.current.srcObject = stream
        })

        connectionRef.current = peer
    }
    const answerCall = async () => {


        setCallAccepted(true)
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: localStream
        })
        peer.on("signal", (data) => {
            stompClient.send("/app/videocall", {}, JSON.stringify({
                type: "callAccepted",
                data: {
                    signalData: data,
                    userToCall: caller,
                    from: userData.id
                }
            }))
        })
        peer.on("stream", (stream) => {
            userVideo.current.srcObject = stream
        })

        peer.signal(callerSignal)
        connectionRef.current = peer
    }

    const leaveCall = (data) => {
        stompClient.send("/app/videocall", {}, JSON.stringify({
            type: "endCall",
            data: {
                signalData: null,
                userToCall: caller,
                from: userData.id
            }
        }))

        endCall()
        navigate('/user/end-call',{state:data})
    }
    const leaveCallfn = (idToCall) => {
        stompClient.send("/app/videocall", {}, JSON.stringify({
            type: "endCall",
            data: {
                signalData: null,
                userToCall: idToCall,
                from: userData.id
            }
        }))

        endCall()
        navigate('/counselor/end-call')
    }


    return (
        <WebSocketContext.Provider
            value={{
                connect,
                stompClient,
                selectedUserId,
                setSelectedUserId,
                history,
                setHistory,
                messageContent,
                setMessageContent,
                myId,
                sendMessage,

                callUser,
                answerCall,
                leaveCall,
                receivingCall, setReceivingCall,
                caller, setCaller,
                callerSignal, setCallerSignal,
                callAccepted, setCallAccepted,
                name, setName,
                callEnded, setCallEnded,
                localStream, setStream,
                dt,setDt,
                myVideo,
                userVideo,
                connectionRef,
                userData,
                leaveCallfn,
                endCall
            }}
        >
            {children}
        </WebSocketContext.Provider>
    );
};

export { WebSocketProvider, WebSocketContext };