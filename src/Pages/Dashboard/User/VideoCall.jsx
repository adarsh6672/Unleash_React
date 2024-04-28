import React, { useEffect, useRef, useState } from 'react'
import DashHeader from '../../../Components/SidePanel/DashHeader'
import UserSidebar from '../../../Components/SidePanel/UserSidebar'
import { useSelector } from 'react-redux'
import Peer from 'simple-peer'
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import { Button } from 'flowbite-react'
import { json } from 'react-router-dom'

var stompClient = null;
function VideoCall() {
    const [me, setMe] = useState("")
    const [stream, setStream] = useState()
    const [receivingCall, setReceivingCall] = useState(false)
    const [caller, setCaller] = useState("")
    const [callerSignal, setCallerSignal] = useState()
    const [callAccepted, setCallAccepted] = useState(false)
    const [idToCall, setIdToCall] = useState("")
    const [callEnded, setCallEnded] = useState(false)
    const [name, setName] = useState("")
    const count = useRef(0);
    const myVideo = useRef()
    const userVideo = useRef()
    const connectionRef = useRef()

    const userData = useSelector(state => state.userData.userData)
    console.log(userData)

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            setStream(stream)
            if (myVideo.current) {
                myVideo.current.srcObject = stream;
            }

        })

        // return () => {
        //     console.log('came to return ')
        //     if (stream) {
        //         stream.getTracks().forEach(track => track.stop());
        //     }
        //     // Optionally, clear the video element's srcObject
        //     if (myVideo.current) {
        //         myVideo.current.srcObject = null;
        //     }
        //     setStream(null);
        // };
    }, [callEnded]);

    useEffect(() => {
        if (count.current !== 0) {

            connect();
        }
        count.current++;
    }, [])

    const stopStream = () => {

        if (stream) {
            // Stop all video tracks
            stream.getTracks().forEach(track => track.stop());
            // Optionally, clear the video element's srcObject
            myVideo.current.srcObject = null;
            setStream(null)
        }

    }

    const connect = () => {

        console.log("connecting")

        let Sock = new SockJS('http://localhost:8082/ws');
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);


    };
    const onConnected = () => {
        console.log("on connected")
        stompClient.subscribe(`/user/${userData.id}/queue/messages`, onMessageReceived);
        console.log('subscibed')

    };

    const onError = () => {
        console.log('Could not connect to WebSocket server. Please refresh this page to try again!');
    };

    const onMessageReceived = (payload) => {
        let message = JSON.parse(payload.body)
        console.log("message reveve==============================================")

        console.log(message.type)
        switch (message.type) {
            case "me":
                setMe(message.data)
                console.log('inside me -----------------------------')
                break
            case "callUser":
                console.log('inside callUser====================')
                setReceivingCall(true)
                setCaller(message.data.from)
                setName(message.data.name)
                setCallerSignal(message.data.signalData)
                break
            case "callAccepted":
                console.log('call accepted=====================')
                setCallAccepted(true)
                connectionRef.current.signal(message.data.signalData)
                break
            default:
                break
        }
    };

    const callUser = (id) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream
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


    const answerCall = () => {
        setCallAccepted(true)
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream
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
        setReceivingCall(false)
        peer.signal(callerSignal)
        connectionRef.current = peer
    }

    const leaveCall = () => {
        setCallEnded(true)
        setCallAccepted(false)

        try {
            connectionRef.current = null
            userVideo.current.srcObject = null
        } catch (error) {
            console.error('Error occurred while closing the peer connection:', error);
        }

    }





    return (
        <>
            <DashHeader />
            <div className='flex '>
                <UserSidebar />
                <div className='sm:w-full  p-4'>
                    <div className="">
                        <div className="flex items-center justify-center ">

                            {callAccepted  && (
                                <div className=" flex gap-12">
                                    <div className="">
                                        <video playsInline ref={userVideo} autoPlay className=" object-cover rounded-lg" />
                                    </div>
                                    <div className=" w-32 h-32 ">
                                        
                                        <video playsInline muted ref={myVideo} autoPlay className=" object-cover rounded-lg" />
                                    </div>
                                </div>
                            )}
                            {stream && !callAccepted && (

                                <div className="">
                                    
                                    <video playsInline ref={myVideo} autoPlay className="w-[110vh] h-[70vh] object-cover rounded-lg" />
                                </div>
                            )}

                        </div>



                        <div>
                            <button className='bg-red-900' onClick={stopStream}>stop</button>
                        </div>
                        <div className="myId bg-red-400">
                            name:
                            <input
                                className='bg-red-500 text-black'
                                id="filled-basic"
                                label="Name"
                                variant="filled"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={{ marginBottom: "20px" }}
                            />

                            callerId:
                            <input className='bg-yellow-400'
                                id="filled-basic"
                                label="ID to call"
                                variant="filled"
                                value={idToCall}
                                onChange={(e) => setIdToCall(e.target.value)}
                            />
                            <div className="call-button">
                                {callAccepted && !callEnded ? (
                                    <button variant="contained" className='bg-orange-500' color="secondary" onClick={leaveCall}>
                                        End Call
                                    </button>
                                ) : (
                                    <button color="primary" aria-label="call" className='bg-orange-500' onClick={() => callUser(idToCall)}>
                                        call
                                    </button>
                                )}
                                {idToCall}
                            </div>
                        </div>
                        <div>
                            {receivingCall && !callAccepted ? (
                                <div className="bg-red-500">
                                    <h1 className='text-black'>{name} is calling...</h1>
                                    <button className='bg-blue-900' variant="contained" color="primary" onClick={answerCall}>
                                        Answer
                                    </button>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VideoCall
