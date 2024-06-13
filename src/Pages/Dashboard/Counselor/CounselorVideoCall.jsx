
import React, { useContext, useEffect, useRef, useState } from 'react'
import DashHeader from '../../../Components/SidePanel/DashHeader'
import {  useLocation, useNavigate } from 'react-router-dom'
import CounselorSidebar from '../../../Components/SidePanel/CounselorSidebar'
import { FaVideoSlash } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
import { FaMicrophoneSlash } from "react-icons/fa6";
import { MdCallEnd } from "react-icons/md";
import { WebSocketContext } from '../../../Context/WebSocket';

var stompClient = null;
function CounselorVideoCall() {
    const [isVideoMuted, setIsVideoMuted] = useState(false);
    const [isAudioMuted, setIsAudioMuted] = useState(false);
    const location = useLocation();
    const idToCall = location.state;
 


    const { callUser,
        
        callAccepted, setCallAccepted,
        name, setName,
        callEnded, setCallEnded,
        localStream, setStream,
        dt,setDt,
        myVideo,
        userVideo,
        connectionRef,
        leaveCallfn,
        userData } = useContext(WebSocketContext);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((localStream) => {
            setStream(localStream)
            if (myVideo.current) {
                myVideo.current.srcObject = localStream;
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


    

    


    const toggleVideoMute = () => {
        if (myVideo.current) {
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
                            { !callAccepted && (

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
                                    <button className=' p-2 text-4xl text-red-600 ml-4' onClick={()=>leaveCallfn(idToCall)}>
                                        <MdCallEnd />
                                    </button>
                                ) : (
                                    <button className='text-center p-2 ml-4 rounded-lg bg-indigo-800 font-bold text-white  cursor-pointer' onClick={()=>callUser(idToCall)}>
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
