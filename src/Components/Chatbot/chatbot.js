import React, { useState, useEffect, useRef } from 'react';
import './chatbot.css'; // Import a CSS file for styling

const ChatBot = () => {
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [showQuestions, setShowQuestions] = useState(false);

  const classOptions = [
    'Teaching Methodology and Approach',
    'Support and Resources',
    'Course Structure and Offerings',
    'Beyond Exam Preparation:',
  ]; // Add your class options here

  const questionsByClass = {
    'Teaching Methodology and Approach': [
      'What teaching methodologies does SciAstra employ to promote critical thinking over rote memorization?',
      'How does SciAstra tailor its teaching approach to cater to students with different learning styles?',
      'Can you elaborate on the mentor-student ratio during guidance sessions at SciAstra?',
      'Could you explain how SciAstra incorporates practical application and real-world problem-solving into its curriculum?',
      'How does SciAstra ensure a balance between exam preparation and nurturing a broader understanding of subjects?'
      // Add more questions related to this class
    ],
    'Support and Resources': [
      'What resources or study materials does SciAstra provide to prepare for entrance exams?',
      'Are there any additional support services or workshops provided to enhance learning beyond regular classes?',
      'What kind of feedback or progress tracking mechanisms are in place for students enrolled in SciAstras courses?',
      'What strategies does SciAstra employ to help students manage exam stress and maintain a healthy study-life balance during preparation?',
      'Are there opportunities for students to engage in research-oriented projects or internships through SciAstra?'
      // Add more questions related to this class
    ],
    'Course Structure and Offerings':[
    'Can you provide details about the course structure and duration for the preparation of specific entrance exams?',
     'How adaptable is SciAstras curriculum to accommodate updates or changes in exam patterns and syllabi?',
     'Are there any trial sessions or introductory courses for students to get a feel for the teaching approach before enrolling?'
],
'Beyond Exam Preparation:':[
  'Can you share success stories or experiences of students who transitioned to prestigious institutes with SciAstras guidance?',
  'How does SciAstra support students in their research aspirations beyond exams?',
  'What sets SciAstra apart from other coaching institutes in terms of student outcomes and support?',
  'Can you share insights into the alumni network or ongoing support available to students post their exam preparation with SciAstra?'
  ],
    // Add more classes and questions
  };

  const handleClassSelection = (selectedOption) => {
    setSelectedClass(selectedOption);
    setShowQuestions(true);
    setChatHistory([
      ...chatHistory,
      { message: `Selected class: ${selectedOption}`, type: 'bot' },
      { message: 'Please select a question:', type: 'bot' },
    ]);
  };

  const handleQuestionSelection = (question) => {
    const answer = questionsByClass[selectedClass].includes(question)
      ? 'Placeholder answer for ' + question // Replace this with the actual answer logic
      : 'Sorry, the answer to this question is not available.';
    setChatHistory([
      ...chatHistory,
      { message: selectedClass + ' - ' + question, type: 'user' },
      { message: answer, type: 'bot' },
    ]);
  };
   // Greeting message when chatbot initializes
   useEffect(() => {
    setChatHistory([
      ...chatHistory,
      { message: 'Hello! How can I assist you today?', type: 'bot' },
    ]);
  }, []);

  // Auto-scrolling to the latest message
  const chatHistoryRef = useRef();
  const scrollToBottom = () => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const renderChatHistory = () => (
    <div ref={chatHistoryRef} className="chat-history">
      {chatHistory.map((entry, index) => (
        <div key={index} className={`message ${entry.type}`}>
          {entry.message}
        </div>
      ))}
    </div>
  );

  const renderOptions = () => (
    <div className="class-options">
      <p>Please select a class:</p>
      {classOptions.map((option, index) => (
        <button key={index} onClick={() => handleClassSelection(option)}>
          {option}
        </button>
      ))}
    </div>
  );

  const renderQuestions = () => (
    <div className="questions">
      <p>Questions related to {selectedClass}:</p>
      {questionsByClass[selectedClass].map((question, index) => (
        <button key={index} onClick={() => handleQuestionSelection(question)}>
          {question}
        </button>
      ))}
    </div>
  );
  

 

  const sendMessage = (e) => {
    e.preventDefault();
    setChatHistory([...chatHistory, { message: userMessage, type: 'user' }]);
    handleUserResponse(userMessage);
    setUserMessage('');
  };

  const handleUserResponse = (message) => {
    if (selectedClass === '') {
      const lowerMessage = message.toLowerCase();
      if (lowerMessage in questionsByClass) {
        setSelectedClass(lowerMessage);
        setShowQuestions(true);
        setChatHistory([...chatHistory, { message: 'Please select a question:', type: 'bot' }]);
      } else {
        setChatHistory([...chatHistory, { message: 'I did not understand. Please select a valid class.', type: 'bot' }]);
      }
    } else if (showQuestions) {
      const answer = questionsByClass[message] || 'Sorry, the answer to this question is not available.';
      setChatHistory([...chatHistory, { message, type: 'user' }, { message: answer, type: 'bot' }]);
      setShowQuestions(false);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot">
        {showQuestions ? renderQuestions() : renderOptions()}
        {renderChatHistory()}
        <div className="input-container">
          <form onSubmit={sendMessage}>
            <input
              className="user-input"
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <button className="send-button" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};


export default ChatBot;