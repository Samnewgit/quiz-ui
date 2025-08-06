import React, { useState, useEffect } from 'react';
import ErrorMessage from './ErrorMessage';

const QuizActive = ({ quiz, onSubmit, error }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // State to hold answers in the format: { [questionId]: selectedOptionId }
  const [userAnswers, setUserAnswers] = useState({});

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const selectedOptionId = userAnswers[currentQuestion.id];

  const handleSelectOption = (questionId, optionId) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  const handleFinish = () => {
    // Convert the answers object to the array format the API expects
    const formattedAnswers = Object.entries(userAnswers).map(([questionId, selectedOptionId]) => ({
      questionId: Number(questionId),
      selectedOptionId: Number(selectedOptionId)
    }));
    onSubmit(formattedAnswers);
  };
  
  const getButtonClass = (optionId) => {
    const baseClass = 'w-full text-left p-4 my-2 rounded-lg border transition-all duration-300';
    if (selectedOptionId === optionId) {
      return `${baseClass} bg-blue-600 text-white border-blue-700 font-semibold`; // Selected answer
    }
    return `${baseClass} bg-white hover:bg-gray-100 border-gray-300`; // Default
  };

  return (
    <div>
      <div className="bg-blue-600 text-white p-6 rounded-t-lg shadow-md">
        <h2 className="text-xl font-bold">{quiz.title}</h2>
        <p className="mt-1 text-blue-200">{`Question ${currentQuestionIndex + 1} of ${quiz.questions.length}`}</p>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">{currentQuestion.question}</h3>
        <div>
          {/* Your backend needs to return options with an ID */}
          {currentQuestion.options.map((option, index) => (
             <button
               // Using index as a key is okay here because options order is fixed.
               // Ideally, the backend would provide an ID for each option.
               key={option.id || index}
               onClick={() => handleSelectOption(currentQuestion.id, option.id)}
               className={getButtonClass(option.id)}
             >
                <span className="font-bold mr-3">{String.fromCharCode(65 + index)}.</span>
                {/* Your API must provide option text, e.g., option.text or option.option_text */}
                {option.text || option.option_text || option}
             </button>
          ))}
        </div>
        {error && <div className="mt-4"><ErrorMessage message={error} /></div>}
      </div>

      <div className="flex justify-between p-6 border-t border-gray-200">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        {currentQuestionIndex < quiz.questions.length - 1 ? (
          <button
            onClick={handleNext}
            disabled={!selectedOptionId}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleFinish}
            disabled={Object.keys(userAnswers).length !== quiz.questions.length}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            Finish & See Score
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizActive;
