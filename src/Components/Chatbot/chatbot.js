import React, { useState, useEffect, useRef } from "react";
import "./chatbot.css"; 

const ChatBot = () => {
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [showQuestions, setShowQuestions] = useState(false);

  const classOptions = [
    "Teaching Methodology and Approach",
    "Support and Resources",
    "Course Structure",
    "Beyond Exam Preparation",
  ]; 

  const questionsByClass = {
    "Teaching Methodology and Approach": [
      "What teaching methodologies does SciAstra employ to promote critical thinking over rote memorization?",
      "How does SciAstra tailor its teaching approach to cater to students with different learning styles?",
      "Can you elaborate on the mentor-student ratio during guidance sessions at SciAstra?",
      "Could you explain how SciAstra incorporates practical application and real-world problem-solving into its curriculum?",
      "How does SciAstra ensure a balance between exam preparation and nurturing a broader understanding of subjects?",
      // Add more questions related to this class
    ],
    "Support and Resources": [
      "What resources or study materials does SciAstra provide to prepare for entrance exams?",
      "Are there any additional support services or workshops provided to enhance learning beyond regular classes?",
      "What kind of feedback or progress tracking mechanisms are in place for students enrolled in SciAstras courses?",
      "What strategies does SciAstra employ to help students manage exam stress and maintain a healthy study-life balance during preparation?",
      "Are there opportunities for students to engage in research-oriented projects or internships through SciAstra?",
      // Add more questions related to this class
    ],
    "Course Structure": [
      "Can you provide details about the course structure and duration for the preparation of specific entrance exams?",
      "How adaptable is SciAstras curriculum to accommodate updates or changes in exam patterns and syllabi?",
      "Are there any trial sessions or introductory courses for students to get a feel for the teaching approach before enrolling?",
    ],
    "Beyond Exam Preparation:": [
      "Can you share success stories or experiences of students who transitioned to prestigious institutes with SciAstras guidance?",
      "How does SciAstra support students in their research aspirations beyond exams?",
      "What sets SciAstra apart from other coaching institutes in terms of student outcomes and support?",
      "Can you share insights into the alumni network or ongoing support available to students post their exam preparation with SciAstra?",
    ],
    
  };

  const demoAnswers = {
    "What teaching methodologies does SciAstra employ to promote critical thinking over rote memorization?":
      "SciAstra uses active learning techniques like problem-based learning and group discussions to foster critical thinking.",
    "How does SciAstra tailor its teaching approach to cater to students with different learning styles?":
      "SciAstra offers personalized learning plans and diverse teaching methods to accommodate various learning styles.",
    "Can you elaborate on the mentor-student ratio during guidance sessions at SciAstra?":
      "At SciAstra, the mentor-student ratio is designed to ensure personalized attention, with an average of 1 mentor to every 10 students during guidance sessions.",
    "Could you explain how SciAstra incorporates practical application and real-world problem-solving into its curriculum?":
      "SciAstra integrates practical exercises, case studies, and hands-on projects within the curriculum to bridge theoretical knowledge with real-world scenarios. This approach allows students to apply learned concepts practically.",
    "How does SciAstra ensure a balance between exam preparation and nurturing a broader understanding of subjects?":
      "SciAstra follows a comprehensive approach that combines exam-oriented study with fostering a deeper understanding of subjects. This involves a balanced curriculum, encouraging critical thinking, and supplementary resources beyond exam syllabi.",
    "What resources or study materials does SciAstra provide to prepare for entrance exams?":
      "SciAstra offers a comprehensive array of resources including study guides, practice exams, curated reference materials, and access to an extensive digital library specifically designed to aid in entrance exam preparation.",
    "Are there any additional support services or workshops provided to enhance learning beyond regular classes?":
      "Beyond regular classes, SciAstra organizes supplementary workshops, tutoring sessions, and personalized mentoring to augment learning. Additionally, specialized support services cater to diverse learning needs.",
    "What kind of feedback or progress tracking mechanisms are in place for students enrolled in SciAstra's courses?":
      "SciAstra employs a robust feedback system involving regular assessments, performance evaluations, and personalized progress tracking tools. This ensures continuous improvement and tailored support for each student.",
    "What strategies does SciAstra employ to help students manage exam stress and maintain a healthy study-life balance during preparation?":
      "SciAstra implements stress management workshops, time-management strategies, and counseling services aimed at alleviating exam-related stress. Moreover, it promotes a balanced approach to studying, fostering a healthy study-life equilibrium.",
    "Are there opportunities for students to engage in research-oriented projects or internships through SciAstra?":
      "SciAstra offers avenues for students to participate in research-oriented projects, internships, and collaborations with academic and industry partners. These opportunities enrich their educational experience and practical skills.",
    "Can you provide details about the course structure and duration for the preparation of specific entrance exams?":
      "SciAstra's courses are meticulously structured, aligning with the exam syllabi and covering each topic comprehensively. The duration varies depending on the exam, usually spanning several months to ensure thorough preparation. It encompasses both foundational and advanced topics crucial for exam success.",
    "How adaptable is SciAstra's curriculum to accommodate updates or changes in exam patterns and syllabi?":
      "SciAstra's curriculum is designed to be highly adaptable and responsive to evolving exam patterns and syllabi. It undergoes regular revisions and updates based on the latest trends and changes in exam structures, ensuring students are equipped with the most relevant and updated content.",
    "Are there any trial sessions or introductory courses for students to get a feel for the teaching approach before enrolling?":
      "Absolutely! SciAstra offers trial sessions and introductory courses, providing prospective students with firsthand experience of our teaching methodology and approach. These sessions allow students to gauge the teaching style, interact with instructors, and gain insights into the comprehensive learning environment before committing to the program.",
    "Can you share success stories or experiences of students who transitioned to prestigious institutes with SciAstra's guidance?":
      "SciAstra takes pride in numerous success stories where students, under our guidance, successfully transitioned to esteemed institutes. These students not only excelled in entrance exams but also secured admissions to renowned institutions, showcasing the effectiveness of our holistic approach to preparation.",
    "How does SciAstra support students in their research aspirations beyond exams?":
      "SciAstra extends support to students beyond exam preparation by fostering their research aspirations. We offer specialized guidance, mentorship, and access to resources that aid students in exploring and delving deeper into their research interests, enabling them to cultivate a scholarly mindset beyond exam-focused studies.",
    "What sets SciAstra apart from other coaching institutes in terms of student outcomes and support?":
      "SciAstra stands out due to its unwavering commitment to student success and holistic support. Our approach combines personalized mentorship, adaptive teaching methodologies, and comprehensive resources, ensuring not only exam success but also overall skill development and career readiness.",
    "Can you share insights into the alumni network or ongoing support available to students post their exam preparation with SciAstra?":
      "Post-exam preparation, SciAstra continues to support its alumni through an extensive network and ongoing assistance. Alumni benefit from career counseling, networking opportunities, and access to exclusive resources aimed at professional growth and continued success.",

  };

  const handleClassSelection = (selectedOption) => {
    setSelectedClass(selectedOption);
    setShowQuestions(true);
    const updatedChatHistory = [...chatHistory];
    setChatHistory(updatedChatHistory);
  };

  const handleQuestionSelection = (question) => {
    let answer = "Sorry, the answer to this question is not available.";

    if (
      questionsByClass[selectedClass] &&
      questionsByClass[selectedClass].includes(question)
    ) {
      answer = demoAnswers[question] ;
    }
    setChatHistory([
      ...chatHistory,
      { message: selectedClass + " - " + question, type: "user" },
      { message: answer, type: "bot" },
    ]);
  };

  useEffect(() => {
    setChatHistory([
      ...chatHistory,
      { message: "Hello! How can I assist you today?", type: "bot" },
    ]);
  }, []);

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
          {entry.type === 'user' ? (
            <div className="question-right">{entry.message}</div>
          ) : (
            <div className="answer-left">{entry.message}</div>
          )}
        </div>
      ))}
    </div>
  );

  const renderOptions = () => (
    <div className="class-options">
      <p>What's your query regarding:</p>
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
    setChatHistory([...chatHistory, { message: userMessage, type: "user" }]);
    handleUserResponse(userMessage);
    setUserMessage("");
  };

  const handleUserResponse = (message) => {
    if (selectedClass === "") {
      const lowerMessage = message.toLowerCase();
      if (lowerMessage in questionsByClass) {
        setSelectedClass(lowerMessage);
        setShowQuestions(true);
        setChatHistory([
          ...chatHistory,
          { message: "Please select a question:", type: "bot" },
        ]);
      } else {
        setChatHistory([
          ...chatHistory,
          {
            message: "I did not understand. Please select a valid choice.",
            type: "bot",
          },
        ]);
      }
    } else if (showQuestions) {
      const answer =
        questionsByClass[message] ||
        "Sorry, the answer to this question is not available.";
      setChatHistory([
        ...chatHistory,
        { message, type: "user" },
        { message: answer, type: "bot" },
      ]);
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
