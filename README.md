# feedback-analyzer
An advanced MERN-based web application with Python NLP microservice for real-time sentiment analysis of customer feedback. The app allows users to submit reviews, which are analyzed for sentiment (Positive, Negative, Neutral) and displayed in a visually appealing dashboard with animations and charts.

📌 Features
✔ Submit feedback with Name, Email, and Message
✔ Real-time Sentiment Analysis using Python NLP (TextBlob)
✔ Displays sentiment badges (Green, Red, Gray)
✔ Dark Theme UI with animations & hover effects
✔ Live Sentiment Chart (Pie Chart for Positive, Negative, Neutral)
✔ Responsive Design using TailwindCSS
✔ MongoDB Atlas for data storage
✔ Framer Motion Animations for smooth UX

🛠 Tech Stack
Frontend: React.js, TailwindCSS, Framer Motion, Axios
Backend: Node.js, Express.js, MongoDB Atlas
NLP Service: Python (Flask, TextBlob)
Database: MongoDB Atlas
Version Control: Git & GitHub

📂 Folder Structure

customer-feedback-analyzer/
│
├── frontend/            # React UI
├── backend/             # Express.js API
├── python-service/      # Python NLP Microservice
└── README.md
⚙️ Installation & Setup

1. Clone the Repository

git clone https://github.com/your-username/customer-feedback-analyzer.git
cd customer-feedback-analyzer

2. Frontend Setup

cd frontend
npm install
npm run dev

3. Backend Setup

cd backend
npm install
npm start

4. Python Microservice Setup

cd python-service
pip install flask textblob
python app.py

🌐 Environment Variables
Create a .env file inside the backend folder:
MONGO_URI=your-mongodb-atlas-uri
PORT=5000

🚀 How to Run
Start Python Service: python app.py (http://127.0.0.1:5000)

Start Backend: npm start (http://localhost:5000)

Start Frontend: npm run dev (http://localhost:5173)

📊 Live Sentiment Chart
Displays Positive, Negative, Neutral sentiment distribution using react-chartjs-2.

📷 Screenshots
<img width="1913" height="843" alt="image" src="https://github.com/user-attachments/assets/959cf156-7533-4cc2-b987-a395bde3ceb0" />


✅ Future Enhancements
Add Authentication (JWT)

Implement Role-based Dashboard

Deploy on Render/Heroku + Vercel

Use HuggingFace Transformer Models for advanced NLP

⭐ Show your support
If you like this project, give it a star on GitHub! ⭐

