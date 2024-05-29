# FAQ Chatbot Application

This project is a full-stack FAQ chatbot application designed to handle common customer queries related to frequently asked questions (FAQs) about shipping policies, return policies, and payment methods.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
-

## Features

- Handles common customer queries related to:
  - Shipping policies
  - Return policies
  - Payment methods
- Simple database integration using a JSON file to store FAQs and their answers.
- Greeting and farewell messages.
- Deployed on Vercel for both frontend and backend.

## Project Structure

```plaintext
project-root/
│
├── backend/
│   ├── faqs.json
│   ├── server.js
│   ├── package.json
│   └── vercel.json
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   └── Chatbot.js
    │   ├── App.js
    │   ├── index.js
    │   └── Chatbot.css
    ├── package.json
    └── vercel.json



