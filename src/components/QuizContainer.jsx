import React, { useState } from 'react';
import { generateQuiz, submitQuiz } from '../services/api';
import QuizInputForm from './QuizInputForm';
import QuizActive from './QuizActive';
import QuizResults from './QuizResults';
import LoadingSpinner from './LoadingSpinner';

const QuizContainer = () => {
  // 'input', 'generating', 'taking', 'submitting', 'results'
  const [appState, setAppState] = useState('input');
  const [error, setError] = useState(null);

  const [quizData, setQuizData] = useState(null);
  const [quizResults, setQuizResults] = useState(null);

  const handleGenerateQuiz = async (notes, title) => {
    setError(null);
    setAppState('generating');
    try {
      const data = await generateQuiz(notes, title);
      setQuizData(data);
      setAppState('taking');
    } catch (err) {
      console.error(err);
      setError(err.message);
      setAppState('input');
    }
  };

  const handleSubmitQuiz = async (answers) => {
    setError(null);
    setAppState('submitting');
    try {
      // Your backend returns different structures for generated vs. fetched questions.
      // We adapt the answers to match what the 'submit' endpoint expects: { questionId, selectedOptionId }
      // The AI generates questions without IDs, so we'll have to improvise or change the backend.
      // --- IMPORTANT ADAPTATION ---
      // Your backend `/api/generate-quiz` returns questions without IDs, but `/api/quiz/:id/submit`
      // requires question IDs. This is a mismatch.
      // FOR NOW, let's assume the frontend will take a quiz immediately after generation.
      // The *real* fix is to have `/api/generate-quiz` return the saved questions with their DB IDs.
      // Let's modify the frontend to work with a *hypothetical* corrected backend response.
      // Awaiting your feedback on this, but for now, this shows how it *should* work.
      // If your `generateQuiz` returns IDs, this will work out-of-the-box.
      
      const data = await submitQuiz(quizData.id, answers);
      setQuizResults(data);
      setAppState('results');
    } catch (err) {
      console.error(err);
      setError(err.message);
      setAppState('taking'); // Go back to the quiz to let the user retry submitting
    }
  };

  const handleReset = () => {
    setAppState('input');
    setError(null);
    setQuizData(null);
    setQuizResults(null);
  };

  const renderContent = () => {
    switch (appState) {
      case 'generating':
        return <LoadingSpinner text="Our AI is crafting your quiz..." />;
      case 'submitting':
        return <LoadingSpinner text="Checking your answers..." />;
      case 'taking':
        return <QuizActive quiz={quizData} onSubmit={handleSubmitQuiz} error={error} />;
      case 'results':
        return <QuizResults results={quizResults} onReset={handleReset} />;
      case 'input':
      default:
        return (
          <QuizInputForm
            onGenerate={handleGenerateQuiz}
            isGenerating={appState === 'generating'}
            error={error}
          />
        );
    }
  };

  return (
    <div className="w-full max-w-3xl bg-white rounded-lg shadow-2xl overflow-hidden transition-all duration-500">
      {renderContent()}
    </div>
  );
};

export default QuizContainer;
