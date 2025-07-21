import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const API_URL = "http://localhost:3000/api/feedback";

const App = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [feedbacks, setFeedbacks] = useState([]);
  const [sentimentCount, setSentimentCount] = useState({
    Positive: 0,
    Negative: 0,
    Neutral: 0,
  });

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get(API_URL);
      setFeedbacks(res.data);
      updateChart(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateChart = (data) => {
    const counts = { Positive: 0, Negative: 0, Neutral: 0 };
    data.forEach((fb) => {
      if (fb.sentiment === "Positive") counts.Positive++;
      else if (fb.sentiment === "Negative") counts.Negative++;
      else counts.Neutral++;
    });
    setSentimentCount(counts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, form);
      setForm({ name: "", email: "", message: "" });
      fetchFeedbacks();
    } catch (error) {
      console.error(error);
      alert("Error submitting feedback");
    }
  };

  const chartData = {
    labels: ["Positive", "Negative", "Neutral"],
    datasets: [
      {
        data: [
          sentimentCount.Positive,
          sentimentCount.Negative,
          sentimentCount.Neutral,
        ],
        backgroundColor: ["#22c55e", "#ef4444", "#6b7280"],
        hoverBackgroundColor: ["#16a34a", "#dc2626", "#4b5563"],
        borderWidth: 2,
        borderColor: "#1f2937",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#fff",
          font: { size: 14 },
        },
      },
      datalabels: {
        color: "#fff",
        formatter: (value, context) => {
          let sum = 0;
          const dataArr = context.chart.data.datasets[0].data;
          dataArr.forEach((data) => (sum += data));
          return ((value * 100) / sum).toFixed(1) + "%";
        },
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.header
        className="w-full bg-gradient-to-r from-blue-600 to-purple-700 text-white py-6 text-center shadow-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-extrabold tracking-wide">
          Customer Feedback Analyzer
        </h1>
        <p className="text-lg mt-2 text-gray-200">
          Share your thoughts & view real-time sentiment
        </p>
      </motion.header>

      <main className="flex flex-col md:flex-row gap-8 p-8 w-full max-w-6xl">
        <motion.form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-6 rounded-lg shadow-lg w-full md:w-1/3 border border-gray-700"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-blue-400">
            Submit Feedback
          </h2>
          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="bg-gray-900 text-gray-100 border border-gray-600 p-3 w-full mb-4 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="bg-gray-900 text-gray-100 border border-gray-600 p-3 w-full mb-4 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
          <textarea
            placeholder="Your Feedback"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="bg-gray-900 text-gray-100 border border-gray-600 p-3 w-full mb-4 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            rows="4"
            required
          ></textarea>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px #3b82f6" }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-bold transition-all w-full"
          >
            ✨ Submit Feedback
          </motion.button>
        </motion.form>

        <motion.div
          className="flex-1 grid gap-6"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div>
            <h2 className="text-2xl font-bold mb-4 text-blue-400">
              Recent Feedback
            </h2>
            <div className="grid gap-4">
              {feedbacks.length === 0 ? (
                <p className="text-gray-400">No feedback yet. Be the first!</p>
              ) : (
                feedbacks.map((fb, index) => (
                  <motion.div
                    key={fb._id}
                    className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700 flex justify-between items-start"
                    whileHover={{ scale: 1.03, boxShadow: "0 0 15px #3b82f6" }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div>
                      <p className="font-bold text-white">{fb.name}</p>
                      <p className="text-gray-300">{fb.message}</p>
                      <p className="text-sm text-gray-500 mt-1">{fb.email}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${
                        fb.sentiment === "Positive"
                          ? "bg-green-500"
                          : fb.sentiment === "Negative"
                          ? "bg-red-500"
                          : "bg-gray-500"
                      }`}
                    >
                      {fb.sentiment}
                    </span>
                  </motion.div>
                ))
              )}
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 flex justify-center">
            <div style={{ width: "300px", height: "300px" }}>
              <h2 className="text-xl font-bold mb-4 text-blue-400 text-center">
                Sentiment Analysis
              </h2>
              <Doughnut data={chartData} options={chartOptions} />
            </div>
          </div>
        </motion.div>
      </main>
    </motion.div>
  );
};

export default App;
