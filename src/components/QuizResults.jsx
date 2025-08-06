import React from 'react';
import { FiAward, FiTrendingDown, FiCheckCircle } from 'react-icons/fi';

const QuizResults = ({ results, onReset }) => {
  const { score, total, percentage } = results;

  const getFeedback = () => {
    if (percentage >= 90) return { icon: <FiAward className="text-yellow-500" />, message: "Excellent Work!" };
    if (percentage >= 70) return { icon: <FiCheckCircle className="text-green-500" />, message: "Great Job!" };
    return { icon: <FiTrendingDown className="text-red-500" />, message: "Keep Studying!" };
  };

  const feedback = getFeedback();

  return (
    <div className="text-center p-8">
      <div className="text-6xl mx-auto mb-4 w-fit">{feedback.icon}</div>
      <h2 className="text-3xl font-bold mb-2">{feedback.message}</h2>
      <p className="text-xl text-gray-700 mb-6">You've completed the quiz.</p>

      <div className="bg-gray-100 p-6 rounded-lg">
        <p className="text-lg text-gray-800">Your Score</p>
        <p className="text-6xl font-bold text-blue-600 my-2">{percentage}<span className="text-4xl">%</span></p>
        <p className="text-md text-gray-600">{`You answered ${score} out of ${total} questions correctly.`}</p>
      </div>

      <button
        onClick={onReset}
        className="mt-8 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
      >
        Create Another Quiz
      </button>
    </div>
  );
};

export default QuizResults;
