import React, { useState } from 'react';
import './homepage.css'; 
import ChatBot from '../Chatbot/chatbot'; 
import chat from '../../assets/chat.png'
import arrow1 from '../../assets/arrow1.png'
import arrow2 from '../../assets/arrow2.png'

const ChatPopUp = () => {
  const [showChat, setShowChat] = useState(false);

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
  <>
     <div className="heading">
        SciAstra's ChatBot
        <div className="arrow">
            <img src={arrow2} alt="" />
        </div>
     </div>

    <div className="chat-popup">
      <button className="chat-button" onClick={toggleChat}>
        <img src={chat} alt="ChatBot Icon" /> 
      </button>
      {showChat && <ChatBot />}
    </div>
    </>
  );
};

export default ChatPopUp;
