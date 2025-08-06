import React, { useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import ErrorMessage from './ErrorMessage';

const QuizInputForm = ({ onGenerate, isGenerating, error }) => {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (notes.trim()) {
      onGenerate(notes, title || 'My New Quiz');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 sm:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Quiz Generator AI</h1>
      <p className="text-gray-600 mb-6">Paste your study notes and get a custom quiz in seconds.</p>
      
      {error && <ErrorMessage message={error} />}

      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Quiz Title (Optional)</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., Chapter 5: The Solar System"
        />
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Study Notes</label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full h-48 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Paste your notes here..."
          required
        />
      </div>

      <div className="mt-6">
        <button
          type="submit"
          disabled={isGenerating || !notes.trim()}
          className="w-full px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          {isGenerating ? 'Generating...' : 'Generate Quiz'}
        </button>
      </div>
    </form>
  );
};

export default QuizInputForm;
