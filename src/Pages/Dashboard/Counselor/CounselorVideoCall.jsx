
import React, { useEffect, useRef, useState } from 'react'
import DashHeader from '../../../Components/SidePanel/DashHeader'
import UserSidebar from '../../../Components/SidePanel/UserSidebar'
import { useSelector } from 'react-redux'
import Peer from 'simple-peer'
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import { Button } from 'flowbite-react'
import { json, useLocation, useNavigate } from 'react-router-dom'
import CounselorSidebar from '../../../Components/SidePanel/CounselorSidebar'
import { FaVideoSlash } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
import { FaMicrophoneSlash } from "react-icons/fa6";
import { MdCallEnd } from "react-icons/md";
import { CHAT_URL } from '../../../Utils/const'

var stompClient = null;
function CounselorVideoCall() {
    const [me, setMe] = useState("")
    const [stream, setStream] = useState()
    const [receivingCall, setReceivingCall] = useState(false)
    const [called, setCalled] = useState(false)
    const [callerSignal, setCallerSignal] = useState()
    const [callAccepted, setCallAccepted] = useState(false)
    const [isVideoMuted, setIsVideoMuted] = useState(false);
    const [isAudioMuted, setIsAudioMuted] = useState(false);
    const [callEnded, setCallEnded] = useState(false)
    const [name, setName] = useState("")
    const count = useRef(1);
    const myVideo = useRef()
    const userVideo = useRef()
    const connectionRef = useRef()
    const navigate = useNavigate()
    const location = useLocation();
    const idToCall = location.state;
    const userData = useSelector(state => state.userData.userData)
    console.log(userData)

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            setStream(stream)
            if (myVideo.current) {
                myVideo.current.srcObject = stream;
            }

        })

        return () => {
            console.log('came to return ')
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
            // Optionally, clear the video element's srcObject
            if (myVideo.current) {
                myVideo.current.srcObject = null;
            }
            setStream(null);

        };
    }, [callEnded, callAccepted]);

    useEffect(() => {
        if (count.current !== 0) {

            connect();
        }
        count.current++;
    }, [])

    

    const connect = () => {

        console.log("connecting")

        let Sock = new SockJS(CHAT_URL+'/ws');
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

                setName(message.data.name)
                setCallerSignal(message.data.signalData)
                break
            case "callAccepted":
                console.log('call accepted=====================')
                setCalled(!called)
                setCallAccepted(true)
                connectionRef.current.signal(message.data.signalData)
                break
            case "endCall":
                endCall()
                break
            default:
                break
        }
    };

    const callUser = () => {
        setCalled(!called)
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream
        })
        peer.on("signal", (data) => {
            stompClient.send("/app/videocall", {}, JSON.stringify({
                type: "callUser",
                data: {
                    userToCall: idToCall,
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
                    userToCall: idToCall,
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
        
        stompClient.send("/app/videocall", {}, JSON.stringify({
            type: "endCall",
            data: {
                signalData: null,
                userToCall: idToCall,
                from: userData.id
            }
        }))

        endCall()

    }

    const endCall = () => {
        
        
        setCallEnded(true)
        setCallAccepted(false)
        setCalled(false)
        setStream(null);
        navigate('/counselor/end-call')
            
    }


    const toggleVideoMute = () => {
        if (myVideo.current) {
            const videoTracks = stream.getVideoTracks();
            if (videoTracks.length > 0) {
                videoTracks[0].enabled = !videoTracks[0].enabled;
                setIsVideoMuted(!isVideoMuted);
            }
        }
        if (connectionRef.current) {
            // Access the underlying RTCPeerConnection object
            const peerConnection = connectionRef.current._pc;
            const videoTrack = peerConnection.getSenders().find(sender => sender.track.kind === 'video');
            if (videoTrack) {
                videoTrack.track.enabled = !videoTrack.track.enabled;
            }
        }
    };

    const toggleAudioMute = () => {
        if (myVideo.current) {
            const audioTracks = myVideo.current.srcObject.getAudioTracks();
            if (audioTracks.length > 0) {
                audioTracks[0].enabled = !audioTracks[0].enabled;
                setIsAudioMuted(!isAudioMuted);
            }
        }
        if (connectionRef.current) {
            // Access the underlying RTCPeerConnection object
            const peerConnection = connectionRef.current._pc;
            const audioTrack = peerConnection.getSenders().find(sender => sender.track.kind === 'audio');
            if (audioTrack) {
                audioTrack.track.enabled = !audioTrack.track.enabled;
            }
        }
    };


    return (
        <>
            <DashHeader />
            <div className='flex '>
                <CounselorSidebar />
                <div className='sm:w-full  p-4'>
                    <div className="">
                        <div className="flex  justify-center ">

                            {callAccepted && (
                                <div className=" flex gap-12">
                                    <div className="">
                                        <video playsInline ref={userVideo} autoPlay className="w-[110vh] h-[70vh] object-cover rounded-lg" />
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
                        <div className='flex   justify-center mt-10 '>
                            <div className="flex justify-center  ">
                                <button onClick={toggleVideoMute} className="ml-4 text-3xl text-orange-500">
                                    {!isVideoMuted ? <FaVideo /> : <FaVideoSlash />}
                                </button>
                                <button onClick={toggleAudioMute} className='text-3xl ml-4 text-orange-500'>
                                    {!isAudioMuted ? <FaMicrophone /> : <FaMicrophoneSlash />}
                                </button>
                            </div>
                            <div className="text-center">

                                {callAccepted && !callEnded ? (
                                    <button className=' p-2 text-4xl text-red-600 ml-4' onClick={leaveCall}>
                                        <MdCallEnd />
                                    </button>
                                ) : (
                                    <button className='text-center p-2 ml-4 rounded-lg bg-indigo-800 font-bold text-white  cursor-pointer' onClick={callUser}>
                                        Start Session
                                    </button>
                                )}

                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CounselorVideoCall
