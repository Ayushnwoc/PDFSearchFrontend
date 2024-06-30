
import React, { useState , useEffect, useRef} from 'react';
import { LuSendHorizonal } from "react-icons/lu";
import axios from 'axios';
import icon from '../assets/images/icon.svg';
import avatar from '../assets/images/avatar.svg';
import LoadingChat from './ChatLoader';


const Chat = ({file}) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const chatContainerRef = useRef(null);

    const convertToHTML = (text) => {
        const lines = text.split('\n').map(line => line.trim()).filter(line => line);
        return lines.map(line => {
            if (line.startsWith('* ')) {
                return `<li>${line.substring(2)}</li>`;
            }
            if (line.startsWith('**') && line.endsWith('**')) {
                return `<strong>${line.substring(2, line.length - 2)}</strong>`;
            }
            return `<p>${line}</p>`;
        }).join('');
    };

    const handleMessageSubmit = async(event) => {
        console.log(file);
        if(file == null){
            alert('Please upload a file first');
            return;
        }
        setLoading(true);
        event.preventDefault();
        const messageText = event.target.elements.message.value.trim();
        if (messageText) {
            const newMessage = { id: messages.length + 1, text: messageText, sender: "user" };
            setMessages(prevMessages => [...prevMessages, newMessage]);
            // Reset the input field
            event.target.reset();
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/answer/`, {
                question: messageText,
                file_path: file,
            });
            console.log('Message sent successfully:', response);
            const botMessage = { id: messages.length + 2, text: response.data, sender: "bot" };
            setMessages(prevMessages => [...prevMessages, botMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className=" w-3/4 flex flex-col items-center mx-auto ">
            {/* Chat messages container */}
            <div ref={chatContainerRef} className="w-full overflow-y-auto h-[75vh]  p-4" style={{ msOverflowStyle: 'none',scrollbarWidth: 'none', '::WebkitScrollbarr': {display: 'none'}}}>
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className="mb-4 flex m-1 items-start justify-start"
                    >
                        <img alt="icon" className='h-[40px] top-0 m-1 flex items-start' src={message.sender === "bot" ? icon : avatar}/>
                        <span className={`mx-2 p-2 py-1 rounded-lg `} dangerouslySetInnerHTML={{__html: convertToHTML(message.text)}}>
                        </span>
                    </div>
                ))}
                {loading && <LoadingChat/>}
            </div>

            {/* Input box at the bottom */}
            <form onSubmit={handleMessageSubmit} className="w-full px-4 py-3 bg-white flex items-center border corder-gray-300 rounded-lg shadow-md">
                <input
                    type="text"
                    name="message"
                    className="w-full focus:outline-none"
                    placeholder="Send a message..."
                    aria-label="Input"
                />
                <button disabled={loading}>
                    <LuSendHorizonal className="text-2xl text-gray-800 cursor-pointer" />
                </button>
            </form>
        </div>
    );
};

export default Chat;

