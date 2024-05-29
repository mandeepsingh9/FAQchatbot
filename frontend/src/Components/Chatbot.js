import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Chatbot = () => {
  const [query, setQuery] = useState('');
  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    const fetchGreeting = async () => {
      try {
        const res = await axios.get('https://faqchatbot-zeta.vercel.app/');
        const greeting = res.data;
        console.log(greeting);
        setConversation([{ bot: greeting }]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGreeting();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('https://faqchatbot-zeta.vercel.app/faq', { query });
      const botResponse = res.data.answer;

      setConversation([
        ...conversation,
        { user: query, bot: botResponse }
      ]);

      setQuery('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="chatbot">
      <h1>FAQ Chatbot</h1>
      <div className="conversation">
        {conversation.map((msg, index) => (
          <div key={index} className="message">
            {msg.user && <p><strong>You:</strong> {msg.user}</p>}
            <p><strong>Bot:</strong> {msg.bot}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a question..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chatbot;
