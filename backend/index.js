const express = require('express');
require("dotenv").config();
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

const faqsFilePath = path.join(__dirname, 'faqs.json');
let faqs = JSON.parse(fs.readFileSync(faqsFilePath)).faqs;

function findBestMatch(query, faqs) {
  query = query.toLowerCase();
  let matchedAnswer = null;

  // Check for exact matches first
  for (let faq of faqs) {
    if (faq.question.toLowerCase().includes(query)) {
      return faq.answer;
    }
  }

  // Check for keyword matches if no exact match found
  const keywords = query.split(' ');
  for (let faq of faqs) {
    for (let keyword of keywords) {
      if (faq.question.toLowerCase().includes(keyword)) {
        matchedAnswer = faq.answer;
        break;
      }
    }
    if (matchedAnswer) break;
  }

  return matchedAnswer;
}

// Greeting
app.get('/', (req, res) => {
  res.send('Hello! How can I assist you today?');
});

// Handle FAQ queries
app.post('/faq', (req, res) => {
  const userQuery = req.body.query;

  const answer = findBestMatch(userQuery, faqs);
  if (answer) {
    res.json({ answer });
  } else {
    res.json({ answer: "Sorry, I don't understand your question. Please ask about shipping policies, return policies, or payment methods." });
  }
});

// Farewell
app.get('/bye', (req, res) => {
  res.send('Goodbye! Have a great day!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
