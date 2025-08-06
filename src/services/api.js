// This is the VITE environment variable you will set in the Cloudflare Pages dashboard.
// Example: https://my-worker.my-account.workers.dev
const API_BASE_URL = import.meta.env.VITE_API_URL;

/**
 * Handles generating a new quiz by sending notes to the backend.
 * @param {string} notes - The study notes from the user.
 * @param {string} title - The title for the quiz.
 * @returns {Promise<object>} - The generated quiz data { id, title, questions }.
 */
export async function generateQuiz(notes, title) {
  const response = await fetch(`${API_BASE_URL}/api/generate-quiz`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ notes, title }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'An unknown API error occurred.' }));
    throw new Error(errorData.error || 'Failed to generate quiz.');
  }

  return response.json();
}

/**
 * Submits the user's answers to the backend for scoring.
 * @param {number} quizId - The ID of the quiz being submitted.
 * @param {Array<{questionId: number, selectedOptionId: number}>} answers - The user's answers.
 * @returns {Promise<object>} - The quiz results { attemptId, score, total, percentage }.
 */
export async function submitQuiz(quizId, answers) {
  const response = await fetch(`${API_BASE_URL}/api/quiz/${quizId}/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answers }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'An unknown API error occurred.' }));
    throw new Error(errorData.error || 'Failed to submit quiz.');
  }

  return response.json();
}
