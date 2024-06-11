import React, { useEffect, useRef, useState } from 'react'
import DashHeader from '../../../Components/SidePanel/DashHeader'
import UserSidebar from '../../../Components/SidePanel/UserSidebar'
import { useSelector } from 'react-redux'
import Peer from 'simple-peer'
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import { FaVideoSlash } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
import { FaMicrophoneSlash } from "react-icons/fa6";
import { MdCallEnd } from "react-icons/md";
import { useLocation, useNavigate } from 'react-router-dom'
import { CHAT_URL } from '../../../Utils/const'

var stompClient = null;
function VideoCall() {
    const [me, setMe] = useState("")
    const [localStream, setStream] = useState()
    const [receivingCall, setReceivingCall] = useState(false)
    const [caller, setCaller] = useState("")
    const [callerSignal, setCallerSignal] = useState()
    const [callAccepted, setCallAccepted] = useState(false)
    const [idToCall, setIdToCall] = useState("")
    const [callEnded, setCallEnded] = useState(false)
    const [name, setName] = useState("")
    const [isVideoMuted, setIsVideoMuted] = useState(false);
    const [isAudioMuted, setIsAudioMuted] = useState(false);
    const navigate = useNavigate()
    const count = useRef(0);
    const myVideo = useRef()
    const userVideo = useRef()
    const connectionRef = useRef()
    const location = useLocation()
    const data = location.state;

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
            if (localStream) {
                localStream.getTracks().forEach(track => track.stop());
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
                setCaller(message.data.from)
                setName(message.data.name)
                setCallerSignal(message.data.signalData)
                break
            case "callAccepted":
                console.log('call accepted=====================')
                setCallAccepted(true)
                connectionRef.current.signal(message.data.signalData)
                break
            case "endCall":
                setCallEnded(true)
                endCall()
                break
            default:
                break
        }
    };

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

    const leaveCall = () => {
        stompClient.send("/app/videocall", {}, JSON.stringify({
            type: "endCall",
            data: {
                signalData: null,
                userToCall: caller,
                from: userData.id
            }
        }))

        endCall()

    }

    const endCall = () => {
        myVideo.current.pause();
        myVideo.current.srcObject = null;
        
        
        setCallEnded(true)
        setCallAccepted(false)
        setReceivingCall(false)
        setStream(null);
        navigate('/user/end-call',{state:data})
    }

    const toggleVideoMute = () => {
        if (localStream) {
            const videoTracks = localStream.getVideoTracks();
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
                <UserSidebar />
                <div className='sm:w-full  p-4'>
                    <div className="">
                        <div className="flex items-center justify-center ">

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
                            {localStream && !callAccepted && (

                                <div className="">

                                    <video playsInline ref={myVideo} autoPlay className="w-[110vh] h-[70vh] object-cover rounded-lg" />
                                </div>
                            )}

                        </div>
                        <div className='flex justify-center mt-5'>
                            <div className="flex justify-center ">
                                <button onClick={toggleVideoMute} className="ml-4 text-3xl text-orange-500">
                                    {!isVideoMuted ? <FaVideo /> : <FaVideoSlash />}
                                </button>
                                <button onClick={toggleAudioMute} className='text-3xl ml-4 text-orange-500'>
                                    {!isAudioMuted ? <FaMicrophone /> : <FaMicrophoneSlash />}
                                </button>
                            </div>
                            <div className="text-center">
                                {!receivingCall && (
                                    <div className=' text-center  ml-4 text-2xl font-bold text-indigo-800 '>
                                        Please Wait....
                                    </div>
                                )}
                                {callAccepted && !callEnded ? (
                                    <button className='text-red-600 p-2 text-4xl rounded-md ' onClick={leaveCall}>
                                        <MdCallEnd />
                                    </button>
                                ) : (
                                    <div className='text-center text-2xl font-bold text-indigo-800 mt-10'>

                                    </div>
                                )}
                                {idToCall}
                            </div>
                            {receivingCall && !callAccepted ? (
                                <div className="text-center">
                                    <h1 className='text-indigo-800'>{name} is Started The Session. Please Join</h1>
                                    <button className='bg-orange-500 p-2 rounded-lg' variant="contained" color="primary" onClick={answerCall}>
                                        Join Now
                                    </button>
                                </div>
                            ) : (
                                <div className='text-center text-2xl font-bold text-indigo-800 mt-10'></div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VideoCall
