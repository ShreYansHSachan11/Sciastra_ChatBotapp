import React, { useState } from 'react';
import './homepage.css'; // Import a CSS file for styling
import ChatBot from '../Chatbot/chatbot'; // Import your ChatBot component
import chat from '../../assets/chat.png'

const ChatPopUp = () => {
  const [showChat, setShowChat] = useState(false);

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <div className="chat-popup">
      <button className="chat-button" onClick={toggleChat}>
        <img src={chat} alt="ChatBot Icon" /> {/* Replace with your chatbot icon */}
      </button>
      {showChat && <ChatBot />}
    </div>
  );
};

export default ChatPopUp;
