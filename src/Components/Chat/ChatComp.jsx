const ChatMessage = ({ message, sender }) => {
    return (
        
        <div className={`flex  gap-2.5 ${sender=== 'You' ? '' : ''}`}>

            <div className={`flex flex-col gap-1 w-full  ${sender=== 'You' ? 'items-end' : ''}`}>
                <div className="flex items-center space-x-2">
                    {/* <span className="text-sm font-semibold text-gray-900">{sender}</span> */}
                    {/* <span className="text-sm font-normal text-gray-500">{message.timestamp}</span> */}
                </div>
                <div className={`flex flex-col leading-1.5 p-4 border-gray-200  w-fit rounded-e-xl rounded-es-xl ${sender=== 'You' ? 'bg-orange-400' : 'bg-indigo-400'}`}>
                    <p className="text-sm font-normal text-gray-900">{message.content}</p>
                </div>
                {sender==='You'&&(
                <span className="text-sm font-normal text-gray-500">Delivered</span>
                )}
            </div>
        </div>
    );
};

export default ChatMessage;
